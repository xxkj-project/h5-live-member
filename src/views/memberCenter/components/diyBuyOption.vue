<!-- 
   自定义设置 TST 购买选项
-->
<template>
  <div class="dialog" v-show="dialogVisible" @click.stop="onClose">
    <div class="dialogWrap">
      <div class="dialogContent" :style="{ top: top }" @click.stop="">
        <span class="icon"></span>
        <p class="title">自定义购买数量</p>
        <div class="inputBox">
          <van-field v-model="formData.number" type="digit" placeholder="请输入购买的数量">
            <template #button>
              <van-button class="confirmBtn" size="small" type="primary" :loading="isLoading" @click="onConfirm"
                >确定</van-button
              >
            </template>
          </van-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isLoading: false
    }
  },
  props: {
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  watch: {},
  created() {
    let top = (window.innerHeight - 310) / 2 + 'px'
    this.top = top
  },
  mounted() {},
  methods: {
    onClose() {
      this.dialogVisible = false
    },
    onConfirm() {
      const number = +this.formData.number
      if (number <= 0) {
        this.$toast('请输入购买数量')
        return
      }
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.dialogVisible = false
        this.$emit('success', number)
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
@redColor: #fc3b52;
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.dialogWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .dialogContent {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    background: #fff;
    font-size: 14px;
    color: #fff;
    border-radius: 12px;
    padding: 30px 0 30px 0;

    .icon {
      width: 60px;
      height: 66px;
      background: url('@{imgUrl}icon-dialog-sign.png') no-repeat center / cover;
    }

    .title {
      font-size: 16px;
      color: #333;
      padding: 12px 0 40px 0;
    }

    .inputBox {
      width: 100%;
      padding: 0 30px;
      margin-bottom: 60px;

      .confirmBtn {
        background: @redColor;
        width: 48px;
        height: 48px;
        font-size: 12px;
        border: 1px solid @redColor;
        border-radius: 48px;

        /deep/ &.van-button--small {
          padding: 0;
        }
      }

      /deep/.van-field {
        display: flex;
        align-items: center;
        height: 50px;
        border: 1px solid @redColor;
        border-radius: 50px;
        padding: 0 0 0 16px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
