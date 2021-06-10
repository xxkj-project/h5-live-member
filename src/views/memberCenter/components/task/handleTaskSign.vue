<!--签到弹框-->
<template>
  <!-- 弹框 -->
  <div class="dialog" align="center" v-show="isShow">
    <div class="signinup">
      <div class="head">
        <div></div>
        <h4>签到成功</h4>
        <span @click="close">×</span>
      </div>
      <div class="amount">
        <h4>+0.1<span>TST</span></h4>
      </div>
      <div class="pic">
        <p class="amounticon"></p>
      </div>
      <div class="title">连续签到第<span>1</span>天</div>
    </div>
    <div class="time">
      <p>{{ time }}秒后自动关闭</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      time: 5
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {
    this.countDown()
  },
  methods: {
    close() {
      this.isShow = false
      this.$emit('upload', this.isShow)
    },
    countDown() {
      let that = this
      that.time--
      let timer = setInterval(() => {
        if (that.time === 0) {
          clearInterval(timer)
          that.time = 5
          this.close()
        } else {
          that.time--
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
//@importurl();引入公共css类
@task: '~@/assets/images/task/';
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 199999;
  .signinup {
    box-sizing: content-box;
    width: 291px;
    height: 245px;
    background-color: #fff;
    border-radius: 12.5px;
    padding-bottom: 25px;
    display: flex;
    flex-direction: column;

    .head {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      margin-right: 15px;
      h4 {
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
      span {
        font-size: 18px;
        color: rgb(205, 205, 205);
      }
    }
    .amount {
      color: #ffae00;
      margin-top: 23px;
      h4 {
        font-size: 28px;
        font-weight: 600;
        span {
          margin-left: 4px;
          font-size: 15px;
        }
      }
    }
    .pic {
      .amounticon {
        width: 128px;
        height: 128px;
        background: url('@{task}signIcon.gif') no-repeat center / cover;
      }
    }
    .title {
      font-size: 18px;
      color: #191919;
      font-weight: 400;
      margin-top: 3px;
      span {
        font-size: 16px;
        color: #ffae00;
      }
    }
  }
  .time {
    margin-top: 15px;
    color: #fff;
    font-size: 16px;
  }
}
</style>
