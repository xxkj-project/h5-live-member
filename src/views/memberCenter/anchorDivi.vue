<!-- 主播分红 -->
<template>
  <div class="anchorDivi">
    <headerBar background="#ffd347">
      <!-- <p @click="toRulePage">规则</p> -->
    </headerBar>
    <div class="main">
      <diviTop :infoList="infoList"></diviTop>
      <div class="diviWrap" v-if="isNoData">
        <h4>收益明细</h4>
        <van-list
          class="diviList"
          v-model="isMoreLoading"
          :finished="isMoreFinished"
          :error.sync="isMoreError"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="getMoreData"
        >
          <div class="diviCom item">
            <p class="time">时间</p>
            <p class="user">主播ID</p>
            <p class="num">代数</p>
            <p class="gainRewaed">获得打赏</p>
            <p class="earning">收益</p>
          </div>
          <div class="item" v-for="(item, index) in earningList" :key="index">
            <p class="time">{{ item.createTime }}</p>
            <p class="user">{{ item.userId }}</p>
            <p class="num">{{ item.age }}</p>
            <p class="gainReward">{{ item.baseTst }}</p>
            <p class="earning">{{ item.tst }}</p>
          </div>
        </van-list>
      </div>
      <noData v-else></noData>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import diviTop from '@/components/viewComp/diviTop'
import noData from '@/components/viewComp/noData'
import tools from '@/utils/tools'
import { getAnchorBonusData } from '@/api/member'
export default {
  name: 'anchorDivi',
  data() {
    return {
      infoList: [
        { num: 0, text: '推广总收益' },
        { num: 0, text: '团队主播人数' }
      ],
      isNoData: true, // 是否没有数据
      pageNo: 0, // 页码
      earningList: [], // 收益明细list
      totalList: [],
      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      isMoreError: false // 加载失败状态
    }
  },
  filters: {
    ymdTime(val) {
      return tools.formatDate(val, '{y}.{m}.{d}')
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    toRulePage() {
      this.$router.push({ name: 'DiviRule', query: { ruleType: 'anchor' } })
    },
    // 获取收益明细数据
    getData() {
      this.$loading.show()
      getAnchorBonusData()
        .then(res => {
          console.log('-res-', res)
          const { allTst, count, respList } = res.data
          this.infoList[0].num = allTst
          this.infoList[1].num = count
          this.totalList = respList
          // this.totalList = [{ createTime: null, id: 10066, age: 18, baseTst: 199, tst: 300 }]
          this.isNoData = this.totalList.length > 0
          this.getMoreData()
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    getMoreData() {
      setTimeout(() => {
        this.$loading.hide()
        this.isMoreLoading = false
        this.earningList = [...this.earningList, ...this.setData()]
        if (this.earningList.length >= this.totalList.length) {
          console.log('数据全部加载完成了。。。')
          this.isMoreFinished = true
        }
      }, 1000)
    },
    setData() {
      let sliceArr = []
      let start = this.pageNo * 15
      let end = (this.pageNo + 1) * 15
      sliceArr = this.totalList.slice(start, end)
      this.pageNo++
      return sliceArr
    }
  },
  components: { headerBar, diviTop, noData }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
// @imgUrl: '~@/assets/images/';
.anchorDivi {
  /deep/ .header-global {
    background: #ffd347;
  }
}

.diviWrap {
  padding: 30px 15px 0;
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #000;
    padding-bottom: 6px;
  }
  .diviList {
    font-size: 13px;
    color: #171717;
    .item {
      display: flex;
      p {
        text-align: center;
        line-height: 35px;
      }
      p:nth-child(1) {
        width: 25%;
      }
      p:nth-child(2) {
        width: 25%;
      }
      p:nth-child(3) {
        width: 10%;
      }
      p:nth-child(4) {
        width: 20%;
      }
      p:nth-child(5) {
        width: 20%;
      }
    }
    .diviCom {
      opacity: 0.6;
    }
  }
}
</style>
