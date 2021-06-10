<!-- 
  邀请分红 
-->
<template>
  <div class="inviteDivi">
    <headerBar background="#fff"> </headerBar>

    <div class="main" align="center">
      <div class="inviteOut">
        <div class="inviteTop">
          <h4>300.00</h4>
          <p><span class="inviteIcon"></span>推广总收益</p>
        </div>
        <div class="inviteDown">
          <div class="itemDown" v-for="(v, i) in peopleData" :key="i">
            <h4>{{ v.num }}</h4>
            <p>{{ v.title }}</p>
          </div>
        </div>
      </div>
      <div class="diviWrap">
        <van-tabs v-model="active" @click="onTabs">
          <van-tab title="收益明细" name="earning">
            <van-list
              v-if="!isNoData"
              class="diviList"
              v-model="isMoreLoading"
              :finished="isMoreFinished"
              :error.sync="isMoreError"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="getMoreData"
              :offset="30"
            >
              <div class="mainWrap">
                <div class="itemWrap">
                  <div class="itemTime">
                    <h4 @click="onShowTime">{{ infoData.time }}<span></span></h4>
                    <p>收益{{ infoData.tf }}TF</p>
                  </div>
                  <ul class="itemBox">
                    <li class="item" v-for="(item, index) in currList" :key="index">
                      <div class="left">
                        <p class="gift">来自{{ item.id }}消费分红</p>
                        <p class="sentTime">{{ item.createTime | time }}</p>
                      </div>
                      <div class="right">
                        <h4>+{{ item.tf }}</h4>
                        <p>{{ item.type }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </van-list>
            <noData v-else></noData>
          </van-tab>
          <van-tab title="推广团队" name="team" class="viniteWrap">
            <van-tabs v-model="select" @click="onSecon">
              <van-tab title="直邀人数" name="invite">
                <van-list
                  v-if="!isNoData"
                  class="diviList"
                  v-model="isMoreLoading"
                  :finished="isMoreFinished"
                  :error.sync="isMoreError"
                  finished-text="没有更多了"
                  :immediate-check="false"
                  @load="getMoreData"
                  :offset="30"
                >
                  <ul class="inviteWrap">
                    <li class="inviteItem" v-for="(item, index) in currList" :key="index">
                      <div class="left">
                        <img :src="item.headImg" alt="" />
                      </div>
                      <div class="right">
                        <h4>{{ item.name }} <span :class="[item.sexType == 0 ? 'girl' : 'boy']"></span></h4>
                        <p>ID{{ item.id }}</p>
                      </div>
                    </li>
                  </ul>
                </van-list>
                <noData v-else></noData>
              </van-tab>
              <van-tab title="分享人数" name="share">
                <van-list
                  v-if="!isNoData"
                  class="diviList"
                  v-model="isMoreLoading"
                  :finished="isMoreFinished"
                  :error.sync="isMoreError"
                  finished-text="没有更多了"
                  :immediate-check="false"
                  @load="getMoreData"
                  :offset="30"
                >
                  <ul class="inviteWrap">
                    <li class="inviteItem" v-for="(item, index) in currList" :key="index">
                      <div class="left">
                        <img :src="item.headImg" alt="" />
                      </div>
                      <div class="right">
                        <h4>{{ item.name }} <span :class="[item.sexType == 0 ? 'girl' : 'boy']"></span></h4>
                        <p>ID{{ item.id }}</p>
                      </div>
                    </li>
                  </ul>
                </van-list>
                <noData v-else></noData>
              </van-tab>
              <van-tab title="拓展人数" name="expand">
                <van-list
                  v-if="!isNoData"
                  class="diviList"
                  v-model="isMoreLoading"
                  :finished="isMoreFinished"
                  :error.sync="isMoreError"
                  finished-text="没有更多了"
                  :immediate-check="false"
                  @load="getMoreData"
                  :offset="30"
                >
                  <ul class="inviteWrap">
                    <li class="inviteItem" v-for="(item, index) in currList" :key="index">
                      <div class="left">
                        <img :src="item.headImg" alt="" />
                      </div>
                      <div class="right">
                        <h4>{{ item.name }} <span :class="[item.sexType == 0 ? 'girl' : 'boy']"></span></h4>
                        <p>ID{{ item.id }}</p>
                      </div>
                    </li>
                  </ul>
                </van-list>
                <noData v-else></noData>
              </van-tab>
            </van-tabs>
          </van-tab>
        </van-tabs>
        <showTime :visible.sync="isShow" />
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import noData from '@/components/viewComp/noData'
import showTime from '@/views/components/showTime'
import { getData } from './data'
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {
      isNoData: false, // 是否没有数据
      infoData: { time: '', tf: '' },
      pageNo: 0, // 页码
      pageSize: 5,
      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      isMoreError: false, // 加载失败状态
      currList: [], //当前数据
      totalData: {},

      isShow: false,
      active: 0,
      select: 0,
      selTabName: 'earning' // 选中的 tab name
    }
  },
  computed: {
    peopleData() {
      return [
        { title: '直邀人数', num: '8' },
        { title: '分享人数', num: '3' },
        { title: '拓展人数', num: '4' }
      ]
    }
  },
  filters: {
    time(val) {
      return tools.formatDate(val, '{m}-{d} {h}:{i}')
    }
  },
  components: { headerBar, noData, showTime },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    initData() {
      this.isNoData = false
      this.pageNo = 0
      this.currList = []
      this.isMoreFinished = false
    },
    onTabs(name, title) {
      console.log(name, title)
      this.initData()
      if (name === 'team') {
        this.onSecon()
      } else {
        this.selTabName = name
        this.currList = this.setData(this.totalData[this.selTabName])
        console.log(this.currList)
        console.log('-more-', this.isMoreLoading)
      }
    },
    onSecon(name = 'invite', title) {
      this.selTabName = name
      let key = this.selTabName
      console.log('-key-', key)
      console.log('-table-data-', this.totalData)
      if (this.totalData[key] && this.totalData[key].length > 0) {
        this.currList = this.totalData[key]
        return
      }
      // 初次请求数据
      this.initData()
      this.getExtendData()
    },
    onShowTime() {
      this.isShow = true
    },

    getData() {
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
        const { list, pickerTime, totalTF } = getData(this.selTabName)
        console.log('-list-', list)
        this.infoData = { time: pickerTime, tf: totalTF } // 获取当前信息
        if (!list || list.length === 0) {
          // 没有数据
          this.isNoData = true
          return
        }
        this.isNoData = false
        this.totalData['earning'] = list
        console.log('-table-', this.totalData)
        this.getMoreData()
      }, 1000)
    },
    // 推广团队相关数据
    getExtendData() {
      this.$pageLoading.show('加载中...')
      setTimeout(() => {
        this.$pageLoading.hide()
        this.isMoreLoading = false
        const { list } = getData(this.selTabName)
        console.log('-list-', list)
        if (!list || list.length === 0) {
          // 没有数据
          this.isNoData = true
          return
        }
        this.isNoData = false
        this.totalData[this.selTabName] = list
        this.getMoreData()
      }, 500)
    },
    // 加载更多
    getMoreData() {
      console.log('加载更多')
      this.isMoreLoading = true
      setTimeout(() => {
        this.isMoreLoading = false
        this.currList = [...this.currList, ...this.setData(this.totalData[this.selTabName])]
        console.log('-curr-list-', this.currList)
        if (this.currList.length >= this.totalData[this.selTabName].length) {
          console.log('数据全部加载完成了。。。')
          this.isMoreFinished = true
        }
      }, 1000)
    },
    setData(list) {
      console.log('--', list)
      let sliceArr = []
      let start = this.pageNo * this.pageSize
      let end = (this.pageNo + 1) * this.pageSize
      console.log('-start-', start, '-end-', end)
      sliceArr = list.slice(start, end)
      this.pageNo++
      return sliceArr
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
// @imgUrl: '~@/assets/images/';
@expense: '~@/assets/images/expense/';
.inviteDivi {
  // height: 100%;
  .main {
    // height: 100%;
    .inviteOut {
      width: 349px;
      height: 205px;
      margin: 10px 13px 0 13px;
      background: url('@{expense}intiveBg.png') no-repeat center / cover;
      .inviteTop {
        overflow: hidden;
        color: #f5c27f;
        h4 {
          margin-top: 30px;
          font-size: 33px;
          font-weight: 600;
        }
        p {
          font-size: 16px;
          margin-top: 18px;
          span {
            margin-right: 4px;
            display: inline-block;
            width: 10.5px;
            height: 11.5px;
            background: url('@{expense}icon-currency-tf.png') no-repeat center / cover;
          }
        }
      }
      .inviteDown {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 46px;
        .itemDown {
          width: 33%;
          border-right: 1px solid #dddee6;
          h4 {
            font-size: 18px;
            color: #000;
            font-weight: 600;
          }
          p {
            font-size: 12px;
            color: #a1a2a6;
            margin-top: 8px;
          }
        }
      }
    }
  }
}

.diviWrap {
  /deep/ .van-tabs__wrap {
    border-bottom: 1px solid #dddee0;
  }
  /deep/ .van-tabs__line {
    width: 16px;
    height: 4px;
    background-color: #fcd200;
  }
  .viniteWrap {
    margin-top: 4px;
    width: 100%;
    /deep/ .van-tabs__wrap {
      border-bottom: 0;
    }
    /deep/ .van-tab {
      width: 75px;
      height: 30px;
      margin: 10px 0;
      font-size: 16px;
      color: #a1a2a6;
      line-height: 30px;
    }
    /deep/ .van-tab--active {
      border-radius: 20px;
      font-size: 16px;
      color: #333;
      background-color: rgba(245, 247, 249);
    }
    /deep/ .van-tabs__line {
      display: none;
    }
    .diviList {
      .inviteWrap {
        padding: 0 14px;
        .inviteItem {
          padding: 14px 0;
          display: flex;
          border-bottom: 1px solid #dddee6;
          .left {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f99;
            margin: 0 12px 0 2px;
            img {
              border: none;
            }
          }
          .right {
            text-align: left;
            h4 {
              font-size: 14px;
              color: #191919;
              font-weight: 600;
              margin: 3px 0 7px 0;
              span {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-left: 7px;
              }
              .boy {
                background: url('@{expense}icon-boy.png') no-repeat center / cover;
              }
              .girl {
                background: url('@{expense}icon-girl.png') no-repeat center / cover;
              }
            }
            p {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
    }
  }
  .itemWrap {
    padding-bottom: 25px;
    .itemTime {
      width: 100%;
      height: 46px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 13px;
      border-bottom: 1px solid #dddee6;
      h4 {
        font-size: 18px;
        color: #191919;
        font-weight: 500;
        span {
          margin-left: 3px;
          display: inline-block;
          width: 7px;
          height: 6px;
          background: url('@{expense}icon-bottom-arrow.png') no-repeat center / cover;
        }
      }
      p {
        font-size: 12px;
        color: #a1a2a6;
      }
    }
    .itemBox {
      padding: 0 13px;
      .item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dddee0;
        padding: 16px 0;
        .left {
          text-align: left;
          .gift {
            font-size: 13px;
            color: #333;
          }
          .sentTime {
            text-align: left;
            font-size: 12px;
            color: #a1a2a6;
            margin-top: 13px;
          }
        }
        .right {
          h4 {
            font-size: 18px;
            color: #191919;
            font-weight: 500;
          }
          p {
            margin-top: 10px;
            font-size: 12px;
            color: #a1a2a6;
          }
        }
      }
    }
  }
}
</style>
