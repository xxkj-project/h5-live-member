<!--
 * @Author: wangshengxian
 * @Date: 2021-01-22 13:34:13
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 17:05:16
 * @Desc: 2021 - 新年集卡活动
-->
<template>
  <div class="newYear">
    <headerBar isMainFullScreen arrowsType="white" :titleOpacity="0" background="rgba(0,0,0,0)" :onBack="onBack">
      <span class="shareBtn" @click="onGoShare"></span>
    </headerBar>

    <!-- <headerBar
      isMainFullScreen
      :arrowsType="headConfig.arrowsType"
      :titleOpacity="headConfig.titleOpacity"
      :background="headConfig.bgColor"
      :onBack="onBack"
    >
      <span class="shareBtn"></span>
    </headerBar> -->

    <div class="main">
      <div class="container">
        <div class="topWrap">
          <img src="@/assets/images/currentActivity/newYearShare/topBg1.png" alt="" />
          <p class="rulesBtn" :style="{ top: rulesTop }" @click="onOpenRule">活动规则</p>
        </div>

        <div class="infoWrap">
          <div class="infoBg">{{ infoData.amount }}人已经集齐，2月11日22:00开奖</div>
        </div>

        <div class="cardWrap">
          <template v-if="status == 1">
            <cardBox ref="cartBoxRef" :list="cardList" />
          </template>
          <template v-else-if="status == 2">
            <div class="cardBox">
              <div class="cartItem cart_status_2"></div>
            </div>
          </template>
          <template v-else>
            <div class="cardBox">
              <div class="cartItem cart_status_3">
                <p>恭喜你获得</p>
                <p class="number">{{ infoData.tf }}<span>TF</span></p>
                <p>七个工作日发放至账户</p>
              </div>
            </div>
          </template>
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
              <span class="operateBtn" @click="onGoEvent('invite')"></span>
            </li>
            <li class="item method_2">
              <span class="icon"></span>
              <p class="txtBox">
                <span>在直播间送指定礼物(福袋)获得字卡</span>
                <span>每送出1次福袋就可获得一个字卡机会</span>
              </p>
              <span class="operateBtn" @click="onGoEvent('send')"></span>
            </li>
          </ul>
        </div>

        <div class="explainWrap">
          <p>如有任何疑问，请咨询我们唐僧直播官方微信客服</p>
          <p>唐僧直播客服微信号：TangSengKF001。</p>
          <p>本次活动最终解释权归唐僧直播所有</p>
        </div>
      </div>
    </div>

    <rule :visible.sync="isRule" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import cardBox from './components/newYear/cardBox'
import rule from './components/newYear/rule'
import againReloadMixins from '@/mixins/againReload'
import { mapState } from 'vuex'
import openNative from '@/utils/openNative'
import { getMergeNum, getWordInfo, operateWordMerge } from '@/api/2021_activity'
import tools from '@/utils/tools'
import { baseResourceUrl, projectUrl } from '@/const/global'
export default {
  name: '',
  inject: ['reload'],
  mixins: [againReloadMixins],
  data() {
    return {
      remBase: 37.5,
      isRule: false,
      status: 1, // 显示的状态（1、活动未开始；2、卡已经集齐；3、已开奖）
      cardList: [],
      infoData: {
        amount: 0,
        tf: '',
        userId: ''
      }
    }
  },
  computed: {
    ...mapState('user', ['accessToken']),
    ...mapState('globalStatus', ['statusBarHeight']),
    rulesTop() {
      return (+this.statusBarHeight + 40) / this.remBase + 'rem'
    },
    shareUrl() {
      return `${projectUrl}/2021_new_year_share`
    }
  },
  components: { headerBar, cardBox, rule },
  created() {
    this.getCollectNum()
    this.getData()
  },
  mounted() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    onGoShare() {
      if (!this.infoData.userId) return
      this.goShareFunc()
    },
    setShareTitle() {
      let titles = [
        '新春福利第一波“集字瓜分1亿TF”，参与就可免费赢取！',
        '福利活动 | 新年祈福，集字福利活动来啦！',
        '牛气跨新年，心动到爆的牛年集字福利来了！',
        '新年福利 | 集字福利，伴你牛气十足每一天！',
        '唐僧集字活动已上线！1亿TF等你来瓜分'
      ]
      let idx = Math.floor(Math.random() * 5)
      return titles[idx]
    },
    setShareDesc() {
      let descs = [
        '集字瓜分1亿TF，参与就可免费赢取~',
        '集字瓜分1亿TF，赶快来参与！',
        '免费参与集字活动，瓜分1亿TF！',
        '集字活动开始啦！快来参与吧~~',
        '瓜分1亿TF大奖活动，怎可不来?',
        '快来瓜分1亿TF！开年大吉!'
      ]
      let idx = Math.floor(Math.random() * 5)
      return descs[idx]
    },
    goShareFunc() {
      let title = this.setShareTitle()
      let desc = this.setShareDesc()
      let url = `${this.shareUrl}?key=${this.accessToken}&code=${this.infoData.userId}`
      // console.log('-share-url-', url)
      const params = {
        title,
        desc,
        url,
        image: `${baseResourceUrl}/shareIcon.png`,
        type: 4
      }
      openNative.goShare(params)
    },
    onOpenRule() {
      this.isRule = true
    },
    onGoEvent(type) {
      if (type == 'send') {
        // 去送礼
        openNative.closeWebview()
        return
      }
      this.goShareFunc()
    },
    // 设置合成动画 status-one
    setStatusOneAni() {
      const cartEl = document.querySelector('.cardBox')
      cartEl.classList.remove('cardInitAni')
      setTimeout(() => {
        cartEl.classList.add('cardStatusOneAni')
      }, 0)
    },
    // 设置合成动画 status-two
    setStatusTwoAni() {
      const cartEl = document.querySelector('.cardBox')
      cartEl.classList.remove('cardStatusOneAni')
      setTimeout(() => {
        cartEl.classList.add('cardStatusTwoAni')
        this.status = 2
      }, 0)
    },
    getCollectNum() {
      getMergeNum()
        .then(res => {
          const data = res.data
          data && (this.infoData.amount = tools.toThousands(data))
        })
        .catch(err => {
          // console.log('-err-', err)
          this.handleReload(err.msg, this.handleErr)
        })
    },
    // 请求失败后，重新刷新
    handleErr() {
      this.reload()
    },
    // 集字合成
    setWordMerge() {
      operateWordMerge().then(res => {
        // console.log('-res-', res)
        this.setStatusOneAni()
        setTimeout(() => {
          this.status = 2
          this.getCollectNum()
          this.$dialog
            .confirm({
              title: '提示',
              message: '恭喜您，集齐所有字卡，请耐心等待开奖！！！'
            })
            .then(() => {})
            .catch(() => {})
        }, 1500)
      })
    },
    getData() {
      this.$loading.show()
      getWordInfo()
        .then(res => {
          this.$loading.hide()
          // console.log('-word-res-', res)
          let { collect, tf, userId, nickName, ...otherObj } = res.data
          // otherObj = { cheng: 1, fen: 10, fu: 1, nian: 1, niu: 1, qi: 1, seng: 1, tang: 1, tian: 1, xiong: 1 }
          // tf = 100
          // collect = true
          this.infoData.userId = userId
          if (tf) {
            // 开奖了
            this.infoData.tf = tf
            this.status = 3
            console.log('-是否开奖-', true)
            return
          }
          console.log('-是否开奖-', false)
          if (collect) {
            // 已经合成
            this.status = 2
            console.log('-是否合成-', true)
            return
          }
          console.log('-是否合成-', false)
          // 没有合成也没有开奖
          this.status = 1
          this.cardList = this.setCartList(otherObj)
          console.log('-list-', this.cardList)
          let cards = Object.values(otherObj).filter(val => val == 0)
          // console.log('-没有集齐-list-', cards)
          if (cards.length > 0) {
            console.log('-是否集齐-', false)
            return
          }
          console.log('-是否集齐-', true)
          setTimeout(() => {
            this.setWordMerge()
          }, 3000)
        })
        .catch(err => {
          this.$loading.hide()
        })
    },

    setCartList(obj) {
      // console.log('-obj-', obj)
      let dictionary = ['niu', 'nian', 'tian', 'fu', 'qi', 'tang', 'seng', 'fen', 'xiong', 'cheng']
      return tools.objConvertArr(obj, dictionary)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@import './style/newYear';
</style>
