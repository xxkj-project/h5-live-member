<!-- 
   支付弹框
-->
<template>
  <div class="popup">
    <van-popup v-model="dialogVisible" closeable position="bottom" :style="{ height: '53%' }">
      <p class="title">确认订单</p>
      <ul class="content">
        <li>
          <van-cell>
            <span>演唱会门票数</span>
            <van-stepper v-model="formData.amount" />
          </van-cell>
        </li>
        <li>
          <van-field v-model="formData.email" label="查收票据" placeholder="请填写邮箱"></van-field>
        </li>
        <li class="item">
          <van-cell>
            <span>总价</span>
            <span>{{ totalMoney }}</span>
          </van-cell>
        </li>
      </ul>

      <ul class="paymentBox">
        <li class="item" v-for="(item, index) in paymentList" :key="index" @click="onSelPay(item, index)">
          <span class="paymentIcon" :class="item.className"></span>
          <div class="itemRight">
            <p class="name">{{ item.name }}</p>
            <span class="selectIcon" :class="{ payActive: payActIdx === index }"></span>
          </div>
        </li>
      </ul>
      <div class="btnBox">
        <van-button class="confirmBtn" type="primary" round @click="onPay">立即支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      payActIdx: 0,
      paymentList: [
        { name: '微信支付', className: 'icon-pay-weixin', type: 1 },
        { name: '支付宝', className: 'icon-pay-alipay', type: 2 }
      ],
      formData: {
        amount: 1,
        email: ''
      },
      totalMoney: 200
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onSelPay(item, index) {
      console.log('-pay-item-', item, index)
      if (this.payActIdx === index) return
      this.payActIdx = index
    },
    onPay() {
      console.log('-立即支付-')
      setTimeout(() => {
        this.$router.push({ name: 'ConcertTicket' })
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/recharge/';
.popup {
  .title {
    text-align: center;
    font-size: 16px;
    padding-top: 18px;
    margin-bottom: 10px;
  }

  .btnBox {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px 10px;

    .confirmBtn {
      width: 100%;
      background: #ffd461;
      border: 1px solid #ffd461;
      color: #000;
      font-size: 16px;
    }
  }

  .van-cell {
    &__value {
      display: flex;
      justify-content: space-between;
    }
  }
  /deep/ .van-field {
    &__control {
      border: 1px solid #ccc;
      padding-left: 6px;
    }
  }
}

.paymentBox {
  background: #fff;
  padding: 0 15px;
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
</style>
