<!-- 
   mask遮罩
-->
<template>
  <div class="mask">
    <div class="maskWrap" :style="{ background: `rgba(0,0,0, ${opacity})` }" @click="onMask" v-show="dialogVisible">
      <span class="maskTxt"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 遮罩背景透明度
    opacity: {
      type: String,
      default: '0.5'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onMask() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
.maskWrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 8px 25px 0 0;
  .maskTxt {
    display: block;
    width: 281px;
    height: 150px;
    background: url('@{imgUrl}mask_txt.png') no-repeat center / cover;
  }
}
</style>
