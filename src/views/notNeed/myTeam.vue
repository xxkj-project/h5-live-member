<!-- 主播分红 -->
<template>
  <div class="myTeam">
    <headerBar background="#ffd347"></headerBar>

    <div class="main">
      <diviTop :infoList="infoList"></diviTop>
      <div class="diviWrap" v-if="!isNoData">
        <h4>业绩明细</h4>
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
            <p>直推会员</p>
            <p>团队人数</p>
            <p>团队业绩</p>
          </div>
          <div class="item" v-for="(item, index) in earningList" :key="index">
            <p>{{ item.userId }}</p>
            <p>{{ item.count }}</p>
            <p>{{ item.cash }}</p>
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
import { getMyTeamData } from '@/api/member'

export default {
  name: 'MyTeam',
  data() {
    return {
      infoList: [
        { num: 0, text: '团队总人数' },
        { num: 0, text: '团队总业绩' }
      ],
      pageNo: 0, // 页码
      detailList: [],
      isNoData: false, // 是否没有数据
      earningList: [], // 收益明细list
      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      isMoreError: false // 加载失败状态
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
      getMyTeamData()
        .then(res => {
          this.$loading.hide()
          // console.log('-res-', res)
          const { count, cash, detailList } = res.data
          this.infoList[0].num = count
          this.infoList[1].num = cash
          if (!detailList || detailList.length === 0) {
            this.isNoData = true
            return
          }
          this.isNoData = false
          this.detailList = detailList
          this.getMoreData()
        })
        .catch(() => {
          this.$loading.hide()
        })
    },
    setData() {
      let sliceArr = []
      let start = this.pageNo * 15
      let end = (this.pageNo + 1) * 15
      sliceArr = this.detailList.slice(start, end)
      this.pageNo++
      return sliceArr
    },
    getMoreData() {
      setTimeout(() => {
        this.$loading.hide()
        this.isMoreLoading = false
        this.earningList = [...this.earningList, ...this.setData()]
        if (this.earningList.length >= this.detailList.length) {
          console.log('数据全部加载完成了。。。')
          this.isMoreFinished = true
        }
      }, 500)
    }
  },
  components: { headerBar, diviTop, noData }
}
</script>
<style lang="less" scoped>
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
        width: 33.3%;
      }
    }
    .diviCom {
      opacity: 0.6;
    }
  }
}
</style>
