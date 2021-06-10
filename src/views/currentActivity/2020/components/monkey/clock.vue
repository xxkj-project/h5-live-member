<!--
 * @Author: wangshengxian
 * @Date: 2020-09-21 14:32:43
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-21 16:48:45
 * @Desc: 计时器
-->
<template>
  <div class="clock" :class="{ endTimeStatus: isEnd }">
    <p class="txt">
      本轮瓜分奖池还剩
    </p>
    <div class="content">
      <span class="num">{{ timeData.days }}</span>
      <span class="unit">天</span>
      <span class="num">{{ timeData.hours }}</span>
      <span class="unit">时</span>
      <span class="num">{{ timeData.minutes }}</span>
      <span class="unit">分</span>
      <span class="num">{{ timeData.seconds }}</span>
      <span class="unit">秒</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isEnd: false,
      timeData: {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
      }
    }
  },
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  watch: {
    time(val) {
      // console.log('-watch-', val)
      if (!val) {
        this.isEnd = true
        this.initTime()
        return
      }
      let timer = setInterval(() => {
        val--
        this.timeData = this.setTime(val)
        if (!val) {
          this.isEnd = true
          this.$emit('end')
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    initTime() {
      this.timeData = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      }
    },
    setTime(time) {
      // 4200
      // console.log(time)
      let days = time / 60 / 60 / 24
      let hours = (time / 60 / 60) % 24
      let minutes = (time / 60) % 60
      let seconds = time % 60
      days = days < 10 ? '0' + Math.floor(days) : Math.floor(days)
      hours = hours < 10 ? '0' + Math.floor(hours) : Math.floor(hours)
      minutes = minutes < 10 ? '0' + Math.floor(minutes) : Math.floor(minutes)
      seconds = seconds < 10 ? '0' + Math.floor(seconds) : Math.floor(seconds)

      // console.log(days, hours, minutes, seconds)
      return { days, hours, minutes, seconds }
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.clock {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
  font-family: PingFang SC;
  color: #e4ceff;
  padding-top: 12px;

  .txt {
    padding: 0 6px 0 14px;
  }

  &.endTimeStatus {
    color: red;

    .content {
      .num {
        color: red;
        border: 1px solid red;
      }
    }
  }

  .content {
    display: flex;
    align-items: center;

    .num {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 21px;
      color: #fff;
      border: 1px solid #a37adc;
      border-radius: 4px;
    }

    .unit {
      padding: 0 4px;
    }
  }
}
</style>
