<template>
  <div id="container">
    <div id="card">
      <div id="card-inner">
        <div id="background" v-bind:style="backgroundImageStyle"></div>
        <div id="mainImage" v-bind:style="mainImageStyle"></div>
        <div id="mana" v-bind:style="manaCostImageStyle"></div>
        <div id="attack" v-bind:style="attackImageStyle" v-if="showAttackImage"></div>
        <div id="health" v-bind:style="healthImageStyle" v-if="showHealthImage"></div>
        <div id="dragon" v-bind:style="dragonImageStyle" v-if="showDragonImage"></div>
        <div id="quality" v-bind:style="qualityImageStyle" v-if="showQualityImage"></div>
        <div id="cardName" v-bind:style="cardNameTextStyle" v-html="cardName"></div>
        <div id="description" v-bind:style="descriptionTextStyle"><p class="inner" v-html="description"></p></div>
        <div id="phyle" v-if="showPhyleText" v-html="phyle"></div>
      </div>
    </div>
    <div id="save-file">
      <input type="button" value="Download" v-on:click="saveFile">
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'preview',
  data() {
    return {
      BACKGROUND_IMAGE_TOP: {
        minion: 0,
        spell: 26,
        weapon: 12,
      },
      MAIN_IMAGE_TOP: {
        minion: 3,
        spell: 34,
        weapon: 34,
      },
      CARDNAME_TEXT_TOP: {
        minion: 232,
        spell: 222,
        weapon: 222,
      },
      CARDNAME_TEXT_SKEW: {
        minion: -5,
        spell: 0,
        weapon: 0,
      },
      DRAGON_IMAGE_TOP: {
        minion: -22,
        spell: -12,
      },
      DRAGON_IMAGE_LEFT: {
        minion: 12,
        spell: 42,
      },
    };
  },
  computed: {
    ...mapState([
      'cardType',
      'quality',
      'phyle',
      'cardName',
      'mainImage',
      'description',
    ]),
    ...mapGetters([
      'backgroundImage',
      'manaCostImage',
      'qualityImage',
      'dragonImage',
      'attackImage',
      'healthImage',
    ]),
    showQualityImage() {
      return this.quality !== 'classical';
    },
    showDragonImage() {
      return this.cardType !== 'weapon' && this.quality === 'legendary';
    },
    showAttackImage() {
      return this.cardType !== 'spell';
    },
    showHealthImage() {
      return this.cardType !== 'spell';
    },
    showPhyleText() {
      return this.cardType === 'minion' && this.phyle;
    },
    backgroundImageStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        top: `${this.BACKGROUND_IMAGE_TOP[this.cardType]}px`,
      };
    },
    mainImageStyle() {
      return {
        backgroundImage: `url(${this.mainImage})`,
        top: `${this.MAIN_IMAGE_TOP[this.cardType]}px`,
        // 为什么 border-radius 是200% ？
        // https://stackoverflow.com/questions/28276179/cant-apply-border-radius-to-canvas-html2canvas
        borderRadius: this.cardType === 'minion' ? '200%' : '0',
      };
    },
    qualityImageStyle() {
      return {
        backgroundImage: `url(${this.qualityImage})`,
      };
    },
    dragonImageStyle() {
      return {
        backgroundImage: `url(${this.dragonImage})`,
        top: `${this.DRAGON_IMAGE_TOP[this.cardType]}px`,
        left: `${this.DRAGON_IMAGE_LEFT[this.cardType]}px`,
      };
    },
    manaCostImageStyle() {
      return {
        backgroundImage: `url(${this.manaCostImage})`,
      };
    },
    attackImageStyle() {
      return {
        backgroundImage: `url(${this.attackImage})`,
      };
    },
    healthImageStyle() {
      return {
        backgroundImage: `url(${this.healthImage})`,
      };
    },
    cardNameTextStyle() {
      return {
        top: `${this.CARDNAME_TEXT_TOP[this.cardType]}px`,
        transform: `skewY(${this.CARDNAME_TEXT_SKEW[this.cardType]}deg)`,
      };
    },
    descriptionTextStyle() {
      return {
        color: this.cardType === 'weapon' ? '#fff' : '#000',
      };
    },
  },
  methods: {
    saveFile() {
      html2canvas(document.getElementById('card'), {
        onrendered(canvas) {
          const aLink = document.createElement('a');
          aLink.href = canvas.toDataURL();
          aLink.download = 'DIY卡牌.png';
          aLink.click();
          aLink.remove();
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
  @font-face {
    font-family: lbjtFont;
    src: url('../assets/font/FZLBJW.TTF'),
  }
  #card {
    position: relative;
    height: 450px;
    width: 300px;
    padding: 20px;
    margin-top: 120px;
    z-index: 1;
  }
  #card-inner {
    position: relative;
    height: 100%;
    width: 100%;
    #background {
      position: absolute;
      height: 100%;
      width: 300px;
      background: no-repeat left top;
    }
    #mainImage {
      position: absolute;
      left: 20px;
      width: 260px;
      height: 450px;
      background: no-repeat top center;
      background-size: 100% auto;
      z-index: -1;
    }
    #quality {
      position: absolute;
      top: 254px;
      width: 300px;
      height: 50px;
      background: no-repeat center top;
    }
    #dragon {
      position: absolute;
      width: 300px;
      height: 450px;
      background: no-repeat right top;
    }
    #mana {
      position: absolute;
      width: 95px;
      height: 95px;
      left: -22px;
    }
    #attack {
      position: absolute;
      bottom: -4px;
      left: -24px;
      width: 95px;
      height: 95px;
    }
    #health {
      position: absolute;
      bottom: -4px;
      left: 230px;
      width: 85px;
      height: 85px;
    }
    #phyle {
      position: absolute;
      bottom: 20px;
      width: 300px;
      height: 35px;
      line-height: 42px;
      text-align: center;
      background: url('../assets/race/race.png') no-repeat center top;
      background-size: 50% 100%;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      font-family: lbjtFont;
    }
    #description {
      position: absolute;
      width: 204px;
      height: 94px;
      top: 302px;
      left: 48px;
      font-size: 20px;
      // overflow: hidden;
      text-align: center;
      font-family: "Microsoft YaHei";
      p {
        margin: 0;
      }
      .inner {
        margin: 0;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    #cardName {
      position: absolute;
      left: 60px;
      width: 180px;
      height: 32px;
      text-align: center;
      overflow: hidden;
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      font-family: lbjtFont;
    }
  }
  #save-file {
    width: 340px;
    text-align: center;
    input {
      display: inline-block;
      height: 24px;
      width: 108px;
      background-color: #9cf;
      border-radius: 6px;
      border: 1px solid #000;
    }
  }
</style>
