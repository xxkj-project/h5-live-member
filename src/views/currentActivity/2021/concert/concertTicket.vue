<!-- 
   演唱会门票
-->
<template>
  <div class="concertTicket">
    <headerBar arrowsType="white">
      <span class="headerRightTxt" @click="onSave">保存票据</span>
    </headerBar>
    <div class="main">
      <div class="content">
        <div class="contentTop">
          <div class="iconBox">
            <span class="icon"></span>
          </div>
          <span class="title">无线梦想音乐演唱会2021</span>
          <span class="desc">无线梦想音乐演唱会入场票据码</span>
          <span class="num">拥有 {{ infoData.num }} 张</span>
          <span class="time">观看时间：2021-05-01 18:45</span>
        </div>
        <div class="centerWrap">
          <div class="centerBox">
            <span class="topImg"></span>
            <p class="title">我的入场票据码</p>
            <ul class="listBox">
              <li class="item" v-for="(item, index) in list" :key="index">
                <div
                  v-clipboard:copy="item"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  class="copyBtn btn"
                >
                  {{ item }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="contentBottom">
        <p class="ruleTitle">购票须知</p>
        <p class="ruleTxt">
          1.须打开【唐僧直播APP-演唱会直播间-输入入场票据码】入场观看；
        </p>
        <p class="ruleTxt">
          2.入场票据码将通过邮件的形式发送，请各位注意验收，入场票据码仅为入场观看演唱会的权利，未收到入场票据码请联系我们官方客服（微信号：TangSengKF001）；
        </p>
        <p class="ruleTxt">
          3.入场票据码为一次性，一码一票，请妥善保管自己入场票据码，不要泄露给他人，若因个人保管、转让、倒卖等原因导致入场票据码无法进入观看演唱会，此带来的不良后果及票务风险由购票者自行承担。同时请警惕入场票据码转让、倒卖行为，谨防上当受骗。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
export default {
  name: '',
  data() {
    return {
      infoData: { num: '' },
      list: []
    }
  },
  computed: {},
  components: { headerBar },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    onSave() {
      this.$toast('暂未开放')
    },
    onCopy() {
      this.$toast('复制成功')
    },
    onError() {
      this.$toast('复制失败')
    },
    getData() {
      let data = {
        list: ['WX2021', 'WX2022']
      }
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
        this.list = data.list
        this.infoData.num = this.list.length
      }, 500)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/concert/';

.concertTicket {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #034a8e;
  // background: linear-gradient(90deg, rgb(82, 134, 194) 0%, rgb(9, 94, 192) 100%);

  /deep/ .header {
    .header-global {
      background: #034a8e;
      font-size: 18px;
      color: #fff;

      .left {
        width: 38px;
      }

      .right {
        right: 13px;
        font-size: 15px;
      }
    }
  }

  .main {
    flex: 1;
    overflow-y: auto;
    padding: 44px 13px 0;
  }
}

.content {
  background: #fff;
  font-size: 12px;
  line-height: 12px;
  color: #8d8c94;
  border-radius: 12px;

  .contentTop {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #f2f2f5;
    padding: 35px 0 16px 0;

    .iconBox {
      position: absolute;
      top: -38px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 76px;
      height: 76px;
      background: #fff;
      border-radius: 50%;

      .icon {
        width: 72px;
        height: 72px;
        background: url('@{imgUrl}icon-head.png') no-repeat center / cover;
        border-radius: 50%;
      }
    }

    .title {
      font-size: 14px;
      line-height: 14px;
      padding: 10px 0 15px 0;
    }

    .desc {
      color: #191919;
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 20px;
    }

    .num {
      width: 200px;
      background: #fc3b52;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      letter-spacing: 1px;
      color: #fff;
      border-radius: 20px;
      margin-bottom: 30px;
    }
  }

  .centerWrap {
    padding: 16px 13px;
  }

  .centerBox {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    box-shadow: 0px 10px 10px -10px #e4e6ea;

    .topImg {
      width: 100%;
      height: 125px;
      background: url('@{imgUrl}smallBanner.png') no-repeat center / cover;
      border-radius: 16px 16px 0 0;
    }
    .title {
      text-align: center;
      line-height: 42px;
      font-size: #49484d;
    }
  }
  .listBox {
    padding: 0 20px 15px;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      background: #f2f2f5;
      font-size: 18px;
      color: #000;
      border-radius: 35px;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.contentBottom {
  background: #034a8e;
  font-size: 12px;
  color: #c4c3cf;
  padding-bottom: 25px;

  .ruleTitle {
    color: #fff;
    font-size: 14px;
    line-height: 14px;
    padding: 20px 0 15px;
  }

  .ruleTxt {
    line-height: 20px;
    letter-spacing: 2px;
    margin-bottom: 13px;
  }
}
</style>
