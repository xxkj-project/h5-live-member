<!--
 * @Author: wangshengxian
 * @Date: 2020-09-17 09:53:38
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-11 11:07:10
 * @Desc: 活动规则dialog
-->
<template>
  <div class="rule" v-show="dialogVisible">
    <div class="ruleContent">
      <img @click="closeHandle" src="@/assets/images/currentActivity/monkeyKing/close.png" alt="" />
      <div class="content">
        <div class="award">
          <h2>奖励内容</h2>
          <hr />
          <p class="contentItem">
            1.用户在送出价值100TST的礼物“美猴王”时候，主播随机获得“真猴王”或“假猴王”，“真猴王”价值200TST，“假猴王”价值66TST，剩余TST注入奖池。
          </p>
          <p>
            2.根据每周/月主播获得的“美猴王”礼物个数获得排名。
          </p>
          <p>周星榜：</p>
          <p>第一名<span>获得奖池25%奖励，封面标签，前排推荐位4小时，周星榜单排名推荐。</span></p>
          <p>第二名<span>获得奖池15%奖励，封面标签，前排推荐位2小时，周星榜单排名推荐。</span></p>
          <p>第三名<span>获得奖池10%奖励，封面标签，前排推荐位1小时，周星榜单排名推荐。</span></p>
          <p>月星榜：</p>
          <p>第一名<span>获得奖池20%奖励，BANNER推荐位1天，月星榜单排名推荐。</span></p>
          <p>第二名<span>获得奖池10%奖励，前排推荐位4小时，月星榜单排名推荐。</span></p>
          <p class="contentItem">第三名<span>获得奖池5%奖励，前排推荐位2小时，月星榜单排名推荐。</span></p>
          <p>
            3.根据每周/月用户送出的“美猴王”礼物个数获得排名。
          </p>
          <p>降妖周榜：</p>
          <p>第一名<span>获得奖池15%奖励，进场特效，星豪标签，榜单排名。</span></p>
          <p>第二名<span>获得奖池10%奖励，进场特效，星豪标签，榜单排名。</span></p>
          <p>第三名<span>获得奖池5%奖励，进场特效，星豪标签，榜单排名。</span></p>
          <p>降妖月榜：</p>
          <p>第一名<span>获得奖池20%奖励，进场特效，星豪标签，榜单排名。</span></p>
          <p>第二名<span>获得奖池10%奖励，进场特效，星豪标签，榜单排名。</span></p>
          <p class="contentItem">第三名<span>获得奖池5%奖励，进场特效，星豪标签，榜单排名。</span></p>
          <h2>活动规则</h2>
          <hr />
          <p>
            1.活动对象为全平台所有主播及用户。
          </p>
          <p>
            2.奖励会在每个周期结束的3个工作日内发放到其账户。
          </p>
          <p>
            3.如有任何疑问，请咨询我们唐僧直播微信客服。
          </p>
          <p class="contentItem">
            唐僧直播客服微信号：TangsengKF001
          </p>
        </div>
      </div>
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
  created() {},
  mounted() {},
  methods: {
    closeHandle() {
      this.dialogVisible = false
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/monkeyKing/';
.rule {
  font-size: PingFang-SC-Medium;
  // letter-spacing: 2px;

  .ruleContent {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1002;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    // position: relative;

    img {
      position: absolute;
      right: 20px;
      top: 90px;
      width: 30px;
      height: 30px;
    }

    .content {
      width: 340px;
      height: 460px;
      margin: 130px auto;
      // background: red;
      background: url('@{imgUrl}mainBg.png') no-repeat;
      background-size: 100% 100%;
      padding: 20px 15px;

      .award {
        // padding: 10px 0px;
        height: 430px;
        overflow: auto;
      }

      h2 {
        font-size: 16px;
        font-weight: 600;
        padding-top: 10px;
        color: white;
        text-align: center;
      }

      hr {
        margin: 10px auto;
        width: 40px;

        height: 4px;
        border-radius: 2px;
        border: none;
        background: #9867f5;
      }

      p {
        color: white;
        font-size: 12px;
        line-height: 22px;

        span {
          color: #f91286;
        }
      }

      .contentItem {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
