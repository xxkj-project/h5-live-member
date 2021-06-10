<!-- 任务 -->
<template>
  <div class="task">
    <div class="mask" v-show="maskShow"></div>
    <headerBar background="#ffd347"></headerBar>

    <div class="top">
      <div class="bgImg">
        <p class="gain">累计获取TST</p>
        <h4 class="tstNum">{{ infoData.num }}</h4>
        <div class="submit">
          <p class="btn" @click="toWithDraw">提现</p>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 签到 -->
      <div class="signin">
        <h4>
          连续签到<span>{{ infoData.daysNum }}</span
          >天
        </h4>
        <div class="signinContent">
          <div class="signinList">
            <div class="item" v-for="(v, i) in infoData.signList" :key="i">
              <p :class="v.isFinish ? 'selectsign' : 'signicon'">
                <span class="tst"
                  ><b>{{ v.TST }}</b
                  ><br />TST</span
                >
              </p>
              <span class="title" v-if="!v.isFinish">{{ v.days }}</span>
              <span class="signed" v-else>已签到</span>
              <i class="iconline"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 限时福利 -->
      <div class="taskWrap">
        <h4>限时福利</h4>
        <div class="taskBox">
          <div class="item" v-for="(item, index) in infoData.welfareList" :key="index">
            <span class="icon" :class="item.className"></span>
            <div class="content">
              <div class="tstIcon">
                <div class="subTitle">
                  {{ item.title }}
                  <p class="tstIconContent"></p>
                  <span>+{{ item.tstVal }}</span>
                </div>
                <van-progress :percentage="item.progress" stroke-width="6" :show-pivot="false" color="#ffae00" />
                <div :class="[item.finishNum === item.totalNum ? 'accomp' : 'plan']">
                  <span :class="[item.finishNum !== item.totalNum && item.finishNum != '0' ? 'single' : '']">{{
                    item.finishNum
                  }}</span
                  >/{{ item.totalNum }}
                </div>
              </div>
              <div
                class="right"
                :class="[item.isFinish != 1 ? 'grayBtn' : '']"
                @click="onSignIn('1', index)"
                :disabled="isDisabled"
              >
                <!-- {{ btnText }} -->
                {{ item.isFinish == 0 ? item.btnText : item.isFinish == 1 ? '领取' : '已领取' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 日常任务 -->
      <div class="taskWrap">
        <h4>日常任务</h4>
        <div class="taskBox">
          <div class="item" v-for="(item, index) in infoData.taskData" :key="index">
            <span class="icon" :class="item.className"></span>
            <div class="content">
              <div class="tstIcon">
                <div class="subTitle">
                  {{ item.title }}
                  <p class="tstIconContent"></p>
                  <span>+{{ item.tstVal }}</span>
                </div>
                <van-progress :percentage="item.progress" stroke-width="6" :show-pivot="false" color="#ffae00" />
                <div :class="[item.finishNum === item.totalNum ? 'accomp' : 'plan']">
                  <span :class="[item.finishNum != item.totalNum && item.finishNum != '0' ? 'single' : '']">{{
                    item.finishNum
                  }}</span
                  >/{{ item.totalNum }}
                </div>
              </div>
              <div
                class="right"
                :class="{ grayBtn: !item.isFinish }"
                @click="onSignIn('2', index)"
                :disabled="isDisabled"
              >
                {{ item.isFinish == 0 ? item.btnText : item.isFinish == 1 ? '领取' : '已领取' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <taskSign :visible.sync="isShow" @upload="onedit" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import { withdrawTst, getTaskInfoData, operateTask } from '@/api/member'
import taskSign from '@/views/memberCenter/components/task/handleTaskSign'
export default {
  name: 'task',
  data() {
    return {
      taskProgress: '0', //任务进度条
      isShow: false, //签到弹框显示隐藏
      maskShow: false, //遮罩层显示隐藏
      signident: ['invite', 'upshortVideo', 'nameauthentication'],
      taskident: ['looklive', 'make', 'reward', 'shortcomment', 'liveshare', 'videoshare', 'hour'],
      isWithDrawing: false, // 是否提取中
      isDisabled: false,
      infoData: {
        num: 0,
        signList: [], //签到数据
        daysNum: 0, // 连续签到天数
        taskData: [], //日常任务数据列表
        welfareList: [] //限时福利数据列表
      }
    }
  },
  components: { headerBar, taskSign },
  created() {
    this.getData()
    this.autoShow()
  },
  mounted() {
    // let androidData = `?type=${query.type}&param=${query.param}`
    // this.clickEventFunc(androidData)
  },
  watch: {},
  computed: {},
  methods: {
    onedit(val) {
      this.isShow = false
      this.maskShow = false
    },
    // 签到//TODO:进入任务页自动签到,接口好了需要更改
    autoShow() {
      this.isShow = true
      this.maskShow = true
      this.infoData.signList.map((item, index) => {
        item.isFinish = true
      })
    },
    // 提现按钮
    toWithDraw() {
      withdrawTst()
        .then(res => {
          console.log(res)
          this.isWithDrawing = true
          setTimeout(() => {
            this.isWithDrawing = false
            this.infoData.num = 0
          }, 2000)
          this.$toast({
            message: '已提取至会员中心，请查看！',
            duration: 3500,
            onClose: () => {}
          })
        })
        .catch(err => {
          this.$toast(err.msg)
        })
    },
    onSignIn(type, index) {
      console.log('-index-', index)
      if (type == 1) {
        console.log(this.signident[index])
        operateTask(this.signident[index]).then(res => {
          console.log(res)
        })
      } else {
        console.log(this.taskident[index])
        operateTask(this.taskident[index]).then(res => {
          console.log(res)
        })
      }
    },
    getData() {
      this.$loading.show()
      getTaskInfoData()
        .then(res => {
          this.$loading.hide()
          console.log(res)
          const { List, signList } = this.setData()
          const { days, signArr } = signList
          this.infoData.signList = signArr
          this.infoData.daysNum = days
          const { taskList, welfare } = List
          this.infoData.taskData = taskList.map((v, i) => {
            if (v.isFinish == 1) {
              v.isFinish = 2
              this.isDisabled = true
            }
            if (v.finishNum === v.totalNum) {
              v.isFinish = 1
            } else {
              v.isFinish = 0
            }
            return v
          })
          this.infoData.welfareList = welfare.map((v, i) => {
            if (v.finishNum === v.totalNum) {
              v.isFinish = 1
            } else {
              v.isFinish = 0
            }
            if (v.isFinish == 1) {
              v.isFinish = 2
              this.isDisabled = true
            }
            return v
          })
        })
        .catch(err => {
          console.log(err)
          this.$loading.hide()
        })
    },
    setData() {
      const List = {
        welfare: [
          {
            className: 'invite',
            isFinish: 0, //0 未完成显示前往 1为完成显示领取 2为领取完成
            tstVal: '30',
            finishNum: '1',
            totalNum: '1',
            progress: '100',
            title: '邀请好友',
            btnText: '前往'
          },
          {
            className: 'upshortVideo',
            isFinish: 0,
            tstVal: '10',
            finishNum: '0',
            totalNum: '1',
            progress: '0',
            title: '短视频上传',
            btnText: '未完成'
          },
          {
            className: 'nameAuthentication',
            isFinish: 0,
            tstVal: '10',
            finishNum: '0',
            totalNum: '1',
            progress: '0',
            title: '实名认证',
            btnText: '前往'
          }
        ],
        taskList: [
          {
            className: 'lookLiveStreaming',
            isFinish: 0,
            tstVal: '0.5',
            finishNum: '1',
            totalNum: '1',
            progress: '100',
            title: '观看直播5分钟',
            btnText: '前往'
          },
          {
            className: 'lookLiveStreamingMake',
            isFinish: 0,
            tstVal: '0.3',
            finishNum: '2',
            totalNum: '3',
            progress: '66',
            title: '观看直播发言',
            btnText: '前往'
          },
          {
            className: 'exceptionalAnchor',
            isFinish: 0,
            tstVal: '0.2',
            finishNum: '0',
            totalNum: '1',
            progress: '0',
            title: '打赏主播次数',
            btnText: '前往'
          },
          {
            className: 'shortVideoComments',
            isFinish: 0,
            tstVal: '0.3',
            finishNum: '0',
            totalNum: '3',
            progress: '0',
            title: '短视频评论回复',
            btnText: '前往'
          },
          {
            className: 'liveToShare',
            isFinish: 0,
            tstVal: '0.2',
            finishNum: '0',
            totalNum: '1',
            progress: '0',
            title: '直播分享',
            btnText: '前往'
          },
          {
            className: 'shortVideoSharing',
            isFinish: 0,
            tstVal: '0.2',
            finishNum: '0',
            totalNum: '1',
            progress: '0',
            title: '短视频分享',
            btnText: '前往'
          },
          {
            className: 'inTheHour',
            isFinish: 0,
            tstVal: '0.1',
            finishNum: '0',
            totalNum: '4',
            progress: '0',
            title: '整点签到(6/12/18/20点)',
            btnText: '未开始'
          }
        ]
      }
      let signList = {
        days: 3,
        signArr: [
          {
            TST: '0.1',
            isFinish: true, //0为没签到,1为签到
            days: '1天'
          },
          {
            TST: '0.2',
            isFinish: true, //0为没签到,1为签到
            days: '2天'
          },
          {
            TST: '0.3',
            isFinish: true, //0为没签到,1为签到
            days: '3天'
          },
          {
            TST: '0.4',
            isFinish: false, //0为没签到,1为签到
            days: '4天'
          },
          {
            TST: '0.5',
            isFinish: false, //0为没签到,1为签到
            days: '五天'
          },
          {
            TST: '0.6',
            isFinish: false, //0为没签到,1为签到
            days: '6天'
          },
          {
            TST: '0.7',
            isFinish: false, //0为没签到,1为签到
            days: '7天'
          }
        ]
      }
      const obj = {
        List,
        signList
      }
      return obj
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/';
@task: '~@/assets/images/task/';
.task {
  /deep/ .header-global {
    background: #ffd347;
  }
}
.task {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    .bgImg {
      width: 375px;
      height: 242px;
      background: url('@{task}taskBg.png') no-repeat center / cover;
      display: flex;
      flex-direction: column;
      padding: 50px 0 34px 0;
      text-align: center;
      .gain {
        font-size: 13px;
        color: #333;
      }
      .tstNum {
        font-size: 40px;
        color: #191919;
        font-weight: 600;
        margin-top: 20px;
      }
      .submit {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        .btn {
          width: 65px;
          height: 25px;
          font-size: 13px;
          color: #333;
          text-align: center;
          line-height: 25px;
          border: 1px solid #333;
          border-radius: 25px;
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .withDraw {
    width: 65px;
    background: #ffd461;
    font-size: 16px;
    color: #333;
    text-align: center;
    line-height: 25px;
    border-radius: 12px;
    border: 1px solid #333;
  }
  .grayBtn {
    background: #ccc;
  }
}
.main {
  width: 100%;
  background-color: rgb(245, 247, 249);
  padding-bottom: 50px;
  padding-top: 120px;
  position: relative;
}
.signin {
  margin: 0 13px;
  width: 349px;
  height: 141px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  position: absolute;
  top: -20px;
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #191919;
    margin: 16px 0 0 12px;
    span {
      font-size: 18px;
      color: #ffae00;
      margin: 0 7px;
    }
  }
  .signinContent {
    .signinList {
      display: flex;
      align-items: center;
      margin-left: 10px;
      margin-top: 20px;
      overflow-x: scroll;
      .item {
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        position: relative;
        .signicon,
        .selectsign {
          width: 40px;
          height: 40px;
          text-align: center;
          b {
            font-size: 9px;
          }

          .tst {
            display: inline-block;
            word-wrap: break-word;
            word-break: normal;
            font-size: 7px;
            color: #fff;
            margin-top: 10px;
          }
        }
        .signicon {
          background: url('@{task}icon-no-select-sign.png') no-repeat center / cover;
        }
        .selectsign {
          background: url('@{task}icon-select-sign.png') no-repeat center / cover;
        }
        .title {
          margin-top: 6px;
          font-size: 12px;
          color: #999;
        }
        .signed {
          font-size: 12px;
          color: #ffae00;
          margin-top: 6px;
        }
        .iconline {
          display: inline-block;
          width: 9px;
          height: 2px;
          margin: 0 4px;
          background: url('@{task}icon-line.png') no-repeat center / cover;
          position: absolute;
          top: 27%;
          // transform: translateY(-50%);
          right: -17px;
        }
      }
      .item:nth-last-of-type(1) {
        .iconline {
          display: none;
        }
      }
    }
  }
}
.taskWrap {
  width: 349px;
  background-color: #fff;
  padding: 16px 15px 0 15px;
  margin: 10px 13px 0 13px;
  color: #171717;
  h4 {
    font-size: 14px;
    font-weight: 600;
  }
}
.taskBox {
  .item:nth-last-of-type(1) {
    border: 0;
  }
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #dddee6;
    .icon {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      &.invite {
        background: url('@{task}icon-time-task1.png') no-repeat center / cover;
      }
      &.upshortVideo {
        background: url('@{task}icon-time-task2.png') no-repeat center / cover;
      }
      &.nameAuthentication {
        background: url('@{task}icon-time-task3.png') no-repeat center / cover;
      }
      &.lookLiveStreaming {
        background: url('@{task}icon-day-task1.png') no-repeat center / cover;
      }
      &.lookLiveStreamingMake {
        background: url('@{task}icon-day-task2.png') no-repeat center / cover;
      }
      &.exceptionalAnchor {
        background: url('@{task}icon-day-task3.png') no-repeat center / cover;
      }
      &.shortVideoComments {
        background: url('@{task}icon-day-task4.png') no-repeat center / cover;
      }
      &.liveToShare {
        background: url('@{task}icon-day-task5.png') no-repeat center / cover;
      }
      &.shortVideoSharing {
        background: url('@{task}icon-day-task6.png') no-repeat center / cover;
      }
      &.inTheHour {
        background: url('@{task}icon-day-task7.png') no-repeat center / cover;
      }
    }
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tstIcon {
      .subTitle {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #191919;
        font-weight: 600;
        .tstIconContent {
          width: 13px;
          height: 13px;
          background: url('@{task}icon-award-bg.png') no-repeat center / cover;
          margin: 0 2px 0 6px;
        }
        span {
          font-size: 12px;
          color: #999;
          font-weight: 0;
        }
      }
      /deep/ .van-progress {
        display: inline-block;
        width: 43px;
        margin-top: 11px;
      }
      .accomp,
      .plan {
        display: inline-block;
        font-size: 11px;
        margin-left: 4px;
        .single {
          color: #ffae00;
        }
      }
      .plan {
        color: #bcbcbc;
      }
      .accomp {
        color: #ffae00;
      }
    }
  }
  .right {
    width: 65px;
    height: 28px;
    background: #fcd200;
    font-size: 12px;
    color: #191919;
    text-align: center;
    line-height: 28px;
    border-radius: 13.5px;
  }
  .grayBtn {
    background: #f5f7f9;
  }
}
</style>
