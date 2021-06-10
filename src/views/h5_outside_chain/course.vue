<!-- 
  唐僧直播ios内测版安装教程
 -->
<template>
  <div class="course">
    <img src="@/assets/course/course_1.png" alt="" />
    <img src="@/assets/course/course_2.png" alt="" />
    <span>
      <img src="@/assets/course/btnBg.png" alt="" />
      <button @click="downloadTestFlight">点击下载TestFlight</button>
    </span>
    <img src="@/assets/course/course_3.png" alt="" />
    <img src="@/assets/course/course_4.png" alt="" />
    <span>
      <img src="@/assets/course/btnBg.png" alt="" />
      <button @click="downloadHandle">点击下载</button>
    </span>
    <img src="@/assets/course/course_5.png" alt="" />
    <img src="@/assets/course/course_6.png" alt="" />
  </div>
</template>

<script>
import { testFlightUrl, iosTestFlightDownloadUrl } from '@/const/global'
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {
    this.$loading.show()
    setTimeout(() => {
      console.log('-course-')
      this.$loading.hide()
    }, 500)
  },
  methods: {
    downloadTestFlight() {
      window.location.href = testFlightUrl
    },
    downloadHandle() {
      window.location.href = iosTestFlightDownloadUrl
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/course/';
.course {
  img {
    width: 100%;
    outline-width: 0px;
    vertical-align: top;
  }
  span {
    position: relative;
    background: url('@{imgUrl}btnBg.png');
    // height: 55px;
    display: block;
    button {
      position: absolute;
      width: 60%;
      height: 39px;
      background: #f8b04e;
      color: red;
      left: 20%;
      top: 8px;
      color: #fff;
      border-radius: 5px;
      letter-spacing: 1px;
    }
  }
}
</style>
