<!--
 * @Author: wangshengxian
 * @Date: 2020-12-25 10:11:55
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-13 20:26:17
 * @Desc: 充值教程 - page
-->
<template>
  <div class="recharge-course-page">
    <headerBar isMainFullScreen arrowsType="while" background="rgba(0,0,0,0)" :titleOpacity="0" :onBack="onBack" />

    <div class="main">
      <div class="top">
        <img class="img" src="@/assets/video/videoTopBg.png" alt="" />
      </div>
      <div class="container">
        <videoPlay class="videoWrap" :videoUrl="videoUrl" />
      </div>
      <div class="bottom">
        <p class="">如有充值疑问，请咨询我们唐僧直播官方微信客服</p>
        <p>唐僧直播客服微信号：TangSengKF001</p>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import videoPlay from '@/components/videoPlay'
import openNative from '@/utils/openNative'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    videoUrl() {
      return 'http://video.whkuaiyu.com/video/0e814e6a9e7c4422fbf0018c6a016f1a.mp4'
    }
  },
  components: { headerBar, videoPlay },
  created() {},
  mounted() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.recharge-course-page {
  height: 100%;
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #1523a6;
  }
}

.top {
  .img {
    display: block;
    width: 100%;
  }
}

.container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .videoWrap {
    // width: 235px;
    width: 225px;
  }
}

.bottom {
  font-size: 12px;
  color: #8f9aff;
  text-align: center;
  line-height: 22px;
  // padding: 10px 0 15px;
  padding: 10px 0 20px;
}
</style>
