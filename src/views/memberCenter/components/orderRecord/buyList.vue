<!--
 * @Author: wangshengxian
 * @Date: 2021-01-29 15:29:51
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 11:26:58
 * @Desc: 购买记录list
-->
<template>
  <div class="listWrap">
    <ul class="itemBox">
      <li class="item" v-for="(item, idx) in list" :key="idx">
        <div class="title">
          <p>购买数量 (TST)：</p>
          <p>{{ item.number }}</p>
        </div>
        <div class="topupNum">
          <p>支付金额 (元)：</p>
          <p>{{ item.cny }}</p>
        </div>
        <div class="rate">
          <p>购买单价：</p>
          <p>{{ item.rate }}</p>
        </div>
        <div class="gainNum">
          <p>当前余额 (TST)：</p>
          <p>{{ item.cash }}</p>
        </div>

        <div class="address">
          <p>支付方式：</p>
          <p class="txt">{{ item.type | payment }}</p>
        </div>
        <div class="orderNum">
          <p>订单号：</p>
          <p class="txt">{{ item.orderNo }}</p>
        </div>
        <div class="time">
          <p>购买时间：</p>
          <p>{{ item.createTime }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {},
  filters: {
    payment(val) {
      return val == 1 ? '微信支付' : '支付宝支付'
    }
  },
  components: {},
  created() {},
  mounted() {
    // console.log('-购买组件-')
  },
  methods: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.listWrap {
  .itemBox {
    padding: 10px 10px 0;
    .item {
      background: #fff;
      font-size: 14px;
      color: #222;
      line-height: 24px;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;

      div {
        display: flex;
        p:last-child {
          flex: 1;
        }
      }
      .orderNum {
        color: #999;
      }
      .time {
        color: #999;
      }
      .address,
      .orderNum {
        .txt {
          word-break: break-word;
        }
      }
    }
  }
}
</style>
