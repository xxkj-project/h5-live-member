<!--
 * @Author: wangshengxian
 * @Date: 2021-01-12 11:47:10
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-02 10:05:13
 * @Desc: 充值 - 充值选择
-->
<template>
  <div class="rechargeOptions">
    <headerBar background="#ffd347" :onBack="onBack" />
    <div class="main">
      <ul class="listBox">
        <li v-for="(item, index) in list" :key="index" @click="onOpenPage(item)">
          <div class="item">
            <div class="left">
              <p class="title">{{ item.title }}</p>
              <p class="desc">{{ item.desc }}</p>
            </div>
            <div class="right">
              <span class="icon-arrow"></span>
            </div>
          </div>
          <!-- <div class="item" v-if="!isEnvProd || index == 1">
            <div class="left">
              <p class="title">{{ item.title }}</p>
              <p class="desc">{{ item.desc }}</p>
            </div>
            <div class="right">
              <span class="icon-arrow"></span>
            </div>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      list: [
        { title: '购买充值', desc: '直接购买TST', routerName: 'RechargeBuy', isExchange: true },
        { title: '兑换充值', desc: '使用其它币种兑换为TST', routerName: 'Recharge', isExchange: true }
      ]
    }
  },
  computed: {
    isEnvProd() {
      console.log('-env-', process.env.VUE_APP_SERVER_ENV)
      return process.env.VUE_APP_SERVER_ENV === 'prod'
    },
    ...mapState('globalStatus', ['channelId'])
  },
  components: { headerBar },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 300)
    // TODO: 安卓上架谷歌，需要隐藏掉兑换充值，通过channelId参数来判断
    console.log('-222-', this.channelId)
    this.channelId === 'android_google' && (this.list[1].isExchange = false)
  },
  mounted() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    onOpenPage(item) {
      const { routerName } = item
      this.$router.push({ name: routerName })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/recharge/';
.rechargeOptions {
  height: 100%;
  background: #f5f5f5;
}

.listBox {
  padding: 30px 15px 0;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 0 20px;

    .left {
      .title {
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 19px;
      }
      .desc {
        font-size: 14px;
        color: #999;
      }
    }

    .right {
      .icon-arrow {
        display: block;
        width: 6px;
        height: 12px;
        background: url('@{imgUrl}icon-right-arrow.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
