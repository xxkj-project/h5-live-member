<!-- 
   支付方式
-->
<template>
  <div class="payment-mode">
    <p class="title">支付方式</p>
    <ul class="paymentBox">
      <li class="item" v-for="(item, index) in list" :key="index" @click="onSelPay(item)">
        <span class="paymentIcon" :class="item.className"></span>
        <div class="itemRight">
          <p class="name">{{ item.name }}</p>
          <span class="selectIcon" :class="{ payActive: selType === item.type }"></span>
        </div>
      </li>
    </ul>
    <div class="btnBox">
      <van-button class="confirmBtn" type="primary" @click="onConfirm">确认购买</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      selType: 1,
      list: [
        { name: '微信支付', className: 'icon-pay-weixin', type: 1 },
        { name: '支付宝', className: 'icon-pay-alipay', type: 2 }
      ]
    }
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    onSelPay(item) {
      this.selType = item.type
    },
    onConfirm() {
      this.$emit('confirm', this.selType)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
.payment-mode {
  background: #fff;
  padding: 22px 15px;

  .title {
    font-size: 18px;
    margin-bottom: 5px;
  }
}

.paymentBox {
  .item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 15px 0;

    &:last-child {
      border-bottom: none;
    }

    .paymentIcon {
      width: 24px;
      height: 24px;
      margin-right: 8px;

      &.icon-pay-weixin {
        background: url('@{imgUrl}icon-pay-weixin.png') no-repeat center;
        background-size: 100% 100%;
      }

      &.icon-pay-alipay {
        background: url('@{imgUrl}icon-pay-alipay.png') no-repeat center;
        background-size: 100% 100%;
      }
    }

    .itemRight {
      flex: 1;
      display: flex;
      justify-content: space-between;

      .name {
        font-size: 16px;
        color: #002222;
      }

      .selectIcon {
        width: 15px;
        height: 15px;
        background: url('@{imgUrl}icon-no-select.png') no-repeat center;
        background-size: 100% 100%;

        &.payActive {
          background: url('@{imgUrl}icon-select.png') no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
  }
}
.btnBox {
  padding-top: 26px;
  .confirmBtn {
    width: 100%;
    background: #ffd200;
    border: 1px solid #ffd200;
    color: #000;
    font-size: 18px;
    border-radius: 6px;
  }
}
</style>
