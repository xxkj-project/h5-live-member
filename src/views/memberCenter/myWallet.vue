<!-- 
   我的钱包
-->
<template>
  <div class="myWallet">
    <headerBar />

    <div class="main">
      <div class="topBox">
        <div class="topBg">
          <p class="amountTxt">{{ infoData.cash }}</p>
          <p class="descBox"><span class="sign1"></span><span>我的TST</span></p>
        </div>
      </div>
      <div class="tabBox">
        <van-tabs
          v-model="currActIdx"
          type="line"
          title-active-color="rgba(25,25,25,1)"
          title-inactive-color="rgba(0,0,0,0.6)"
          :line-width="16 / remBase + 'rem'"
          :line-height="3 / remBase + 'rem'"
        >
          <van-tab :title="item.title" v-for="(item, index) in tabList" :key="index">
            <template v-if="index == 0">
              <buyOptions :list="list" @change="handleBuyOptions" />
              <paymentMode @confirm="handlePaymentMode" />
            </template>
            <template v-else>
              <currencyTopup />
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <diyBuy :formData="diyFormData" :visible.sync="isDiyBuy" @success="handleDiyBuy" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import paymentMode from '@/components/paymentMode'
import buyOptions from '@/views/memberCenter/components/myWallet/buyOptions'
import currencyTopup from './components/myWallet/currencyTopup'
import diyBuy from './components/diyBuyOption'
import jsPrecision from '@/utils/jsPrecision'
import openNative from '@/utils/openNative'
import jsEventManager from '@/utils/jsEventManager'
import { getRechargeConfig, getRechargeUserInfo, generalPay } from '@/api/pay'
export default {
  name: '',
  data() {
    return {
      remBase: 37.5,
      currActIdx: 0, // 当前激活的tabIdx
      tabList: [
        { type: 0, status: 'exchange', title: '快捷充值' },
        { type: 1, status: 'withdraw', title: '币种充值' }
      ],
      infoData: { cash: '', rate: '' },
      selIndex: 0,
      list: [],
      isDiyBuy: false,
      diyFormData: { number: 0 }
    }
  },
  computed: {},
  components: { headerBar, paymentMode, buyOptions, currencyTopup, diyBuy },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === '/rechargeAddress') vm.currActIdx = 1
    })
  },
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
    handleDiyBuy(data) {
      const len = this.list.length
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
@imgUrl: '~@/assets/images/myWallet/';

.main {
  .topBox {
    padding: 10px 13px;
  }

  /deep/ .van-tabs {
    .van-tabs__wrap {
      border-bottom: 1px solid #dddee6;

      .van-tab {
        line-height: 45px;
      }

      .van-tabs__line {
        background: #fcd200;
      }
    }
  }
}

.topBg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  background: url('@{imgUrl}topBg.png') no-repeat center / cover;
  color: #f5c27f;
  font-size: 12px;

  .amountTxt {
    font-size: 33px;
    margin-bottom: 20px;
  }

  .descBox {
    display: flex;
    align-items: center;

    .sign1 {
      width: 11px;
      height: 11px;
      background: url('@{imgUrl}icon-tst-sign1.png') no-repeat center / cover;
      margin-right: 4px;
    }
  }
}
</style>
