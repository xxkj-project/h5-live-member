<!-- 
  活动页公共组件
 -->
<template>
  <div class="content">
    <headerBar
      :background="headConfig.bgColor"
      :arrowsType="headConfig.arrowsType"
      :titleOpacity="headConfig.titleOpacity"
      isMainFullScreen
      :isHighColor="false"
      :onBack="onBack"
    ></headerBar>
    <div class="main">
      <div class="imgBg">
        <img :src="bgImgUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import headConfigMixins from '@/mixins/headConfig'
import { baseResourceUrl, bannerRootFile } from '@/const/global'
export default {
  name: '',
  mixins: [headConfigMixins],
  data() {
    return {
      bgImgs: {
        recruitHost: 'reruitHost.png',
        newYearPoster: 'posterBg.jpg'
      }
    }
  },
  props: {
    type: {
      type: String,
      defaualt: ''
    },
    imgName: {
      type: String,
      required: true
    }
  },
  computed: {
    bgImgUrl() {
      let resultImgUrl = `${baseResourceUrl}${bannerRootFile}/${this.imgName}`
      console.log('-img-url-', resultImgUrl)
      return resultImgUrl
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
// @imgUrl: '~@/assets/images/';
.content {
  height: 100%;
  .main {
    font-size: 0px;
    img {
      width: 100%;
    }
  }
}
</style>
