<!--
 * @Author: wangshengxian
 * @Date: 2020-12-23 09:50:35
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 14:25:04
 * @Desc: 圣诞活动地址dialog - components
-->
<template>
  <div class="address-components">
    <van-dialog v-model="dialogVisible" :show-confirm-button="false">
      <div class="dialogBg">
        <div class="topBox">
          <p class="desc1">此地址将用于之后中奖产品的邮寄</p>
          <p class="desc2">*如不填写领奖信息为自动放弃本奖品</p>
        </div>
        <div class="addressBox">
          <ul class="">
            <li class="item">
              <p class="label">姓名:</p>
              <van-field v-model="formData.name" clearable placeholder="请输入姓名" />
            </li>
            <li class="item">
              <p class="label">手机号码:</p>
              <van-field v-model="formData.mobile" clearable placeholder="请输入手机号" />
            </li>
            <li class="item">
              <p class="label">收货地址:</p>
              <van-field v-model="formData.address" type="textarea" clearable placeholder="请输入收货地址" />
            </li>
          </ul>
        </div>
        <div class="footerBox">
          <span class="confirmBtn" @click="onConfirm"></span>
        </div>
      </div>
      <div class="cancelBox">
        <span class="cancelBtn" @click="onCancel"></span>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { editLotteryInfo } from '@/api/2020_activity'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        console.log(this.visible)
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onConfirm() {
      this.validateFunc(() => {
        editLotteryInfo(this.formData).then(res => {
          console.log('-res-', res)
          this.$toast('编辑成功')
          this.$emit('success')
          this.dialogVisible = false
        })
      })
    },
    onCancel() {
      this.dialogVisible = false
    },
    validateFunc(callback) {
      const { name, mobile, address } = this.formData
      if (!name) {
        this.$toast('请输入姓名')
        return
      }
      if (!mobile) {
        this.$toast('请输入手机号')
        return
      }
      if (!address) {
        this.$toast('请输入收货地址')
        return
      }
      callback()
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/christmas/';
/deep/ .van-dialog {
  background: rgba(0, 0, 0, 0);
  top: 50%;

  .van-dialog__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

/deep/ .van-cell {
  border-radius: 6px;
  padding: 8px 12px;
}

.address-components {
  .dialogBg {
    width: 300px;
    height: 515px;
    background: url('@{imgUrl}dialog-bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 106px 15px 0;
    margin-bottom: 16px;
  }
}

.topBox {
  text-align: center;
  .desc1 {
    font-size: 18px;
    color: #fedfa4;
    margin-bottom: 12px;
  }
  .desc2 {
    font-size: 12px;
    color: #6f0713;
  }
}

.addressBox {
  .item {
    .label {
      color: #fff;
      font-size: 12px;
      line-height: 32px;
    }
  }
}

.footerBox {
  display: flex;
  justify-content: center;
  padding: 16px 0 20px;

  .confirmBtn {
    width: 210px;
    height: 38px;
    background: url('@{imgUrl}confirm-btn.png') no-repeat center;
    background-size: 100% 100%;
  }
}

.cancelBox {
  display: flex;
  justify-content: center;

  .cancelBtn {
    width: 32px;
    height: 32px;
    background: url('@{imgUrl}cancel-btn.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
