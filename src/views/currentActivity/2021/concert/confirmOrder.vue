<!-- 
   确认订单
-->
<template>
  <div class="confirmOrder">
    <headerBar isMainFullScreen arrowsType="white" titleColor="#fff" background="rgba(255,255,255,0)" />
    <div class="main">
      <div class="topBox" :style="{ paddingTop: topBoxPd }">
        <p class="title">无线梦想音乐演唱会 2021</p>
        <p class="txt">200 分钟 / 群星线上演唱会</p>
        <p class="txt">2021-05-01 18:30 全网线上首映</p>
      </div>
      <div class="content">
        <div class="contentWrap">
          <van-form class="formBox">
            <div class="item">
              <p class="itemLabel">
                <span class="">票据查收</span>
                <!-- <span class="notes">购买成功后，票据会直接发送至邮箱</span> -->
              </p>
              <van-field v-model="formData.mail" label="" clearable placeholder="请输入邮箱接收票据"></van-field>
            </div>
            <div class="item">
              <p class="itemLabel">
                <span class="">入场票据</span>
                <span class="notes">每笔订单最多可购买5张</span>
              </p>
              <van-stepper v-model="formData.num" disable-input min="1" max="5" />
            </div>
          </van-form>

          <ul class="paymentBox">
            <li>
              <span class="paymentTitle">支付方式</span>
            </li>
            <li class="item" v-for="(item, index) in paymentList" :key="index" @click="onSelPay(item, index)">
              <div class="itemLeft">
                <span class="paymentIcon" :class="item.className"></span>
                <span class="name">{{ item.name }}</span>
                <span class="tag" v-if="item.tag">{{ item.tag }}</span>
              </div>
              <div class="itemRight">
                <span class="selectIcon" :class="{ payActive: payActIdx === index }"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footerWrap">
      <p class="price">{{ totalMoney | price(payActIdx) }}</p>
      <van-button class="confirmBtn" type="primary" round @click="onPay">立即支付</van-button>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import jsPrecision from '@/utils/jsPrecision'
import openNative from '@/utils/openNative'
import platform from '@/utils/platform'
import jsEventManager from '@/utils/jsEventManager'
import { validEmail } from '@/utils/validate'
import { concertPay } from '@/api/2021_activity'
import { getRechargeUserInfo } from '@/api/pay'
export default {
  name: '',
  data() {
    return {
      isPopover: false,
      remBase: 37.5,
      payActIdx: 0,
      formData: {
        num: 1,
        mail: ''
        // mail: '1114964175@qq.com'
      },
      price: 200,
      infoData: {},
      paymentList: [
        { name: '微信支付', tag: '推荐', className: 'icon-pay-weixin', type: 1 },
        { name: '支付宝', tag: '支持信用卡', className: 'icon-pay-alipay', type: 2 },
        { name: '通证支付', tag: '', className: 'icon-pay-tst', type: 3 }
      ]
    }
  },

  computed: {
    topBoxPd() {
      let pd = platform.isWechat ? 24 : 24 + 41
      return pd / this.remBase + 'rem'
    },
    totalMoney() {
      return jsPrecision.mul(this.price, this.formData.num)
    }
  },
  filters: {
    price(val, type) {
      let result = type == 2 ? val + 'tst' : '￥' + val
      return result
    }
  },
  components: { headerBar },
  created() {
    this.getData()
  },
  mounted() {
    jsEventManager.addEvent('paySuccess', this.handlePaySuccess)
  },
  methods: {
    handlePaySuccess(data) {
      console.log('-原生-调用了js-', data)
      if (data != 200) {
        this.$toast('支付失败')
        return
      }
      setTimeout(() => {
        this.$toast({
          message: '购买成功，票据即将发送您的邮收！',
          duration: 3000
        })
      }, 2000)
    },
    onSelPay(item, index) {
      // console.log('-pay-item-', item, index)
      if (this.payActIdx === index) return
      this.payActIdx = index
      this.price = this.payActIdx == 2 ? jsPrecision.div(200, this.infoData.rate) : 200
    },

    onPay() {
      if (!validEmail(this.formData.mail)) {
        this.$toast('请输入正确的邮箱')
        return
      }
      const type = this.paymentList[this.payActIdx].type
      if (type != 3) {
        this.paymentReq(type)
        return
      }
      const message = `确认花费${this.totalMoney}tst购买门票？`
      this.$dialog
        .confirm({
          message,
          title: '提示',
          beforeClose: (action, done) => {
            if (action !== 'confirm') {
              done()
              return
            }
            this.tstPaymentReq(3, done)
          }
        })
        .then(() => {})
        .catch(() => {})
    },
    tstPaymentReq(type, done) {
      const params = { ...this.formData }
      concertPay(type, params)
        .then(res => {
          this.$toast({
            message: '购买成功，票据即将发送您的邮箱！',
            duration: 3000
          })
          done()
        })
        .catch(err => {
          done()
        })
    },
    // 微信/支付宝支付
    paymentReq(type) {
      const params = { ...this.formData }
      // console.log('-params-', params)
      this.$pageLoading.show('加载中...')
      concertPay(type, params)
        .then(res => {
          this.$pageLoading.hide()
          const data = res.data
          openNative.goGeneralPay({ type, data })
        })
        .catch(err => {
          this.$pageLoading.hide()
        })
    },
    getData() {
      this.$loading.show()
      getRechargeUserInfo()
        .then(res => {
          this.$loading.hide()
          this.infoData = res.data
          this.paymentList[2].tag = `TST兑换￥汇率${this.infoData.rate}元/TST`
        })
        .catch(() => {
          this.$loading.hide()
        })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/concert/';
@redColor: #fc3b52;

.confirmOrder {
  display: flex;
  flex-direction: column;
  height: 100%;

  .topBg {
    width: 100%;
    height: 180px;
    background: url('@{imgUrl}bg1.jpg') no-repeat center / cover;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
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

.topBox {
  width: 100%;
  background: url('@{imgUrl}bg1.jpg') no-repeat center / cover;
  padding: 65px 0 36px 25px; // padding-top: 24px + 41px ==》41px为标题栏高度

  .title {
    font-size: 18px;
    color: #fff;
    padding-bottom: 10px;
  }

  .txt {
    color: #c4c3cf;
    line-height: 24px;
  }
}

.content {
  flex: 1;
  position: relative;

  .contentWrap {
    position: absolute;
    left: 0;
    top: -12px;
    z-index: 100;
    width: 100%;
    background: #fff;
    border-radius: 12px 12px 0 0;
    padding: 0 15px;
  }
}

.formBox {
  .item {
    font-size: 16px;
    border-bottom: 1px solid #f2f2f5;
    padding-bottom: 18px;

    .itemLabel {
      font-size: 14px;
      color: #191919;
      padding: 18px 0 20px 0;

      .notes {
        font-size: 12px;
        color: #b9b9c1;
        margin-left: 5px;
      }
    }

    /deep/ .van-cell {
      padding: 0;

      .van-field__control {
        border: none;
      }
    }
  }
}

.paymentBox {
  background: #fff;

  li:first-child {
    padding: 18px 0 20px 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 15px 0;

    .itemLeft {
      display: flex;
      align-items: center;

      .paymentIcon {
        width: 27px;
        height: 27px;
        margin-right: 10px;

        &.icon-pay-weixin {
          background: url('@{imgUrl}icon-pay-weixin.png') no-repeat center;
          background-size: 100% 100%;
        }

        &.icon-pay-alipay {
          background: url('@{imgUrl}icon-pay-alipay.png') no-repeat center;
          background-size: 100% 100%;
        }

        &.icon-pay-tst {
          background: url('@{imgUrl}icon-pay-tst.png') no-repeat center;
          background-size: 100% 100%;
        }
      }

      .name {
        font-size: 16px;
        color: #002222;
      }

      .tag {
        font-size: 10px;
        color: @redColor;
        border: 1px solid @redColor;
        border-radius: 6px;
        padding: 2px 8px;
        margin-left: 4px;
      }
    }

    .itemRight {
      display: flex;

      .selectIcon {
        width: 17px;
        height: 17px;
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

.footerWrap {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #f2f2f5;
  padding: 10px 15px;

  .price {
    font-size: 21px;
    color: #fc3b52;
    padding-top: 15px;
  }

  .confirmBtn {
    width: 200px;
    background: @redColor;
    border: 1px solid @redColor;
    color: #fff;
    font-size: 18px;
  }
}
</style>
