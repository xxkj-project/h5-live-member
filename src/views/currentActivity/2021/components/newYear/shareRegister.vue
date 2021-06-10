<!--
 * @Author: wangshengxian
 * @Date: 2021-01-23 10:22:28
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 15:02:42
 * @Desc: 2021 -- 新年活动 - 注册
-->
<template>
  <div class="mask dialog" v-show="dialogVisible">
    <div class="wrapper dialogWrap">
      <div class="dialogContainer" :style="{ top: top }">
        <div class="dialogMain">
          <span class="dialogTitleBg"></span>
          <div class="formWrap">
            <van-form>
              <div class="mobileBox">
                <van-dropdown-menu get-container="dialogContainer">
                  <van-dropdown-item v-model="formData.mobilePrefix" :options="prefixOptions"></van-dropdown-item>
                </van-dropdown-menu>
                <van-field v-model="formData.mobile" type="tel" center clearable placeholder="请输入手机号" />
              </div>
              <van-field v-model="formData.code" type="number" center clearable placeholder="请输入验证码">
                <template #button>
                  <van-button
                    class="codeBtn fx-center"
                    native-type="button"
                    type="primary"
                    size="mini"
                    @click.stop="onSendCode"
                    v-if="isShowBtn"
                    >{{ codeBtnTxt }}</van-button
                  >
                  <p class="countTime fx-center" v-else>{{ countTime }}S</p>
                </template>
              </van-field>
              <van-field
                v-model="formData.inviteId"
                center
                clearable
                disabled
                placeholder="请输入邀请码"
                :rules="[{ required: true, message: '请输入邀请码' }]"
              />
              <div class="btnBox" @click="onSubmit">
                <van-button
                  class="registerBtn"
                  round
                  block
                  type="info"
                  native-type="submit"
                  :loading="isLoading"
                  loading-text="加载中..."
                >
                  注册
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
        <span class="cancelBtn" @click="onClose"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { shareRegister, sendMsg } from '@/api/common'
import { prefixOptions } from '@/const/global'
export default {
  name: '',
  data() {
    return {
      top: '0',
      isLoading: false,
      isShowBtn: true,
      countTime: 60,
      codeBtnTxt: '获取验证码',
      formData: {
        mobilePrefix: '+86',
        mobile: '',
        code: '',
        inviteId: ''
      },
      prefixOptions: prefixOptions
    }
  },
  props: {
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
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.setInviteId()
      this.setTop()
    })
  },
  methods: {
    setTop() {
      let top = (window.innerHeight - 410) / 2 + 'px'
      this.top = top
    },
    setInviteId() {
      const code = this.$route.query.code
      // console.log('-邀请码-code-', code)
      code && (this.formData.inviteId = code)
    },
    onSendCode() {
      const { mobilePrefix, mobile } = this.formData
      if (!mobile) {
        this.$toast('请输入手机号！')
        return
      }
      const params = { mobilePrefix, mobile, type: 4 }
      sendMsg(params).then(res => {
        console.log('-res-', res)
        this.isShowBtn = false
        let timer = setInterval(() => {
          this.countTime--
          if (this.countTime < 0) {
            clearInterval(timer)
            this.isShowBtn = true
            this.codeBtnTxt = '重新获取'
            this.countTime = 60
          }
        }, 1000)
      })
    },
    onSubmit() {
      // console.log('-submit-', this.formData)
      const { mobile, code } = this.formData
      if (!mobile) {
        this.$toast('请输入手机号！')
        return
      }
      if (!code) {
        this.$toast('请输入验证码！')
        return
      }
      if (this.isLoading) {
        this.$toast('亲，您操作太频繁了！')
        return
      }

      this.isLoading = true
      // console.log('-params-', this.formData)
      shareRegister(this.formData).then(res => {
        console.log('-res-', res)
        setTimeout(() => {
          this.isLoading = false
          this.$toast({
            message: '恭喜您，注册成功了，请前往唐僧直播APP查看获得的字卡',
            duration: 3000
          })
          this.dialogVisible = false
          this.$emit('success')
        }, 1000)
      })
    },
    onClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/newYearShare/';

@inputPlaceholder: #b0b0b0;
@codeColor: #f33247;

.mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.dialogContainer {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .dialogMain {
    overflow: hidden;
    width: 310px;
    height: 410px;
    // background: #fff;
    border-radius: 25px;
    margin-bottom: 10px;

    .dialogTitleBg {
      display: block;
      width: 310px;
      height: 105px;
      background: url('@{imgUrl}dialogTitleBg.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .cancelBtn {
    width: 32px;
    height: 32px;
    background: url('@{imgUrl}cancelBtnBg.png') no-repeat center;
    background-size: 100% 100%;
  }
}

/deep/ .van-cell {
  padding: 0 0;

  .van-field__body {
    display: flex;
    align-items: center;
    line-height: 44px;
  }

  .van-field__control {
    border: 1px solid #d0cdcd;
    border-radius: 12px;
    padding: 0 15px;

    &:disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
    }
  }

  .van-field__button {
    // height: 44px;
    font-size: 14px;
    color: @codeColor;
    padding-left: 10px;

    .van-button__text {
      line-height: 44px;
    }

    .codeBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 44px;
      background: #fff;
      font-size: 14px;
      color: @codeColor;
      border: 1px solid @codeColor;
      border-radius: 12px;
      box-sizing: border-box;
    }

    .countTime {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 44px;
      border: 1px solid #d0cdcd;
      border-radius: 12px;
    }
  }
}

.formWrap {
  width: 100%;
  background: #fff;
  padding: 25px 15px;

  /deep/ .van-field {
    margin-bottom: 24px;

    input::-webkit-input-placeholder {
      color: @inputPlaceholder;
    }
    input:-moz-placeholder {
      color: @inputPlaceholder;
    }
    input:-ms-input-placeholder {
      color: @inputPlaceholder;
    }
  }

  .mobileBox {
    overflow: hidden;
    display: flex;
    background: #fff;
    border: 1px solid #d0cdcd;
    border-radius: 12px;
    margin-bottom: 24px;

    /deep/ .van-dropdown-item {
      left: 50%;
      transform: translateX(-50%);
      width: 310px;

      .van-popup {
        padding: 15px 15px;
      }

      .van-cell {
        .van-cell__title {
          line-height: 36px;
        }
        .van-cell__value {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
    .van-dropdown-menu {
      height: auto;
      padding: 0 15px;

      /deep/ .van-dropdown-menu__title {
        padding: 0 6px 0 0;
      }
    }

    /deep/ .van-field {
      margin-bottom: 0;

      .van-field__control {
        border: none;
      }
    }
  }

  .btnBox {
    .registerBtn {
      background: @codeColor;
      border: 1px solid @codeColor;
      line-height: 44px;
      font-size: 16px;
    }
  }
}
</style>
