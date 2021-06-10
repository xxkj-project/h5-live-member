<!-- 
   充值地址
-->
<template>
  <div class="rechargeAddress">
    <headerBar background="#ffd347"></headerBar>

    <div class="main">
      <div class="topBg"></div>
      <img class="qrCode" :src="infoData.qrCodePicUrl" alt="" />
      <div class="copyAddressWrap addressWrap">
        <p class="addressText">{{ infoData.currencyAddress }}</p>
        <div
          v-clipboard:copy="infoData.currencyAddress"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="copyBtn btn"
        >
          复制{{ addressType }}充值地址
        </div>
      </div>

      <ul class="explain addressExplain">
        <li v-for="(item, index) in addressExplainText" :key="index">
          <p>
            <span>{{ index + 1 }}</span>
            {{ item }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import { getRechargeAddress } from '@/api/member'
export default {
  name: '',
  data() {
    return {
      addressExplainText: [
        '您充值至上述地址后，需要短暂时间保证整个网络节点确认；',
        '您的充值地址不会经常改变，可以重复充值；',
        '请务必确认电脑和浏览器安全，防止信息被篡改或泄露。',
        '充值完成后，请在【我的】-【充提记录】中查看。'
      ],
      infoData: {},
      addressType: ''
    }
  },
  created() {
    const { type } = this.$route.query
    this.addressType = type
    this.getData()
  },
  mounted() {},
  methods: {
    onCopy() {
      this.$toast('复制成功')
    },
    onError() {
      this.$toast('复制失败')
    },
    getData() {
      this.$loading.show()
      getRechargeAddress(this.addressType)
        .then(res => {
          this.$loading.hide()
          const data = res.data
          this.infoData = { ...this.infoData, ...data }
        })
        .catch(() => {
          this.$loading.hide()
        })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@topBgColor: #ffd347;

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  padding: 20px 15px 0;
  .topBg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 130px;
    background: @topBgColor;
  }
  .qrCode {
    position: relative;
    z-index: 100;
    width: 163px;
    height: 163px;
    background: #fff;
    box-shadow: 2px 5px 5px #f3f3f3;
    margin-bottom: 22px;
  }
  .addressWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .addressTitle {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .addressText {
      overflow: hidden;
      width: 100%;
      background: #f5f5f5;
      font-size: 16px;
      color: #999;
      line-height: 30px;
      text-align: center;
      word-wrap: break-word;
      padding: 0 20px;
      margin-bottom: 16px;
      border-radius: 10px;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 163px;
      height: 32px;
      font-size: 12px;
      color: #000;
      border-radius: 16px;
      margin-bottom: 30px;
      &.copyBtn {
        background: #ffd12f;
      }
      &.editBtn {
        background: #fff;
        border: 1px solid #ffd133;
      }
    }
  }
  .explain {
    padding-bottom: 50px;
    li {
      color: #000;
      p {
        flex: 1;
        font-size: 14px;
        line-height: 30px;
        word-break: break-word;
        span {
          display: inline-block;
          width: 18px;
          height: 18px;
          line-height: 18px;
          background: #ffd12f;
          border-radius: 9px;
          text-align: center;
          font-size: 13px;
          margin-right: 8px;
        }
      }
    }
    // li:first-child {
    //   color: #f2464a;
    //   span {
    //     color: #000;
    //   }
    // }
  }
  // .addressExplain {
  //   li:nth-child(2) {
  //     p {
  //       color: #f2464a;
  //       span {
  //         color: #000;
  //       }
  //     }
  //   }
  // }
}
</style>
