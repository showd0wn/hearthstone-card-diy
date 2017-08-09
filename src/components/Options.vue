<template>
  <ul id="options">
    <li class="option">
      <span class="title">类型：</span>
      <input type="radio" id="one" v-model="cardType" value="minion">
      <label for="one">随从&nbsp;</label>
      <input type="radio" id="two" v-model="cardType" value="spell">
      <label for="two">法术&nbsp;</label>
      <input type="radio" id="thr" v-model="cardType" value="weapon">
      <label for="thr">武器&nbsp;</label>
    </li>
    <li class="option">
      <span class="title">职业：</span>
      <select class="input" name="profession" v-model="profession">
        <option v-bind:value="key" v-for="(value, key) in object">{{ value }}</option>
      </select>
    </li>
    <li class="option">
      <span class="title">名称：</span>
      <input class="input" type="text" name="cardName" v-model="cardName" placeholder="卡牌名称">
    </li>
    <li class="option">
      <span class="title">种族：</span>
      <input class="input" type="text" name="phyle" v-model="phyle" placeholder="卡牌种族" v-bind:disabled="isInputDisabled">
    </li>
    <li class="option">
      <span class="title">描述：</span>
      <textarea class="input" name="description" v-model="description" placeholder="卡牌描述"></textarea>
    </li>
    <li class="option" v-if="cardType === 'minion'">
      <span class="title">属性：</span>
      <div class="property">
        <select v-model.number="mana">
          <option v-for="n in numbers">{{ n }}</option>
        </select>
        <span>法力</span>
        <img class="img prop-img" src="../assets/mana.png" alt="mana">
      </div>
      <div class="property">
        <select v-model.number="attack">
          <option v-for="n in numbers">{{ n }}</option>
        </select>
        <span>攻击</span>
        <img class="img prop-img" src="../assets/att.png" alt="att">
      </div>
      <div class="property">
        <select v-model.number="health">
          <option v-for="n in numbers">{{ n }}</option>
        </select>
        <span>生命</span>
        <img class="img prop-img" src="../assets/hp.png" alt="hp">
      </div>
    </li>
    <li class="option" v-else-if="cardType === 'spell'">
      <span class="title">属性：</span>
      <div class="property">
        <select v-model.number="mana">
          <option v-for="n in numbers">{{ n }}</option>
        </select>
        <span>法力</span>
        <img class="img prop-img" src="../assets/mana.png" alt="mana">
      </div>
    </li>
    <li class="option" v-else="cardType === 'weapon'">
      <span class="title">属性：</span>
      <div class="property">
        <select v-model.number="mana">
          <option v-for="n in numbers">{{ n }}</option>
        </select>
        <span>法力</span>
        <img class="img prop-img" src="../assets/mana.png" alt="mana">
      </div>
      <div class="property">
        <select v-model.number="attack">
          <option v-for="n in numbers">{{ n }}</option>
        </select>
        <span>攻击</span>
        <img class="img prop-img" src="../assets/weapon_damage.png" alt="att">
      </div>
      <div class="property">
        <select v-model.number="health">
          <option v-for="n in numbers">{{ n }}</option>
        </select>
        <span>耐久</span>
        <img class="img prop-img" src="../assets/weapon_durability.png" alt="hp">
      </div>
    </li>
    <li class="option" id="quality">
      <span class="title">品质：</span>
      <input type="radio" id="classical" v-model="quality" value="classical">
      <label for="classical">经典</label>
      <input type="radio" id="white" v-model="quality" value="common">
      <label for="white">普通 <img class="img qua-img" src="../assets/common.png" alt="common"></label>
      <input type="radio" id="blue" v-model="quality" value="rare">
      <label for="blue">稀有 <img class="img qua-img" src="../assets/rare.png" alt="rare"></label>
      <input type="radio" id="purple" v-model="quality" value="epic">
      <label for="purple">史诗 <img class="img qua-img" src="../assets/epic.png" alt="epic"></label>
      <input type="radio" id="orange" v-model="quality" value="legendary">
      <label for="orange">传说 <img class="img qua-img" src="../assets/legendary.png" alt="legendary"></label>
    </li>
    <li class="option hidden">
      <span class="title">金卡：</span>
      <input type="checkbox" id="golden" v-model="golden">
      <label for="golden" class="green"></label>
    </li>
    <li class="option">
      <span class="title">图片：</span>
      <div id="upload-file">
        <span>Select File</span>
        <input type="file" v-on:change="onFileChange">
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'options',
  data() {
    return {
      numbers: Array.from({ length: 21 }, (v, k) => k),
      object: {
        neutral: '中立',
        mage: '法师',
        warlock: '术士',
        priest: '牧师',
        druid: '德鲁伊',
        rogue: '潜行者',
        hunter: '猎人',
        shaman: '萨满',
        warrior: '战士',
        paladin: '骑士',
      },
    };
  },
  computed: {
    cardType: {
      get() {
        return this.$store.state.cardType;
      },
      set(value) {
        this.$store.commit({
          type: 'changeCardType',
          cardType: value,
        });
      },
    },
    cardName: {
      get() {
        return this.$store.state.cardName;
      },
      set(value) {
        this.$store.commit({
          type: 'changeCardName',
          cardName: value,
        });
      },
    },
    profession: {
      get() {
        return this.$store.state.profession;
      },
      set(value) {
        this.$store.commit({
          type: 'changeProfession',
          profession: value,
        });
      },
    },
    phyle: {
      get() {
        return this.$store.state.phyle;
      },
      set(value) {
        this.$store.commit({
          type: 'changePhyle',
          phyle: value,
        });
      },
    },
    description: {
      get() {
        return this.$store.state.description;
      },
      set(value) {
        this.$store.commit({
          type: 'changeDescription',
          description: value,
        });
      },
    },
    quality: {
      get() {
        return this.$store.state.quality;
      },
      set(value) {
        this.$store.commit({
          type: 'changeQuality',
          quality: value,
        });
      },
    },
    mana: {
      get() {
        return this.$store.state.mana;
      },
      set(value) {
        this.$store.commit({
          type: 'changeMana',
          mana: value,
        });
      },
    },
    attack: {
      get() {
        return this.$store.state.attack;
      },
      set(value) {
        this.$store.commit({
          type: 'changeAttack',
          attack: value,
        });
      },
    },
    health: {
      get() {
        return this.$store.state.health;
      },
      set(value) {
        this.$store.commit({
          type: 'changeHealth',
          health: value,
        });
      },
    },
    golden: {
      get() {
        return this.$store.state.golden;
      },
      set(value) {
        this.$store.commit({
          type: 'changeGolden',
          golden: value,
        });
      },
    },
    isInputDisabled() {
      return this.cardType !== 'minion';
    },
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length && typeof FileReader === 'undefined') return;
      const vm = this;
      const reader = new window.FileReader();
      reader.onload = (v) => {
        vm.$store.commit({
          type: 'changeMainImage',
          mainImage: v.target.result,
        });
      };
      reader.readAsDataURL(files[0]);
    },
  },
};
</script>

<style lang="less" scoped>
  #options {
    .option {
      list-style-type: none;
      margin-bottom: 12px;
    }
    .title {
      font-weight: bold;
    }
    .img {
      position: relative;
      top: 8px;
    }
    .qua-img {
      width: 20px;
    }
    .prop-img {
      width: 28px;
      margin-right: 24px;
    }
    .input {
      font-size: 14px;
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #999;
      background-color: #fcfcfc;
    }
    .property {
      display: inline-block;
      select {
        font-size: 14px;
        height: 32px;
        width: 48px;
        border: 1px solid #999;
        background-color: #fcfcfc;
      }
    }
    .hidden {
      display: none;
    }
    #quality {
      label {
        margin-right: 12px;
      }
    }
    #upload-file {
      overflow: hidden;
      position: relative;
      display: inline-block;
      background-color: #9cf;
      color: #fff;
      text-align: center;
      border-radius: 8px;
      top: 10px;
      line-height: 36px;
      height: 36px;
      width: 108px;
      input {
        position: absolute;
        opacity: 0;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    #golden {
      &:checked+label{
        &.green{background: #AEDCAE;&:after{background: #5CB85C;}}
        &:after{
          left: calc(~'100% - 20px');
        }
      }
      &+label{
        position: relative;
        top: 6px;
        background: #ddd;
        border-radius: 20px;
        box-shadow: 1px 1px 3px #aaa;
        &:after{
          background: #fff;
          border-radius: 50%;
          box-shadow: 1px 1px 3px #aaa;
        }
      }
    }
    input[name=cardName],
    input[name=phyle] {
      height: 36px;
      width: 360px;
      line-height: 36px;
    }
    select[name=profession] {
      height: 36px;
      width: 80px;
    }
    textarea[name=description] {
      height: 80px;
      width: 360px;
      max-width: 360px;
    }
    input[type="checkbox"]{
      display: none;
      &+label{
        display: inline-block;
        width: 50px;
        height: 24px;
        position: relative;
        transition: 0.3s;
        box-sizing: border-box;
        &:after,&:before{
          content: '';
          display: block;
          position: absolute;
          left: 0px;
          top: 0px;
          width: 24px;
          height: 24px;
          transition: 0.3s;
          cursor: pointer;
        }
      }
    }
    input:disabled {
      cursor: not-allowed;
    }
  }
</style>
