<!--
 * @Author: wangshengxian
 * @Date: 2020-09-17 09:53:38
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 15:00:00
 * @Desc: 真假美猴王活动
-->
<template>
  <div class="activity-page">
    <headerBar
      :background="headConfig.bgColor"
      :arrowsType="headConfig.arrowsType"
      :titleOpacity="headConfig.titleOpacity"
      :onBack="onBack"
      :isMainFullScreen="true"
      :isHighColor="false"
    ></headerBar>
    <div class="main">
      <!-- 真假美猴王活动 -->
      <div class="topWrap">
        <img class="logo" src="@/assets/images/currentActivity/monkeyKing/logo.png" alt="" />
        <img class="title" src="@/assets/images/currentActivity/monkeyKing/icon-title.png" alt="" />
        <p class="time">
          <span>活动时间：{{ configData.startTime | filterActTime }}-{{ configData.endTime | filterActTime }}</span>
        </p>
        <div class="activityRule" @click="onOpenRule">
          活动规则
        </div>
        <div class="news">
          <img class="icon-message" src="@/assets/images/currentActivity/monkeyKing/icon-horn.png" alt="" />
          <div class="newsWrap">
            <ul class="newsList">
              <li class="item" v-for="item in newsList" :key="item.id">
                <!-- 用户名超出6个字显示 。。。 -->
                <p class="name one-txt-cut">{{ item.fromName }}</p>
                <span class="text">送给</span>
                <p class="name one-txt-cut">{{ item.toName }}</p>
                <span>礼物美猴王x</span>
                <p>{{ item.count }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="middleWrap">
        <div class="bonusNum">
          <p class="title">奖池累计奖金</p>
          <p class="num">{{ configData.tstNum }}tst</p>
        </div>

        <div class="countDownBox">
          <clock :time="configData.remainTime" @end="handleClockEnd" />
        </div>
      </div>
      <div class="bottomWrap">
        <div class="tabNav">
          <div
            class="navItem"
            :class="{ active: activeIdx == index }"
            v-for="(item, index) in tabbarList"
            :key="index"
            @click="onSwitchTab(index)"
          >
            <p>{{ item.txt }}</p>
          </div>
        </div>

        <div class="listWrap">
          <div class="noDataTxt" v-show="!isRankList">
            <p>
              {{ noDataText }}
            </p>
          </div>
          <div class="" v-show="isRankList">
            <div class="classTop">
              <div
                class="item"
                :class="index === 0 ? 'left' : index === 1 ? 'center' : 'right'"
                v-for="(item, index) in rankTopList"
                :key="index"
              >
                <div class="noDataTxt" v-if="!item">
                  <p>虚位以待</p>
                </div>
                <div v-else>
                  <div class="imgWrap">
                    <img class="leftImg" :src="rankIconUrls[index].imgUrl" alt="" />
                    <img :src="item.photo" alt="" />
                  </div>
                  <div class="info">
                    <p class="name one-txt-cut">{{ item.userName }}</p>
                    <p class="getNum one-txt-cut">
                      {{ rankDescTxt }}美猴王:<span>{{ item.giftNums }}个</span>
                    </p>
                    <button
                      class="attationBtn"
                      :class="{ hadAttation: item.fallow }"
                      @click="onAttention(item, index, 1)"
                    >
                      {{ item.fallow | filterAs }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ul class="classItem">
              <li class="item" v-for="(item, index) in rankList" :key="index">
                <div class="left">
                  <p class="rankNum">{{ item.id }}</p>
                  <div class="headerImg">
                    <img class="img" :src="item.photo" alt="" />
                    <img class="liveIcon" src="@/assets/images/currentActivity/monkeyKing/icon-live.png" alt="" />
                  </div>
                  <div class="num">
                    <p class="name one-txt-cut">{{ item.userName }}</p>
                    <p class="getNum">
                      {{ rankDescTxt }}美猴王:<span>{{ item.giftNums }}个</span>
                    </p>
                  </div>
                </div>
                <div class="right">
                  <button :class="{ hadAttation: item.fallow }" @click="onAttention(item, index, 2)">
                    {{ item.fallow | filterAs }}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="explainTxt">
        本次活动最终解释权归唐僧直播所有
      </div>
    </div>

    <rule :visible.sync="isRule" @close="handleCloseRule" />

    <div class="loading-global" v-show="isLoading">
      <div class="loading-content">
        <van-loading size="24px" text-size="14px" type="spinner" color="#fff" vertical>加载中...</van-loading>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import rule from './components/monkey/rule'
import clock from './components/monkey/clock'
import openNative from '@/utils/openNative'
import headConfigMixins from '@/mixins/headConfig'
import tools from '@/utils/tools'
import Qs from 'qs'
import { getMonkeyKingConfig, getMonkeyKingRank, operateAttention } from '@/api/2020_activity'
export default {
  name: '',
  mixins: [headConfigMixins],
  data() {
    return {
      isLoading: false,
      isRule: false,
      paramsObj: {
        type: 1, // 1主播 2用户
        time: 1 // 1周榜 2月榜
      },
      configData: {
        startTime: '',
        endTime: '',
        remainTime: -1,
        tstNum: ''
      },
      timer: null,
      newsList: [],
      listBgHeight: 680, // list高度
      activeIdx: 0,
      tabbarList: [
        { type: 'one', txt: '周星榜' },
        { type: 'two', txt: '月星榜' },
        { type: 'three', txt: '降妖周榜' },
        { type: 'four', txt: '降妖月榜' }
      ],
      noDataText: '暂无主播上榜',
      rankTopList: [], // 榜单前三
      rankList: [], // 榜单剩余
      rankIconUrls: [
        { imgUrl: require('@/assets/images/currentActivity/monkeyKing/left.png') },
        { imgUrl: require('@/assets/images/currentActivity/monkeyKing/center.png') },
        { imgUrl: require('@/assets/images/currentActivity/monkeyKing/right.png') }
      ]
    }
  },
  computed: {
    isRankList() {
      return this.rankTopList.length > 0
    },
    rankDescTxt() {
      return this.paramsObj.type == 1 ? '收到' : '送出'
    }
  },
  filters: {
    filterActTime(val) {
      return val.replace(/-/g, '.')
    },
    filterAs(val) {
      return val == false ? '关注' : '已关注'
    }
  },
  created() {
    console.log(window.innerWidth, window.innerHeight)
    this.getConfigData()
    this.getData()
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    onBack() {
      openNative.closeWebview()
    },
    onOpenRule() {
      this.isRule = true
      document.documentElement.style.position = 'fixed'
      document.body.style.overflow = 'hidden' //隐藏滚动条
    },
    handleCloseRule() {
      document.documentElement.style.position = 'static'
      document.body.style.overflow = '' //出现滚动条
    },
    handleClockEnd() {
      this.$toast('活动结束！')
    },
    // 最新公告
    setNoticeData() {
      this.newsList.push(this.newsList[0])
      this.newsList.shift()
    },
    // 切换榜单
    onSwitchTab(idx) {
      console.log('-idx-', idx)
      this.activeIdx = idx
      this.paramsObj = this.setParams(idx)
      this.isLoading = true
      this.getData()
    },
    setParams(idx) {
      let type = idx <= 1 ? 1 : 2
      let time = idx % 2 === 0 ? 1 : 2
      return { type, time }
    },
    onAttention(item, index, status) {
      const { useridx } = this.$route.query
      console.log('关注/不关注', item, index, status)
      let type = item.fallow ? 2 : 1
      const params = { type, auseridx: item.userId, fuseridx: +useridx }
      console.log('-params-', params)
      operateAttention(params).then(res => {
        let msg = item.fallow ? '已取消关注' : '关注成功'
        this.$toast(msg)
        if (status === 1) {
          // 前三名关注/取关
          this.rankTopList[index].fallow = !item.fallow
        } else {
          // 其它关注/取关
          this.rankList[index].fallow = !item.fallow
        }
      })
    },
    getConfigData() {
      this.$loading.show()
      getMonkeyKingConfig()
        .then(res => {
          this.$loading.hide()
          console.log('-config-res-', res)
          const { startDate, endDate, jackpot, list } = res.data
          this.configData.tstNum = jackpot
          this.configData.startTime = startDate
          this.configData.endTime = endDate
          // console.log(new Date(endDate).getTime() - new Date().getTime())
          if (new Date(endDate).getTime() - new Date().getTime() <= 0) {
            // 倒计时结束
            this.configData.remainTime = 0
          } else {
            this.configData.remainTime = Math.floor(
              (new Date(endDate).getTime() - new Date().getTime()) / 1000 - 8 * 3600
            )
          }
          this.newsList = list
          this.timer = setInterval(this.setNoticeData, 3000)
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    getData() {
      getMonkeyKingRank(this.paramsObj)
        .then(res => {
          console.log('-res-', res)
          this.isLoading = false
          // 根据id排序，fallow字段表示是否关注
          let list = res.data
          // list = this.setData()
          if (list.length === 0) {
            this.rankTopList = []
            this.rankList = []
            this.noDataText = this.paramsObj.type === 1 ? '暂无主播上榜' : '送主播礼物，上贡献榜'
            return
          }
          const { gradeList, surplursList } = this.setList(list)
          this.rankTopList = gradeList
          this.rankList = surplursList
          let rankLen = this.rankList.length
          if (rankLen > 7) {
            this.listBgHeight = 680 + (rankLen - 7) * 60
          } else {
            this.listBgHeight = 680
          }
          this.$nextTick(() => {
            let listEl = document.querySelector('.listWrap')
            listEl.style.height = this.listBgHeight * (window.innerWidth / 375) + 'px'
          })
          console.log('-ranktop-list-', this.rankTopList, '-rank-list-', this.rankList)
        })
        .catch(err => {
          this.isLoading = false
          // TODO 缺少一个重新加载的界面样式布局
          console.log('加载失败，请点击重新加载。。。')
        })
    },
    setList(list) {
      let first,
        second,
        third,
        surplursList = []
      list.map(val => {
        if (val.id == 1) {
          first = val
        } else if (val.id == 2) {
          second = val
        } else if (val.id == 3) {
          third = val
        } else {
          surplursList.push(val)
        }
      })
      first = first || null
      second = second || null
      third = third || null
      tools.sortFunc(surplursList, 'asc', true, 'id')
      return { gradeList: [second, first, third], surplursList: surplursList }
    },
    setData() {
      let list = [
        {
          userName: '冠军是我们为你',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: true,
          giftNums: 99999,
          id: '1'
        },
        {
          userName: '季军我们为你们',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: true,
          giftNums: 8888,
          id: '3'
        },
        {
          userName: '亚军',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: true,
          giftNums: 66666,
          id: '2'
        },
        {
          userName: '第十名',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false,
          giftNums: 66,
          id: '10'
        },
        {
          userName: '第四名',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false, // true关注 false未关注
          giftNums: 66,
          id: '4'
        },
        {
          userName: '季军我们为你们我们我们',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false, // true关注 false未关注
          giftNums: 66,
          id: '6'
        },
        {
          userName: '第四名',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false, // true关注 false未关注
          giftNums: 66,
          id: '8'
        },
        {
          userName: '第四名',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false, // true关注 false未关注
          giftNums: 66,
          id: '7'
        },
        {
          userName: '第四名',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false, // true关注 false未关注
          giftNums: 66,
          id: '5'
        },
        {
          userName: '第四名',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false, // true关注 false未关注
          giftNums: 66,
          id: '5'
        },
        {
          userName: '第四名',
          photo: 'https://fileup.ickapay.com/file/onevideo/c300ab3d3a364ce0a02d6c5b06234b4f.jpg',
          fallow: false, // true关注 false未关注
          giftNums: 66,
          id: '9'
        }
      ]
      return list
    }
  },
  components: { headerBar, clock, rule }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@import './style/monkeyKing';
</style>
