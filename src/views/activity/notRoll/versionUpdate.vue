<!--
 * @Author: wangshengxian
 * @Date: 2020-11-25 16:10:04
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-27 10:40:28
 * @Desc: app最新版本更新 - page
-->
<template>
  <div class="activity-page">
    <headerBar :onBack="onBack" isMainFullScreen arrowsType="white"></headerBar>

    <div class="main">
      <div class="top">
        <p class="bigTitle">唐僧直播APP</p>
        <p class="smallTitle">全新版本已上线</p>
      </div>
      <div class="center">
        <div class="centerContainer">
          <img class="bgImg1" :src="imgUrl1" alt="" />
          <img class="bgImg2" :src="imgUrl2" alt="" />
        </div>
      </div>
      <div class="bottom">
        <p>为获得更好体验</p>
        <p>请老用户先升级至最新版本</p>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import { baseResourceUrl, otherRootFile } from '@/const/global'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    baseImgUrl() {
      return `${baseResourceUrl}${otherRootFile}`
    },
    imgUrl1() {
      return `${this.baseImgUrl}/versionImg1.png`
    },
    imgUrl2() {
      return `${this.baseImgUrl}/versionImg2.png`
    }
  },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 500)
  },
  mounted() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/images/';

.activity-page {
  /deep/ .headerLine {
    background: #fff;
  }
  /deep/ .header-global {
    background: rgba(0, 0, 0, 0);
    .leftIcon {
      background: url('@{imgUrl}whiteLeftArrow.png') no-repeat center / cover;
    }
  }
}

.activity-page {
  height: 100%;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background: #ffc502;
    color: #1e1800;
    overflow: hidden;
  }
}

.top {
  text-align: center;
  padding: 58px 0 11px 0;
  .bigTitle {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 14px;
  }
  .smallTitle {
    font-size: 18px;
  }
}

.center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .centerContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 36px;

    .bgImg1 {
      position: absolute;
      top: 0;
      width: 335px;
    }
    .bgImg2 {
      width: 240px;
    }
  }
}

.bottom {
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 4px;
  text-align: center;
  padding: 18px 0 26px 0;
}
</style>
