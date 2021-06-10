<!--
 * @Author: wangshengxian
 * @Date: 2021-01-12 12:05:34
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 11:20:25
 * @Desc: 充值 - 购买充值
-->
<template>
  <div class="rechargeBuy">
    <headerBar background="#ffd347" />
    <div class="main">
      <div class="topWrap">
        <div class="infoContainer">
          <div class="infoBox">
            <p class="infoTitle">余额(<span class="currencyIcon">TST</span>)</p>
            <p class="infoValue">{{ infoData.cash }}</p>
            <p class="infoDesc">
              今日价格：{{ infoData.rate }}元/
              <span class="currencyIcon">TST</span>
              <van-popover v-model="isPopover" placement="bottom" trigger="click" get-container="rechargeBuy">
                <p class="tipsTxt">价格来源于交易所，变动属正常现象!</p>
                <template #reference>
                  <van-icon class="tipsIcon" name="question" />
                </template>
              </van-popover>
            </p>
          </div>
        </div>
      </div>

      <buyOptions :list="list" @change="handleBuyOptions" />

      <paymentMode @confirm="handlePaymentMode" />
    </div>

    <diyBuy :formData="diyFormData" :visible.sync="isDiyBuy" @success="handleDiyBuySuccess" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import paymentMode from '@/components/paymentMode'
import buyOptions from '@/views/memberCenter/components/rechargeBuy/buyOptions'
import diyBuy from '@/views/memberCenter/components/diyBuyOption'
import openNative from '@/utils/openNative'
import jsEventManager from '@/utils/jsEventManager'
import jsPrecision from '@/utils/jsPrecision'
import { getRechargeConfig, getRechargeUserInfo, generalPay } from '@/api/pay'
export default {
  name: '',
  data() {
    return {
      isPopover: false,
      infoData: {
        cash: '',
        rate: ''
      },
      selIndex: 0,
      list: [],
      isDiyBuy: false,
      diyFormData: { number: 0 }
    }
  },
  computed: {},
  components: { headerBar, paymentMode, buyOptions, diyBuy },
  created() {
    this.getData()
  },
  mounted() {
    jsEventManager.addEvent('paySuccess', this.paymentResult)
  },
  methods: {
    paymentResult(data) {
      console.log('-native-call-js-', data)
      // TODO: ios支付宝网页支付接收不到回调，调用的是支付宝客户端有回调
      if (data != 200) {
        this.$toast('购买失败！')
        return
      }
      this.$toast({
        message: '购买成功，可能会出现延时到账情况，请您耐心等待！',
        duration: 3000
      })
      getRechargeUserInfo().then(res => {
        const data = res.data
        this.infoData.cash = data.cash
      })
    },
    handleDiyBuySuccess(data) {
      console.log('-diy-', data)
      let len = this.list.length
      this.list[len - 1].number = data
      this.list[len - 1].price = jsPrecision.mul(data, this.infoData.rate)
    },
    handleBuyOptions(index) {
      console.log('-index-', index)
      this.selIndex = index
      const lastIdx = this.list.length - 1
      if (index === lastIdx) {
        const curr = this.list.slice(-1)[0]
        this.diyFormData = { ...curr }
        this.isDiyBuy = true
      }
    },
    handlePaymentMode(type) {
      console.log('-type-', type)
      const { status, number, id } = this.list[this.selIndex]
      if (+number === 0) {
        this.$toast('请您先自定义购买数量')
        return
      }
      const params = status === 'diy' ? { amount: +number } : { id }
      console.log('-type-', type, '-params-', params)
      this.$pageLoading.show('加载中...')
      generalPay(status, type, params)
        .then(res => {
          console.log('-res-', res.data)
          this.$pageLoading.hide()
          const data = res.data
          openNative.goGeneralPay({ type, data })
        })
        .catch(err => {
          this.pageLoading.hide()
        })
    },
    async getData() {
      this.$loading.show()
      try {
        const userInfoRes = await getRechargeUserInfo()
        const configRes = await getRechargeConfig()
        // console.log('-userinfo-', userInfoRes)
        // console.log('-list-data-', configRes)
        this.$loading.hide()
        this.infoData = userInfoRes.data
        const rate = this.infoData.rate
        const list = configRes.data
        this.list = list.map(val => ({ status: 'default', price: jsPrecision.mul(val.number, rate), ...val }))
        this.list = [...this.list, { status: 'diy', number: 0, price: 0, reward: 0 }]
        console.log('-list-', this.list)
      } catch (err) {
        this.$loading.hide()
      }
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/recharge/';

/deep/ .van-popup {
  .van-popover__arrow {
    color: rgba(0, 0, 0, 0.5);
  }
}

.tipsTxt {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px 6px;
}

.infoDesc {
  .currencyIcon {
    margin-right: 10px;
  }
}

.rechargeBuy {
  background: #f5f5f5;
  height: 100%;

  .main {
    background: #f5f5f5;
  }
}

.topWrap {
  position: relative;
  height: 110px;
  background: #ffd347;

  .infoContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 15px 0;

    .infoBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      background: #fff;
      box-shadow: 0px 10px 48px 3px rgba(0, 0, 0, 0.06);
      border-radius: 18px;
      padding: 36px 0 18px 0;

      p {
        display: flex;
        align-items: center;
      }

      .currencyIcon {
        // width: 14px;
        // height: 14px;
        // background: url('@{imgUrl}icon-money-middle2.png') no-repeat center;
        // background-size: 100% 100%;
      }

      .tipsIcon {
        font-size: 16px;
      }

      .infoTitle {
        font-size: 15px;
        color: #ec5319;
      }
      .infoValue {
        font-size: 30px;
        line-height: 30px;
        padding: 20px 0 25px 0;
      }
      .infoDesc {
        font-size: 14px;
        color: #999;

        .currencyIcon {
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
