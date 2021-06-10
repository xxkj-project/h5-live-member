<!-- 
   提现结果
-->
<template>
  <div class="withdrawResult">
    <headerBar>
      <p class="completeBtn" @click="onComplete">完成</p>
    </headerBar>
    <div class="main">
      <div class="container">
        <span class="icon"></span>
        <span class="txt">提交成功</span>
        <span>提现到账状态请到充提记录中查看</span>
        <span>如有提现交易疑问添加客服反馈需求</span>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {},
  components: { headerBar },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 500)
  },
  mounted() {},
  methods: {
    onComplete() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/withdraw/';
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #a1a2a6;
  line-height: 22px;
  padding-top: 44px;

  .icon {
    width: 72px;
    height: 72px;
    background: url('@{imgUrl}icon-success.png') no-repeat center / cover;
  }

  .txt {
    font-size: 16px;
    color: #191919;
    line-height: 34px;
    padding-top: 4px;
  }
}
</style>
