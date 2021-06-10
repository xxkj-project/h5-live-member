<!--
 * @Author: wangshengxian
 * @Date: 2021-01-13 01:58:19
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 15:25:17
 * @Desc: 周年庆活动
-->
<template>
  <div class="tickets">
    <headerBar
      :background="headConfig.bgColor"
      :arrowsType="headConfig.arrowsType"
      :titleOpacity="headConfig.titleOpacity"
      isMainFullScreen
      :isHighColor="false"
      :onBack="onBack"
    />
    <div class="bg">
      <img class="img" src="@/assets/images/currentActivity/tickets/mainBg.png" alt="" />
    </div>
    <div class="main">
      <div class="top">
        <img class="img" src="@/assets/images/currentActivity/tickets/titleBg.png" alt="" />
      </div>

      <div class="center">
        <!-- <p class="tstTxt">2000TST</p> -->
        <img class="img desc1" src="@/assets/images/currentActivity/tickets/descBg1.png" alt="" />
        <img class="img desc2" src="@/assets/images/currentActivity/tickets/descBg2.png" alt="" />
        <div class=" btn" @click="onSubmit">
          <img class="img" :src="btnImgUrl" alt="" />
        </div>
      </div>
    </div>
    <div class="explainWrap">
      <img class="img titleBg" src="@/assets/images/currentActivity/tickets/bottomBg1.png" alt="" />

      <div class="explainBox">
        <div class="titleBox">
          <p>1月16日</p>
          <p>年会直播间ID：20073630</p>
        </div>
        <div class="itemWrap">
          <div class="item" :class="{ noTimeItem: !item.time }" v-for="(item, index) in explainList" :key="index">
            <span class="dot"></span>
            <p class="itemTime">{{ item.time }}</p>
            <p class="itemTitle">{{ item.title }}</p>
          </div>
          <div class="line"></div>
        </div>
      </div>

      <img class="img bottomBg" src="@/assets/images/currentActivity/tickets/bottomBg2.png" alt="" />
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import platform from '@/utils/platform'
import headerMixins from '@/mixins/headConfig'
import nokeyMixins from '@/mixins/noKey'
import { mapState } from 'vuex'
import { getTicketsStatus, operateTicketsPurchase } from '@/api/2021_activity'
export default {
  name: '',
  mixins: [headerMixins, nokeyMixins],
  data() {
    return {
      remBase: 37.5,
      isBuy: false,
      explainList: [
        { time: '12:40-12:50', title: '在线互动暖场' },
        { time: '12:50-12:55', title: '优贝迪企业宣传片播放' },
        { time: '12:55-13:00', title: '主持人开场' },
        { time: '13:00-13:05', title: '优贝迪年度工作成果回顾视频' },
        { time: '13:05-13:15', title: '团体舞蹈《幸福中国一起走》' },
        { time: '13:15-13:20', title: '贵宾致辞' },
        { time: '13:20-13:25', title: '幸运大抽奖测试环节' },
        { time: '13:25-13:55', title: '优贝迪全球总裁致辞' },
        { time: '13:55-14:15', title: '优贝迪全球总裁声乐表演' },
        { time: '14:15-14:20', title: '优贝迪投资孵化企业总裁致辞' },
        { time: '14:20-14:35', title: '马来西亚艺人演出' },
        { time: '', title: '《I Love The Sky》、《飞鸟和蝉》' },
        { time: '14:35-14:40', title: '幸运大抽奖第1轮' },
        { time: '14:40-14:50', title: '团体舞蹈《你笑起来真好看》' },
        { time: '14:50-15:00', title: '马来西亚艺人演出《酒家》、《攀登》' },
        { time: '15:00-15:20', title: '魔术串烧' },
        { time: '15:20-15:30', title: '幸运大抽奖第2轮' },
        { time: '15:30-15:40', title: '马来西亚艺人演出' },
        { time: '', title: '《Mr. Train》 、《誰說不可能 》' },
        { time: '15:40-15:50', title: '《旗袍秀》' },
        { time: '15:50-16:00', title: '合唱曲目《心型圈》' },
        { time: '16:00-16:10', title: '舞蹈《鸿雁》' },
        { time: '16:10-16:15', title: '幸运大抽奖第3轮' },
        { time: '16:15-16:25', title: '唐僧直播总裁歌唱表演' },
        { time: '', title: '《有没有》、《月半小夜曲》' },
        { time: '16:25-16:30', title: '企业颁奖仪式' },
        { time: '16:30-18:30', title: '晚餐时间' },
        { time: '18:30-18:45', title: '优贝迪创始人徐刚博士致辞' },
        { time: '18:45-19:00', title: '马来西亚企业颁奖仪式' },
        { time: '19:00-19:10', title: '相声《暴富2021》' },
        { time: '19:10-19:15', title: '声乐《伦敦的爱情》' },
        { time: '19:15-19:25', title: '幸运大抽奖第4轮' },
        { time: '19:25-19:35', title: '《月光下的凤尾竹》' },
        { time: '19:35-19:40', title: '幸运大抽奖第5轮' },
        { time: '19:40-19:45', title: '优贝迪总裁风貌展示(时装走秀)' },
        { time: '19:45-19:55', title: '社区颁奖Top10' },
        { time: '19:55-20:05', title: '合唱《明天会更好》' },
        { time: '20:05-20:35', title: '重磅抽奖' },
        { time: '20:35-20:45', title: '社区选送节目颁奖仪式' },
        { time: '20:45-21:00', title: '拍照合影' }
      ]
    }
  },
  computed: {
    ...mapState('globalStatus', ['statusBarHeight']),
    mainTop() {
      let top = +this.statusBarHeight + 40
      // console.log('-top-', top)
      return top / this.remBase + 'rem'
    },
    btnImgUrl() {
      return this.isBuy
        ? require('@/assets/images/currentActivity/tickets/btnBg2.png')
        : require('@/assets/images/currentActivity/tickets/btnBg1.png')
    }
  },
  components: { headerBar },
  created() {
    this.setInitData()
  },
  mounted() {},
  methods: {
    setInitData() {
      console.log('-is-no-key-', this.isNoKey)
      if (!this.isNoKey) {
        this.getData()
        return
      }
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
      }, 500)
    },
    onBack() {
      openNative.closeWebview()
    },
    onSubmit() {
      this.valideFunc(() => {
        this.$dialog
          .confirm({
            message: '确认购买门票',
            beforeClose: (action, done) => {
              if (action === 'confirm') {
                this.submitReq(done)
                return
              }
              done()
            }
          })
          .then(() => {})
          .catch(() => {})
      })
    },

    submitReq(done) {
      operateTicketsPurchase()
        .then(res => {
          this.toastFunc('购买成功！')
          this.isBuy = true
          done()
        })
        .catch(err => {
          console.log('-err-', err)
          this.toastFunc(err.msg)
          done()
        })
    },
    getData() {
      this.$loading.show()
      getTicketsStatus()
        .then(res => {
          this.$loading.hide()
          console.log('-res-', res)
          const data = res.data
          this.isBuy = data
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    handleNoKeyFunc() {
      console.log('-没有key的处理方法-')
      if (platform.isWechat) {
        this.toastFunc('请点击右上角，选择手机浏览器打开！')
        return
      }
      this.clickEventFunc()
    },
    valideFunc(callback) {
      if (this.isNoKey) {
        this.handleNoKeyFunc()
        return
      }
      if (this.isBuy) {
        this.toastFunc('您已购买！')
        return
      }
      callback()
    },
    toastFunc(message, duration = 2000) {
      this.$toast({
        message,
        duration,
        getContainer: '.tickets'
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@import './style/tickets';
</style>
