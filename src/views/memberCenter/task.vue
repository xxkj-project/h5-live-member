<!-- 任务 -->
<template>
  <div class="task">
    <headerBar background="#ffd347"></headerBar>

    <diviTop :infoList="infoList">
      <div class="withDraw" :class="{ grayBtn: isWithDrawing }" @click="onWithdraw">
        {{ isWithDrawing ? '提取中' : '提取' }}
      </div>
    </diviTop>
    <div class="taskWrap">
      <h4>任务基地</h4>
      <div class="taskBox">
        <div class="item" v-for="(item, index) in taskList" :key="index">
          <!-- <img class="signIn icon" :src="item.imgUrl" /> -->
          <span class="icon" :class="item.className"></span>
          <div class="content">
            <div class="left">
              <div class="flex">
                {{ item.title }}
                <p v-if="index == 0"></p>
                <p v-else-if="index == 3">(5点/10点/15点/20点)</p>
                <p v-else>({{ item.finishNum }}/{{ item.totalNum }})</p>
              </div>
              <span>+{{ item.tstVal }}TST</span>
            </div>
            <div
              class="right"
              :class="{ grayBtn: isBtnGrays[index] == '0' || isBtnGrays[index] == '2' }"
              @click="onSignIn(index)"
            >
              <!-- {{ btnText }} -->
              {{ isBtnGrays[index] == 0 ? item.btnText : isBtnGrays[index] == 1 ? '领取' : '已领取' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import diviTop from '@/components/viewComp/diviTop'
import { getTaskInfoData, withdrawTst, operateTask } from '@/api/member'

export default {
  name: 'task',
  data() {
    return {
      infoData: {}, // 任务信息
      currClickBtnIndex: 0, // 当前点击的按钮
      taskApiType: ['signIn', 'comment', 'invite', 'time', 'reward'],
      // signIn、share、comment、like、invite、timeSignIn、giveReward
      isBtnGrays: ['1', '0', '0', '1', '0'], // 0未达到条件，1可领取，2已领取
      taskList: [],
      isWithDrawing: false, // 是否提取中
      infoList: [{ num: 0, text: '累计获得TST' }], //
      timeSignIndex: 3 // 时间签到下标   后面可能会变动
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // 提现按钮
    onWithdraw() {
      withdrawTst()
        .then(res => {
          this.isWithDrawing = true
          setTimeout(() => {
            this.isWithDrawing = false
            this.infoList[0].num = 0
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
    onSignIn(index) {
      console.log('-index-', index)
      this.currClickBtnIndex = index
      let type = this.taskApiType[index]
      console.log('-api-type-', type)
      operateTask(type).then(res => {
        // 领取成功后
        // this.isBtnGrays[this.currClickBtnIndex] = '2'
        if (this.currClickBtnIndex == this.timeSignIndex) {
          this.$toast('领取成功！')
          return
        }
        this.$set(this.isBtnGrays, this.currClickBtnIndex, '2') // TODO 时间签到除外
        this.$toast('领取成功！')
        console.log(this.isBtnGrays)
        this.getData()
      })
    },
    // 设置评论按钮状态
    setBtnStatu(index, val) {
      this.isBtnGrays[index] =
        val.finishNum < val.totalNum ? '0' : val.isFinish && val.finishNum == val.totalNum ? '1' : '2'
    },
    getData() {
      this.$loading.show()
      getTaskInfoData().then(res => {
        // console.log('-res-', res)
        this.$loading.hide()
        const data = res.data
        this.infoData = data
        this.infoList[0].num = this.infoData.taskTst
        console.log(data)
        let list = this.setData()
        list.map((val, index) => {
          // console.log(val, index)
          if (index == 0) {
            //签到
            val.isFinish = this.infoData.sign
            this.isBtnGrays[index] = val.isFinish ? '2' : '1'
          } else if (index == 1) {
            val.finishNum = this.infoData.comment
            val.isFinish = this.infoData.commentGet
            this.setBtnStatu(index, val)
          } else if (index == 2) {
            // 邀请好友
            val.finishNum = this.infoData.inviteCount
            val.isFinish = this.infoData.invite
            this.setBtnStatu(index, val)
          } else if (index == 3) {
            // 时间签到
          } else {
            // 打赏
            val.finishNum = this.infoData.reward
            val.isFinish = this.infoData.rewardGet
            this.setBtnStatu(index, val)
          }
        })
        console.log('-list-', list)
        this.taskList = list
      })
    },
    setData() {
      let data = [
        {
          className: 'signIn',
          isFinish: false,
          tstVal: '0.1',
          title: '签到',
          btnText: '未完成'
        },
        {
          className: 'comment',
          isFinish: false,
          tstVal: '0.1',
          finishNum: '1',
          totalNum: '10',
          title: '评论回复',
          btnText: '未完成'
        },
        {
          className: 'invite',
          isFinish: false,
          tstVal: '0.1',
          finishNum: '0',
          totalNum: '1',
          title: '邀请好友',
          btnText: '未完成'
        },
        {
          className: 'timeSignIn',
          isFinish: true,
          tstVal: '0.1',
          title: '时间签到',
          btnText: '未完成'
          // btnText: '领取'
        },
        {
          className: 'giveReward',
          isFinish: false,
          tstVal: '0.1',
          finishNum: '0',
          totalNum: '3',
          title: '打赏',
          btnText: '未完成'
        }
      ]
      return data
    }
  },
  components: { headerBar, diviTop }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/';
.task {
  /deep/ .header-global {
    background: #ffd347;
  }
}

.task {
  .withDraw {
    width: 55px;
    background: #ffd461;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 24px;
    border-radius: 12px;
  }
  .grayBtn {
    background: #ccc;
  }
}
.taskWrap {
  padding: 31px 15px 90px 16.5px;
  font-size: #171717;
  h4 {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 21.5px;
  }
}
.taskBox {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 31.5px;
    .icon {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      &.signIn {
        background: url('@{imgUrl}taskIcon1.png') no-repeat center / cover;
      }
      &.comment {
        background: url('@{imgUrl}taskIcon3.png') no-repeat center / cover;
      }
      &.invite {
        background: url('@{imgUrl}taskIcon5.png') no-repeat center / cover;
      }
      &.timeSignIn {
        background: url('@{imgUrl}taskIcon6.png') no-repeat center / cover;
      }
      &.giveReward {
        background: url('@{imgUrl}taskIcon7.png') no-repeat center / cover;
      }
    }
    .content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-size: 15px;
        p {
          padding-left: 10px;
        }
        span {
          font-size: 13px;
          line-height: 13px;
          color: #f7c725;
        }
      }
      .right {
        width: 66px;
        height: 27px;
        background: #ffd461;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 27px;
        border-radius: 13.5px;
      }
      .grayBtn {
        background: #ccc;
      }
    }
  }
}
// .signIn {
//   background: url('../../assets/images/taskIcon1.png') no-repeat center center;
//   background-size: cover;
// }
</style>
