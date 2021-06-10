<!--  -->
<template>
  <div class="recruitHost">
    <headerBar
      :onBack="onBack"
      isMainFullScreen
      :isHighColor="false"
      arrowsType="white"
      background="rgba(0, 0, 0, 0)"
    ></headerBar>
    <div class="main">
      <img :src="imgUrl" alt="" />
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
      imgUrl: `${baseResourceUrl}${bannerRootFile}/recruitHost.png`
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
  font-size: 0px;

  .main {
    display: flex;
    align-items: center;
    height: 100%;
    background: #000;

    img {
      width: 100%;
    }
  }
}
</style>
