<!-- 
   币种充值
-->
<template>
  <div class="currencyTopup">
    <div class="content">
      <div class="item" v-for="(item, index) in list" :key="index" @click="onOperate(item)">
        <span class="icon" :class="'icon_' + index"></span>
        <div class="rightBox">
          <p class="name">{{ item.name }}</p>
          <span class="arrows"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      list: [{ name: 'UBNK' }, { name: 'TST' }, { name: 'TF' }, { name: 'AUSD' }, { name: 'USDT' }, { name: 'ETH' }]
    }
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    onOperate(item) {
      let query = { type: item.name }
      this.$router.push({
        path: '/rechargeAddress',
        query
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/myWallet/';
.content {
  padding: 0 13px;
  .item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(221, 222, 230);
    // border-bottom: 1px solid #dddee6;
    padding: 10px 0;

    .icon {
      width: 25px;
      height: 25px;

      &_0 {
        background: url('@{imgUrl}icon-currency0.png') no-repeat center / cover;
      }
      &_1 {
        background: url('@{imgUrl}icon-currency1.png') no-repeat center / cover;
      }
      &_2 {
        background: url('@{imgUrl}icon-currency2.png') no-repeat center / cover;
      }
      &_3 {
        background: url('@{imgUrl}icon-currency3.png') no-repeat center / cover;
      }
      &_4 {
        background: url('@{imgUrl}icon-currency4.png') no-repeat center / cover;
      }
      &_5 {
        background: url('@{imgUrl}icon-currency5.png') no-repeat center / cover;
      }
    }

    .rightBox {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10px;

      .name {
        font-size: 15px;
        color: #191919;
      }

      .arrows {
        width: 7px;
        height: 12px;
        background: url('@{imgUrl}icon-right-arrow.png') no-repeat center / cover;
      }
    }
  }
}
</style>
