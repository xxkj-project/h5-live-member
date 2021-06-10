<!-- 
   邀请好友注册 -- h5 外链
-->
<template>
  <div class="inviteRegister">
    <img class="topBg" src="@/assets/images/outsideLink/inviteRegister/topBg.jpg" alt="" />

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
        <van-field v-model="formData.inviteId" center clearable disabled placeholder="请输入邀请码(非必填)" />
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

      <div class="footerWrap">
        <span class="checkBtn" :class="{ isChecked: isChecked }" @click="onChecked"></span>
        <p @click="onOpenPage">注册代表你已经同意《用户协议》</p>
      </div>
    </div>
  </div>
</template>

<script>
import loadingAniMixins from '@/mixins/loadingAni'
import { shareRegister, sendMsg } from '@/api/common'
import { prefixOptions, appDownloadUrl } from '@/const/global'
export default {
  name: '',
  mixins: [loadingAniMixins],
  data() {
    return {
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
      prefixOptions: prefixOptions,
      isChecked: false,
      timer: null
    }
  },
  computed: {},
  components: {},
  created() {
    let initHei = window.innerHeight
    window.addEventListener('resize', () => {
      if (Window.innerHeight < initHei) window.scrollTo(0, 0)
    })
  },
  mounted() {
    const anchorId = this.$route.query.anchorId
    anchorId && (this.formData.inviteId = anchorId)
  },
  methods: {
    onChecked() {
      this.isChecked = !this.isChecked
    },
    onOpenPage() {
      this.$router.push({ name: 'UserAgreement', query: { formRouterName: 'InviteRegister' } })
    },
    onSendCode() {
      const { mobilePrefix, mobile } = this.formData
      if (!mobile) {
        this.$toast('请输入手机号！')
        return
      }
      const params = { mobilePrefix, mobile, type: 4 }
      sendMsg(params).then(res => {
        // console.log('-res-', res)
        this.isShowBtn = false
        this.timer = setInterval(() => {
          this.countTime--
          if (this.countTime < 0) {
            clearInterval(this.timer)
            this.isShowBtn = true
            this.codeBtnTxt = '重新获取'
            this.countTime = 60
          }
        }, 1000)
      })
    },
    onSubmit() {
      this.validateFunc(() => {
        // console.log('-params-', this.formData)
        this.isLoading = true
        shareRegister(this.formData)
          .then(res => {
            // console.log('-res-', res)
            this.isLoading = false
            this.$toast({
              message: '恭喜您，注册成功了',
              duration: 2000,
              onClose: () => {
                window.location.href = appDownloadUrl
              }
            })
          })
          .catch(() => {
            this.isLoading = false
          })
      })
    },
    validateFunc(callback) {
      const { mobile, code } = this.formData
      if (!mobile) {
        this.$toast('请输入手机号！')
        return
      }
      if (!code) {
        this.$toast('请输入验证码！')
        return
      }
      if (!this.isChecked) {
        this.$toast('注册前，请您勾选同意用户协议！')
        return
      }
      if (this.isLoading) {
        this.$toast('亲，您操作太频繁了！')
        return
      }
      callback()
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/outsideLink/inviteRegister/';

@inputBorderColor: #d7d7d7;
@inputPlaceholder: #a4a4a4;
@mainColor: #ffd200;

.inviteRegister {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  .topBg {
    width: 100%;
    margin-bottom: 40px;
  }

  .formWrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.formWrap {
  width: 320px;
  min-height: 390px;
  background: #fff;
  padding-bottom: 16px;

  .mobileBox {
    overflow: hidden;
    display: flex;
    background: #fff;
    border: 1px solid @inputBorderColor;
    border-radius: 44px;
    margin-bottom: 24px;

    /deep/ .van-dropdown-item {
      left: 50%;
      transform: translateX(-50%);
      width: 320px;

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

    /deep/ .van-field {
      border: none;
      margin-bottom: 0;
    }
  }

  .codeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 36px;
    background: @mainColor;
    font-size: 14px;
    color: #000;
    border-radius: 36px;
    border: 1px solid @mainColor;
    margin-right: 5px;
  }

  .countTime {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 36px;
    background: #d7d7d7;
    border-radius: 36px;
    margin-right: 5px;
  }

  .btnBox {
    .registerBtn {
      background: @mainColor;
      border: 1px solid @mainColor;
      line-height: 44px;
      font-size: 16px;
      color: #000;
    }
  }
}

.footerWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  line-height: 36px;
  font-size: 12px;
  color: #a6a6a6;

  .checkBtn {
    width: 14px;
    height: 14px;
    background: url('@{imgUrl}icon-no-checked.png') no-repeat center;
    background-size: 100% 100%;
    margin-right: 2px;

    &.isChecked {
      background: url('@{imgUrl}icon-checked.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
}

/deep/ .van-cell {
  padding: 0 0;

  &.van-field {
    background: #fff;
    border: 1px solid @inputBorderColor;
    border-radius: 44px;
    margin-bottom: 20px;

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

  .van-field__body {
    display: flex;
    align-items: center;
    line-height: 44px;

    .van-field__control {
      padding: 0 15px;

      &:disabled {
        background-color: #f5f7fa;
        border-color: @inputBorderColor;
        color: #c0c4cc;
      }
    }

    .van-field__button {
      font-size: 14px;
      color: #000;
      padding-left: 10px;

      .van-button__text {
        line-height: 36px;
      }
    }
  }
}

/deep/ .van-dropdown-menu {
  height: auto;
  padding: 0 15px;

  .van-dropdown-menu__bar {
    box-shadow: none;
  }

  .van-dropdown-menu__title {
    color: #202020;
    padding: 0 6px 0 0;

    &:after {
      border-top-color: transparent;
      border-right-color: transparent;
      border-bottom-color: #202020;
      border-left-color: #202020;
    }
  }
  .van-dropdown-item__option {
    // border-bottom: 1px solid rgb(241, 240, 240);
  }
}
</style>
