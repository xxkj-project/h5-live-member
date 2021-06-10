<!-- 
   充值币种
-->
<template>
  <div class="currency-kind">
    <headerBar background="#ffd347" :onBack="onBack"></headerBar>
    <div class="main">
      <div class="content">
        <div class="item" v-for="(item, index) in list" :key="index" @click="onOperate(item)">
          <p class="item-name">{{ item.name }}</p>
          <span class="item-right-arrows"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
export default {
  name: '',
  data() {
    return {
      list: [
        { name: 'UBNK', isNeedAddress: true },
        { name: 'TST', isNeedAddress: true },
        { name: 'TF', isNeedAddress: true },
        { name: 'AUSD', isNeedAddress: false },
        { name: 'USDT', isNeedAddress: false },
        { name: 'ETH', isNeedAddress: false }
      ],
      addressInfo: {},
      currAddressInfo: {
        type: '',
        addressText: ''
      }
    }
  },
  computed: {},
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 300)
  },
  mounted() {},
  methods: {
    onBack() {
      const { device } = this.$route.query
      device ? openNative.closeWebview() : this.$router.go(-1)
    },
    onOperate(item) {
      let query = { type: item.name }
      this.$router.push({
        path: '/rechargeAddress',
        query
      })
    },

    handleChange(data) {
      this.currAddressInfo.type = data[0]
      this.currAddressInfo.addressText = data[1]

      // TODO 测试使用
      switch (data[0]) {
        case 'UBNK':
          this.addressInfo.ubnkAddress = data[1]
          break
        case 'TST':
          this.addressInfo.tstAddress = data[1]
          break
        case 'TF':
          this.addressInfo.tfAddress = data[1]
          break
        default:
          break
      }
      let msg = '钱包地址设置成功!'
      this.$toast({
        message: msg,
        duration: 1000,
        onClose: () => {
          console.log(this.currAddressInfo)
          let query = {
            type: this.currAddressInfo.type,
            walletAddress: this.currAddressInfo.addressText,
            isNeedAddress: true
          }
          this.$router.push({
            path: '/rechargeAddress',
            query
          })
        }
      })
    },
    setSelAddress(type) {
      let str = ''
      switch (type) {
        case 'UBNK':
          str = this.addressInfo.ubnkAddress
          break
        case 'TST':
          str = this.addressInfo.tstAddress
          break
        case 'TF':
          str = this.addressInfo.tfAddress
          break
        default:
          break
      }
      return str
    },
    // 作废
    onOperateOld(item) {
      // console.log(item)
      const { name, isNeedAddress } = item
      this.currAddressInfo.type = name
      this.currAddressInfo.addressText = this.setSelAddress(name)
      let query = {
        type: name,
        isNeedAddress
      }
      console.log('-query-', query, '-currAddressInfo-', this.currAddressInfo)
      if (isNeedAddress) {
        if (!this.currAddressInfo.addressText) {
          // UBNK、TST、TF 点击需要调用一个接口，或者进入当前页面直接调用一个接口，获取用户的钱包地址，
          this.isShowDialog = true
          return
        }
        query.walletAddress = this.currAddressInfo.addressText
      }
      this.$router.push({
        path: '/rechargeAddress',
        query
      })
    },
    getData() {
      setTimeout(() => {
        let res = {
          data: {
            ubnkAddress: '',
            tstAddress: '324242',
            tfAddress: ''
          }
        }
        this.addressInfo = res.data
        console.log('-address-info-', this.addressInfo)
      }, 1000)
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/';
.currency-kind {
  .content {
    padding-top: 18px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 10px;
      .item-name {
        font-size: 18px;
        color: #222;
      }
      .item-right-arrows {
        width: 10px;
        height: 12px;
        background: url('@{imgUrl}blackRightArrow.png') no-repeat center / cover;
      }
    }
  }
}
</style>
