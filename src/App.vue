<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default {
  name: 'App',
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style lang="less">
  #app{
    height: 100%;
  }
</style>
