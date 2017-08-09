<template>
  <div id="app">
    <options class="options"></options>
    <preview class="preview"></preview>
  </div>
</template>

<script>
import Options from './components/Options';
import Preview from './components/Preview';

export default {
  name: 'app',
  components: {
    Options,
    Preview,
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-flow: row wrap;

  height: 100%;

  .options {
    flex: 1;
    align-self: center;
    padding-left: 120px;
    box-sizing: border-box;
  }

  .preview {
    flex: 1;
    align-self: flex-start;
    box-sizing: border-box;
  }
}

</style>
