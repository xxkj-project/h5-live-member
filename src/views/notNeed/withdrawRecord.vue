<!-- 
   提现记录
-->
<template>
  <div class="withdrawRecord">
    <headerBar background="#ffd347"></headerBar>

    <div class="main">
      <div class="diviWrap" v-if="isNoData">
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
            <p class="coinType">提现币种</p>
            <p class="num">提现数量</p>
            <p class="realityMoney">实际到账金额</p>
          </div>
          <div class="item" v-for="(item, index) in withdrawList" :key="index">
            <p class="time">{{ item.createTime }}</p>
            <p class="coinType">{{ item.currency }}</p>
            <p class="num">{{ item.cash }}</p>
            <p class="realityMoney">{{ item.realCash }}</p>
          </div>
        </van-list>
      </div>
      <noData v-else></noData>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import noData from '@/components/viewComp/noData'
import tools from '@/utils/tools'
import { getWithdrawList } from '@/api/notNeed'
export default {
  name: '',
  data() {
    return {
      //   titles: ['时间', '提现币种', '提现数量', '实际到账金额'],
      isNoData: true,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      pageNo: 0, // 页码
      pageSize: 15, // 数据条数
      withdrawList: [],
      detailList: []
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
    getData() {
      this.$loading.show()
      getWithdrawList()
        .then(res => {
          console.log('-res-', res)
          this.detailList = res.data
          this.isNoData = this.detailList.length > 0 ? true : false
          this.getMoreData()
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    setData() {
      let sliceArr = []
      let start = this.pageNo * 20
      let end = (this.pageNo + 1) * 20
      sliceArr = this.detailList.slice(start, end)
      this.pageNo++
      return sliceArr
    },
    getMoreData() {
      setTimeout(() => {
        this.$loading.hide()
        this.isMoreLoading = false
        this.withdrawList = [...this.withdrawList, ...this.setData()]
        if (this.withdrawList.length >= this.detailList.length) {
          console.log('数据全部加载完成了。。。')
          this.isMoreFinished = true
        }
      }, 500)
    }
  },
  components: { headerBar, noData }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.withdrawRecord {
  /deep/ .header-global {
    background: #ffd347;
  }
}

.diviWrap {
  padding-top: 10px;
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
        width: 28%;
      }
      p:nth-child(2) {
        width: 22%;
      }
      p:nth-child(3) {
        width: 22%;
      }
      p:nth-child(4) {
        width: 28%;
      }
    }
    .diviCom {
      opacity: 0.6;
    }
  }
}
</style>
