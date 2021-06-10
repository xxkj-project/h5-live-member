<!--
 * @Author: wangshengxian
 * @Date: 2021-01-23 10:22:28
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-23 11:05:15
 * @Desc: 2021 -- 新年活动规则
-->
<template>
  <div class="mask rule" v-show="dialogVisible">
    <div class="wrapper ruleWrap">
      <div class="ruleContainer">
        <span class="ruleTitleBg"></span>
        <div class="ruleTxtBox">
          <p>
            1.春节活动期间内，只要在主播直播间送出指定礼物，即可获得1个字卡，每日无上限，送礼越多，获得的字卡越多。
          </p>
          <p>
            2.成功邀请新好友并下载注册唐僧直播，即可获得一张字卡，邀请的越多，获得字卡的记录越高，邀请好友不受限次数，系统消息会通知您获得的字卡。
          </p>
          <p>3.集齐“牛·年·添·福·气·唐·僧·奋·雄·程”10个字卡合并后等待开奖，一起瓜分一亿TF。</p>
          <p>4.奖励将在活动结束后7个工作日内发放。</p>
          <p>5.如有任何疑问，请咨询我们唐僧直播官方微信客服，微信号：TangSengKF001。</p>
          <p>更多精彩内容和活动，敬请关注“唐僧直播”微信公众号及官方微信群。</p>
        </div>
        <p class="explainTxt">本次活动最终解释权归唐僧直播所有</p>
      </div>
      <span class="cancelBtn" @click="onClose"></span>
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
    onClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/newYearShare/';
.mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.ruleContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 310px;
  background: #de2b39;
  border-radius: 16px;
  margin-bottom: 10px;

  .ruleTitleBg {
    width: 260px;
    height: 66px;
    background: url('@{imgUrl}rulesTitleBg1.png') no-repeat center;
    background-size: 100% 100%;
  }

  .ruleTxtBox {
    font-size: 11px;
    color: #ffe8c9;
    letter-spacing: 1px;
    // text-indent: 2em;
    line-height: 18px;
    padding: 25px 15px 10px;

    p {
      margin-bottom: 12px;
    }
  }

  .explainTxt {
    font-size: 11px;
    color: #ff717c;
    padding-bottom: 23px;
  }
}

.cancelBtn {
  width: 32px;
  height: 32px;
  background: url('@{imgUrl}cancelBtnBg.png') no-repeat center;
  background-size: 100% 100%;
}
</style>
