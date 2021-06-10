<!--
 * @Author: wangshengxian
 * @Date: 2021-01-22 13:34:13
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 15:23:51
 * @Desc: 2021 - 新年集卡分享
-->
<template>
  <div class="newYearShare">
    <headerBar :isNeedStatusBar="false" background="#f5f5f5" v-if="!isWx" />

    <div class="topWrap">
      <div class="left">
        <span class="logo"></span>
        <p class="logoTxt">唐僧直播</p>
        <p class="descTxt">下载APP参与活动</p>
      </div>
      <span class="downloadBtn" @click="onDownloadApp"></span>
    </div>
    <div class="main">
      <div class="container">
        <div class="mainBg">
          <img src="@/assets/images/currentActivity/newYearShare/topBg2.png" alt="" />
        </div>

        <div class="infoWrap">
          <div class="infoBg">{{ amount }}人已经集齐，2月11日22:00开奖</div>
        </div>

        <div class="descWrap">
          <div class="descBox">
            <p>唐僧直播为大家准备了迎新年福利活动</p>
            <p>
              成功集齐
              <span class="highWords">
                “牛·年·添·福·气·唐·僧·奋·雄·程”
              </span>
              10个字卡，即可瓜分1亿TF奖励!
            </p>
          </div>
          <img class="qrcode" src="@/assets/images/currentActivity/newYearShare/icon-qrcode.png" alt="" />
        </div>

        <div class="btnWrap">
          <span class="opeBtn" @click="onOpenRegister">立即参与</span>
        </div>

        <div class="operateWrap">
          <ul class="listBox">
            <li class="item method_1">
              <span class="icon"></span>
              <p class="txtBox">
                <span>邀请好友(填写你的邀请码)获得字卡</span>
                <span>每邀请一位好友，即可获得一张字卡</span>
                <span>填写邀请码方式：花果山-会员中心-邀请码</span>
              </p>
              <span class="operateBtn" @click="onJumpPage"></span>
            </li>
            <li class="item method_2">
              <span class="icon"></span>
              <p class="txtBox">
                <span>在直播间送指定礼物(福袋)获得字卡</span>
                <span>每送出1次福袋就可获得一个字卡机会</span>
              </p>
              <span class="operateBtn" @click="onJumpPage"></span>
            </li>
          </ul>
        </div>

        <div class="rulesWrap">
          <span class="ruleTitleBg"></span>
          <div class="ruleTxtBox">
            <p>
              1.春节活动期间内，只要在主播直播间送出指定礼物，即可获得1个字卡，每日无上限，送礼越多，获得的字卡越多。
            </p>
            <p>
              2.成功邀请新好友并下载注册唐僧直播，即可获得一张字卡，邀请的越多，获得字卡的记录越高，邀请好友不受限次数，系统消息会通知您获得的字卡。
            </p>
            <p>3.集齐“牛·年·添·福·气·唐·僧·奋·雄·程”10个字卡合并后等待开奖，一起瓜分一亿TF。</p>
            <p>4.奖励将在活动结束后7个工作日内发放。</p>
            <p>5.如有任何疑问，请咨询我们唐僧直播官方微信客服，微信号：TangSengKF001。</p>
            <p>更多精彩内容和活动，敬请关注“唐僧直播”微信公众号及官方微信群。</p>
          </div>
          <p class="explainTxt">本次活动最终解释权归唐僧直播所有</p>
        </div>
      </div>
    </div>

    <shareRegister :visible.sync="isShowRegister" @success="handleRegisterSuccess" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import shareRegister from './components/newYear/shareRegister'
import platform from '@/utils/platform'
import noKeyMixins from '@/mixins/noKey'
import { getMergeNum } from '@/api/2021_activity'
import tools from '@/utils/tools'
import { appDownloadUrl } from '@/const/global'
export default {
  name: '',
  mixins: [noKeyMixins],
  data() {
    return {
      isShowRegister: false,
      amount: 0
    }
  },
  computed: {
    isWx() {
      return platform.isWechat
    }
  },
  components: { headerBar, shareRegister },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    onDownloadApp() {
      this.validateFunc(() => {
        window.location.href = appDownloadUrl
      })
    },
    onOpenRegister() {
      this.isShowRegister = true
    },
    onJumpPage() {
      this.validateFunc(() => {
        // 非微信环境下，优先唤起客户端app,没有下载过，3秒后自动跳转到下载页，clickEventFunc方法定义在mixins中，作为一个全局的方法复用
        this.clickEventFunc()
      })
    },
    // 注册成功回调
    handleRegisterSuccess() {},
    getData() {
      this.$loading.show()
      getMergeNum()
        .then(res => {
          this.$loading.hide()
          console.log('-res-', res)
          const data = res.data
          data && (this.amount = tools.toThousands(data))
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    validateFunc(callback) {
      if (this.isWx) {
        this.$toast({
          message: '请点击右上角，选择手机浏览器打开！',
          duration: 2000
        })
        return
      }
      callback()
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@import './style/newYearShare';
</style>
