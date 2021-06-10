<!--  -->
<template>
  <div class="affiche">
    <headerBar
      :onBack="onBack"
      isMainFullScreen
      :isHighColor="false"
      arrowsType="white"
      background="rgba(0,0,0,0)"
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
  name: 'Affiche',
  data() {
    return {
      imgUrl: `${baseResourceUrl}${bannerRootFile}/afficheBg.png`
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
@imgUrl: '~@/assets/images/';
.affiche {
  height: 100%;
  font-size: 0px;
  // background: #000;
  .main {
    display: flex;
    align-items: center;
    height: 100%;
    background: #120d3b;
    img {
      width: 100%;
    }
  }
}
</style>
