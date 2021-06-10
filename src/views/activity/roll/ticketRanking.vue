<!--
 * @Author: wangshengxian
 * @Date: 2021-01-14 18:07:28
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-14 18:19:43
 * @Desc: 
-->
<template>
  <div class="ranking">
    <headerBar
      :background="headConfig.bgColor"
      :arrowsType="headConfig.arrowsType"
      :titleOpacity="headConfig.titleOpacity"
      :onBack="onBack"
      isMainFullScreen
      :isHighColor="false"
    />
    <div class="main">
      <img :src="item" v-for="(item, index) in imgList" :key="index" alt="" />
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import headerMixins from '@/mixins/headConfig'
import openNative from '@/utils/openNative'
import { baseResourceUrl, activity2021RootFile } from '@/const/global'
export default {
  name: '',
  mixins: [headerMixins],
  data() {
    return {
      imgList: []
    }
  },
  computed: {},
  components: { headerBar },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 500)
  },
  mounted() {
    this.getData()
  },
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    getData() {
      let baseUrl = `${baseResourceUrl}${activity2021RootFile}/ticketRanking`
      // console.log('-base-url-', baseUrl)
      const imgNames = ['bg1.png', 'bg2.png', 'bg3.png', 'bg4.png']
      this.imgList = imgNames.map(val => `${baseUrl}/${val}`)
      // console.log('-imgList-', this.imgList)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.main {
  img {
    display: block;
    width: 100%;
  }
}
</style>
