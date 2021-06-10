<!-- 下载页 -->
<template>
  <div class="download">
    <div class="shadow" v-show="isWx" @click="closeShadow">
      <img src="@/assets/download/wechat.jpg" />
    </div>
    <div class="main_wrap">
      <div class="bg">
        <img class="logo" src="@/assets/download/logo.png" />
        <img class="logo_txt" src="@/assets/download/logo_txt.png" />
        <img
          class="android_btn downloadBtn"
          src="@/assets/download/android_btn.png"
          @click="downloadHandle('android')"
        />
        <img class="ios_btn downloadBtn" src="@/assets/download/ios_btn.png" @click="downloadHandle('ios')" />
      </div>
    </div>
  </div>
</template>

<script>
import platform from '@/utils/platform'
export default {
  name: '',
  data() {
    return {
      isWx: false,
      downloadUrlObj: {
        android: 'app://com.xinxin.tangseng',
        ios: 'tangsengLive://',
        jumpUrl: 'http://192.168.90.25:8899/tickets'
      },
      timerObj: null
    }
  },
  mounted() {
    console.log('-download-')
    window.addEventListener('pagehide', this.handlePagehide)
    window.addEventListener('visibilitychange', this.handleVisibility)
    window.addEventListener('webkitvisibilitychange', this.handleWebkitVisibility)
  },
  destroyed() {
    window.removeEventListener('pagehide', this.handlePagehide)
    window.removeEventListener('visibilitychange', this.handleVisibility)
    window.removeEventListener('webkitvisibilitychange', this.handleWebkitVisibility)
  },
  methods: {
    handlePagehide() {
      console.log('-界面隐藏-ios可以监听-')
      clearTimeout(this.timerObj)
    },
    handleVisibility() {
      console.log('-visibility-安卓可以监听-')
      let hidden =
        window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
      console.log('-hidden-', hidden)
      if (hidden) {
        clearTimeout(this.timerObj)
      }
    },
    handleWebkitVisibility() {
      console.log('-webkit-visibility-安卓可以监听-')
      let hidden =
        window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
      console.log('-hidden-', hidden)
      if (hidden) {
        clearTimeout(this.timerObj)
      }
    },
    closeShadow() {
      this.isWx = false
    },
    downloadHandles(type) {
      // console.log('-type-', type, '-platform-', platform)
      if (platform.isWechat) {
        this.isWx = true
        return
      }
      if (type == 'ios') {
        if (platform.isIos) {
          window.location.href = this.downloadUrlObj.ios
        }
      } else {
        if (platform.isAndroid) {
          window.location.href = this.downloadUrlObj.android
        }
      }

      this.timerObj = setTimeout(() => {
        console.log('去下载')
        window.location.href = 'http://192.168.90.25:8899/tickets'
      }, 3000)
    },
    downloadHandle(type) {
      // console.log('-type-', type, '-platform-', platform)
      if (platform.isWechat) {
        this.isWx = true
        return
      }
      if (type == 'ios') {
        if (platform.isIos) {
          window.location.href = `http://live.whkuaiyu.com:8888/livemember/course`
        }
      } else {
        if (platform.isAndroid) {
          window.location.href = 'https://video.whkuaiyu.com/app/TangSeng.apk'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/download/';
.download {
  .shadow {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    img {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  .main_wrap {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
    background: url('@{imgUrl}bg.png') no-repeat center top;
    background-size: cover;
    .bg {
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      padding-top: 111px;
    }
    .logo {
      display: block;
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
    .logo_txt {
      display: block;
      width: 70px;
      height: 18px;
      margin: 15px auto 99px;
    }
    .downloadBtn {
      display: block;
      width: 185px;
      height: 46px;
      margin: 0 auto;
      &.android_btn {
        margin-bottom: 49px;
      }
    }
    .code {
      width: 160px;
      height: 160px;
      background-color: #fff;
      margin: 50px auto 0;
      .code_img {
        width: 160px;
        height: 160px;
      }
    }
  }
}
</style>
