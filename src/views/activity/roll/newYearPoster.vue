<!--  -->
<template>
  <div class="recruitHost">
    <headerBar
      isMainFullScreen
      background="rgba(255,255,255,0)"
      arrowsType="white"
      :titleOpacity="0"
      :onBack="onBack"
    ></headerBar>
    <div class="main">
      <img :src="imgUrl1" alt="" />
      <img :src="imgUrl2" alt="" />
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import { baseResourceUrl, bannerRootFile } from '@/const/global'
export default {
  name: 'RecruitHost',
  data() {
    return {
      imgUrl1: `${baseResourceUrl}${bannerRootFile}/posterBg.jpg`,
      imgUrl2: `${baseResourceUrl}${bannerRootFile}/nyPoster2.jpg`
    }
  },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 500)
  },
  mounted() {},
  destroyed() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
.recruitHost {
  height: 100%;
  // font-size: 0px;
  .main {
    display: flex;
    flex-direction: column;
    img {
      width: 100%;
    }
  }
}
</style>
