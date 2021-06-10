<!--
 * @Author: wangshengxian
 * @Date: 2021-01-29 15:29:51
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 10:57:15
 * @Desc: 提现记录list
-->
<template>
  <div class="listWrap">
    <ul class="itemBox">
      <li class="item" v-for="(item, idx) in list" :key="idx">
        <div class="title">
          <p>{{ item.currency }}提现</p>
          <p class="status extStatus1" v-if="item.status == 1">已提交</p>
          <p class="status extStatus2" v-else-if="item.status == 2">已成功</p>
          <p class="status extStatus3" v-else-if="item.status == 4">未通过</p>
          <p class="status extStatus3" v-else></p>
        </div>
        <div class="topupNum">
          <p>提现数量：</p>
          <p>{{ item.realCashNum }}</p>
        </div>
        <div class="rate">
          <p>手续费：</p>
          <p>{{ item.fee }}</p>
        </div>
        <div class="gainNum">
          <p>总计数量：</p>
          <p>{{ item.cashNum }}</p>
        </div>
        <div class="remarks" v-if="item.status == 4">
          <p>备注：</p>
          <p>{{ item.content }}</p>
        </div>
        <div class="address">
          <p>提现地址：</p>
          <p class="txt">{{ item.address }}</p>
        </div>
        <div class="orderNum">
          <p>订单号：</p>
          <p class="txt">{{ item.orderNum }}</p>
        </div>
        <div class="time">
          <p>交易时间：</p>
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
  components: {},
  created() {},
  mounted() {
    // 提现订单状态 ==》 1已提交 2已成功 4未通过
    // console.log('-提现组件-')
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
        // &:nth-child(7),
        // &:nth-child(8) {
        //   color: #999;
        // }
      }
      .title {
        font-size: 16px;
        margin-bottom: 4px;
        justify-content: space-between;
        .status {
          text-align: right;
          color: #42d969;
          &.extStatus1 {
            color: #467ff2;
          }
          &.extStatus2 {
            color: #42d969;
          }
          &.extStatus3 {
            color: #f2464a;
          }
        }
      }
      .remarks {
        color: #f2464a;
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
