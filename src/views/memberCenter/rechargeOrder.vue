<!--
 * @Author: wangshengxian
 * @Date: 2021-01-11 18:40:23
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 11:11:12
 * @Desc: 我的记录
-->
<template>
  <div class="order">
    <headerBar background="#ffd347" :onBack="onBack"></headerBar>
    <div class="main">
      <div class="mainWrap">
        <van-tabs
          v-model="currActIdx"
          type="line"
          title-active-color="rgba(0,0,0,1)"
          title-inactive-color="rgba(0,0,0,0.6)"
          :line-width="30 / remBase + 'rem'"
          :line-height="3 / remBase + 'rem'"
          @click="onSwitch"
        >
          <van-tab :title="item.title" v-for="(item, index) in tabList" :key="index">
            <van-list
              class="content"
              v-model="isMoreLoading"
              :finished="isMoreFinished"
              :error.sync="isMoreError"
              finished-text="没有更多了"
              @load="getMoreData"
              :immediate-check="false"
              v-if="!isNoData && currActIdx == item.type"
            >
              <component :is="item.compName" :list="orderList"></component>
            </van-list>
            <noData v-else></noData>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import noData from '@/components/noData'
import exchangeList from './components/orderRecord/exchangeList'
import withdrawList from './components/orderRecord/withdrawList'
import buyList from './components/orderRecord/buyList'
import openNative from '@/utils/openNative'
import { getMyRecordList } from '@/api/pay'
// import { getTestData } from '@/testData/orderRecord' // 本地测试数据
export default {
  name: '',
  data() {
    return {
      remBase: '37.5',
      tabList: [
        { type: '0', status: 'exchange', title: '兑换记录', compName: 'exchangeList' },
        { type: '1', status: 'withdraw', title: '提现记录', compName: 'withdrawList' },
        { type: '2', status: 'buy', title: '购买记录', compName: 'buyList' }
      ],
      currActIdx: 0, // 当前激活的tabIdx
      prevActIdx: 0, // 上一次选择的tabIdx
      pageNum: 1, // 页码
      pageSize: 10, // 每页条数
      isMoreError: false, // 加载失败状态
      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      orderList: [],
      isNoData: false
    }
  },
  computed: {},
  components: { headerBar, noData, exchangeList, withdrawList, buyList },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    onSwitch(name, title) {
      // console.log('-tab-change-', name, title)
      console.log('-prev-', this.prevActIdx, '-curr-', this.currActIdx)
      if (this.prevActIdx == name) return
      this.prevActIdx = name
      this.getData()
    },
    getData() {
      this.pageNum = 1
      this.orderList = []
      this.isMoreLoading = true
      this.isMoreFinished = false
      this.getMoreData(true)
    },
    getMoreData(isInit) {
      // TODO: 分页不起作用了
      let type = this.tabList[this.currActIdx].status
      console.log('-type-', type, '-is-init-', isInit)
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      // console.log('-params-', params)
      getMyRecordList(type, params)
        .then(res => {
          console.log('-res-', res)
          // res = getTestData(this.currActIdx, this.pageNum, this.pageSize, 18) // TODO 本地测试用
          // console.log('-test-res-', res)
          this.isMoreLoading = false
          const { result, totalCount } = res.data
          // console.log('-data-', data)
          if (!result || result.length === 0) {
            this.isNoData = true
            this.isMoreFinished = true
            return
          }
          this.isNoData = false
          if (isInit) {
            this.orderList = result
          } else {
            this.orderList = [...this.orderList, ...result]
          }
          // console.log('-list-', this.orderList)
          this.pageNum++
          if (this.orderList.length >= totalCount) {
            console.log('没有更多了！')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          console.log('_ERR_', err)
          this.isMoreLoading = false
          this.isMoreError = true
        })
    },
    // 设置tab商品列表最低高度
    setTabsConHeight() {
      this.$nextTick(() => {
        const contentEle = document.querySelector('.mainWrap')
        // const contentEle = document.querySelector('.van-pull-refresh')
        const tabsContentEle = document.querySelector('.van-tabs__content')
        const tabsHeight = (window.innerWidth / 375) * 40
        tabsContentEle.style.minHeight = contentEle.offsetHeight - tabsHeight + 'px'
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.order {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main {
    flex: 1;
    background: #f5f5f5;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

/deep/ .van-tabs {
  .van-tabs__wrap {
    position: sticky;
    top: 0;
  }
  .van-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 49px;
    color: #000;
  }
  .van-tabs__line {
    background: #ffd12f;
    bottom: 14px;
  }
}
</style>
