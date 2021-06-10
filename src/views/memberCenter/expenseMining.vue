<!-- 消费挖矿体系 -->
<template>
  <div class="expenseMining">
    <headerBar background="#ffd347"></headerBar>
    <div class="main">
      <!-- <van-pull-refresh
        v-model="isRefreshLoading"
        @refresh="onRefresh"
        loosing-text="松开立即刷新"
        loading-text="正在刷新数据中..."
        success-text="刷新成功"
        :disabled="isDisRefresh"
        offset="100"
      >
      </van-pull-refresh> -->
      <diviTop :infoList="infoList"></diviTop>
      <template v-if="!isNoData">
        <div class="expenseWrap">
          <van-list
            class="expenseList itemContent"
            v-model="isMoreLoading"
            :finished="isMoreFinished"
            :error.sync="isMoreError"
            finished-text="没有更多了"
            @load="getExpenseList"
            :immediate-check="false"
          >
            <div class="diviCom itemBox">
              <div class="item">
                <p class="time">投入津贴</p>
                <p class="coinType">时间</p>
              </div>
            </div>
            <div class="itemBox">
              <div class="item" v-for="(item, index) in expenseList" :key="index">
                <p class="time">{{ item.cash }}</p>
                <p class="coinType">{{ item.createTime }}</p>
              </div>
            </div>
          </van-list>
        </div>
      </template>
      <template v-else>
        <noData></noData>
      </template>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import diviTop from '@/components/viewComp/diviTop'
import noData from '@/components/viewComp/noData'
import tools from '@/utils/tools'
import { getMiningList } from '@/api/member'
export default {
  name: 'expenseMining',
  data() {
    return {
      infoList: [
        { num: '0', text: '总矿池' },
        { num: '0', text: '已出矿' }
      ],
      isNoData: true,
      pageNo: 0, // 页码
      pageSize: 15, // 每页条数
      detailList: [],
      expenseList: [], // 消费list
      isMoreError: false, // 加载失败状态
      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      isRefreshLoading: false, // 下拉刷新状态
      isDisRefresh: false // 是否禁用刷新
    }
  },
  filters: {
    sTime(val) {
      return tools.formatDate(val, '{y}.{m}.{d} {h}:{i}:{s}')
    },
    cTime(time) {
      // console.log(time)
      if (!time) {
        return 'null'
      }
      let pastTime
      const d = new Date(time)
      const now = Date.now()
      // console.log(now)
      const diff = (now - d) / 1000
      if (diff < 30) {
        pastTime = Math.ceil(diff) + '秒'
      } else if (diff < 3600) {
        pastTime = Math.ceil(diff / 60) + '分钟'
      } else if (diff < 3600 * 24) {
        pastTime = Math.ceil(diff / 3600) + '小时'
      } else {
        pastTime = Math.ceil(diff / (3600 * 24)) + '天'
      }
      return `已出矿${pastTime}`
    }
  },
  created() {
    this.isDisRefresh = false
    this.$loading.show()
    this.getExpenseList()
  },
  mounted() {},
  computed: {},
  methods: {
    onRefresh() {
      console.log('下拉刷新')
      this.pageNo = 0
      this.isMoreFinished = false
      this.getExpenseList(true)
    },
    // isFresh 是否下拉刷新
    getExpenseList(isFresh) {
      console.log('-isfresh-', isFresh)
      getMiningList()
        .then(res => {
          console.log('-res-', res)
          const data = res.data
          this.infoList[0].num = data.tspPool
          this.infoList[1].num = data.tspProfit
          // if (this.detailList.length < 18) {
          //   for (let i = 0; i < 18; i++) {
          //     this.detailList.push({ cash: i, createTime: '2020-04-30 03:15:59' })
          //   }
          // }
          // data.detailList = []
          if (!data.detailList || data.detailList.length === 0) {
            this.$loading.hide()
            this.isMoreLoading = false
            this.isRefreshLoading = false
            this.isNoData = true
            return
          }
          this.isNoData = false
          this.detailList = data.detailList
          // console.log(this.detailList)
          this.getMoreData(isFresh)
        })
        .catch(err => {
          this.$loading.hide()
          this.isDisRefresh = true
        })
    },
    getMoreData(isFresh) {
      setTimeout(() => {
        this.$loading.hide()
        this.isMoreLoading = false
        this.isRefreshLoading = false
        if (isFresh) {
          // 下拉刷新
          this.expenseList = this.setData()
        } else {
          this.expenseList = [...this.expenseList, ...this.setData()]
        }
        console.log('-list-', this.expenseList.length, this.detailList.length)
        if (this.expenseList.length >= this.detailList.length) {
          console.log('全部加载完成')
          this.isMoreFinished = true
        }
      }, 500)
    },
    setData() {
      let sliceArr = []
      let start = this.pageNo * this.pageSize
      let end = (this.pageNo + 1) * this.pageSize
      // console.log(start, end)
      sliceArr = this.detailList.slice(start, end)
      this.pageNo++
      return sliceArr
    }
  },
  components: { headerBar, diviTop, noData }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.expenseMining {
  height: 100%;

  .main {
    -webkit-overflow-scrolling: touch;

    .expenseWrap {
      padding: 12px 15px 0;
    }
  }
}
.itemContent {
  font-size: 13px;
  line-height: 16px;
  color: #171717;

  .diviCom {
    opacity: 0.6;
  }

  .itemBox {
    .item {
      display: flex;
      padding: 3px 0;
      p {
        text-align: center;
        line-height: 30px;
        &.time {
          width: 40%;
        }
        &.coinType {
          width: 60%;
        }
      }
    }
  }
}
</style>
