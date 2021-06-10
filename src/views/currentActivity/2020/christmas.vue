<!--
 * @Author: wangshengxian
 * @Date: 2020-12-21 09:57:02
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 14:30:39
 * @Desc: 圣诞节活动 - page
-->
<template>
  <div class="christmas-page">
    <headerBar
      :background="headConfig.bgColor"
      :arrowsType="headConfig.arrowsType"
      :titleOpacity="headConfig.titleOpacity"
      :onBack="onBack"
      :isMainFullScreen="true"
      :isHighColor="false"
    />
    <div class="main">
      <div class="main-bg main-bg1">
        <img src="@/assets/images/currentActivity/christmas/main-bg1.png" alt="" />

        <img class="title-img" src="@/assets/images/currentActivity/christmas/title-bg.png" alt="" />
        <p class="activity-time">
          <span>活动时间：{{ infoData.startTime | filterActTime }} - {{ infoData.endTime | filterActTime }}</span>
        </p>
      </div>
      <div class="main-bg main-bg2">
        <img src="@/assets/images/currentActivity/christmas/main-bg2.png" alt="" />
      </div>
      <div class="main-bg main-bg3">
        <img src="@/assets/images/currentActivity/christmas/main-bg3.png" alt="" />
        <div class="container-bg">
          <template v-if="isShowList">
            <ul class="list-box">
              <li class="item">
                <p class="item-time">中奖时间</p>
                <p class="item-name">中奖奖品</p>
              </li>
              <li class="item" v-for="(item, index) in recordList" :key="index">
                <p class="item-time">{{ item.createTime }}</p>
                <p class="item-name">{{ item.lotteryName }}</p>
              </li>
            </ul>
          </template>
          <template v-else>
            <img class="no-data-img" src="@/assets/images/currentActivity/christmas/icon-no-data.png" alt="" />
          </template>
        </div>
        <p class="addressBtn" @click="onOpenAddress">添加与修改收货地址</p>
      </div>
      <div class="main-bg main-bg4">
        <img src="@/assets/images/currentActivity/christmas/main-bg4.png" alt="" />
      </div>
    </div>

    <christmasAddress :formData="addressData" :visible.sync="isOpenAddress" @success="handleSuccess" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import christmasAddress from './components/christmas/christmasAddress'
import headConfigMixins from '@/mixins/headConfig'
import openNative from '@/utils/openNative'
import tools from '@/utils/tools'
import { getChristmasConfig, getChristmasAddress, getChristmasList } from '@/api/2020_activity'
export default {
  name: '',
  mixins: [headConfigMixins],
  data() {
    return {
      infoData: {
        startTime: '',
        endTime: ''
      },
      isShowList: true,
      recordList: [],
      isOpenAddress: false,
      initAddressData: {},
      addressData: {}
    }
  },
  computed: {},
  components: { headerBar, christmasAddress },
  filters: {
    filterActTime(val) {
      val = val.replace(/-/g, '/')
      return tools.formatDate(val, '{y}.{m}.{d}')
    }
  },
  created() {
    this.getAddressData()
    this.getConfigData()
    this.getData()
  },
  mounted() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    onOpenAddress() {
      console.log('-init-address-data-', this.initAddressData)
      this.isOpenAddress = true
      this.addressData = { ...this.initAddressData }
    },
    handleSuccess() {
      this.getAddressData()
    },
    getAddressData() {
      getChristmasAddress().then(res => {
        console.log('-address-res-', res)
        this.initAddressData = res.data
      })
    },
    getConfigData() {
      getChristmasConfig().then(res => {
        console.log('-config-res-', res)
        const { startTime, endTime } = res.data
        this.infoData = { startTime, endTime }
      })
    },
    getData() {
      this.$loading.show()
      getChristmasList()
        .then(res => {
          this.$loading.hide()
          console.log('-list-res-', res)
          let list = res.data
          if (list.length == 0) {
            this.isShowList = false
            return
          }
          this.isShowList = true
          this.recordList = list
          // console.log('-record-list-', this.recordList)
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    setData(list) {
      let result = list.map(val => {
        val.createTime = tools.formatDate(val.createTime, '{y}-{m}-{d} {h}:{i}:{s}')
        return val
      })
      return result
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/christmas/';

.main-bg {
  width: 100%;

  img {
    display: block;
    width: 100%;
  }
}

.main-bg1 {
  position: relative;
  overflow: hidden;

  .title-img {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 283px;
  }

  .activity-time {
    position: absolute;
    top: 190px;
    width: 100%;
    text-align: center;
    color: #ffe7ad;
    font-size: 12px;
    line-height: 36px;
    letter-spacing: 1px;
  }
}

.main-bg3 {
  position: relative;

  .container-bg {
    position: absolute;
    top: 105px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 355px;
    // height: 218px;
    height: 190px;
    background: url('@{imgUrl}list-bg.png') no-repeat center;
    background-size: 100% 100%;

    .no-data-img {
      width: 71px;
      height: 65px;
    }

    .list-box {
      overflow-y: auto;
      width: 100%;
      height: 100%;
      padding: 0 15px 10px;

      .item {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #fff;
        line-height: 36px;
        border-bottom: 1px solid #c92339;

        .item-time {
          color: #ffc4cb;
        }

        .item-name {
          color: #ffe7ad;
        }

        &:first-child {
          font-size: 14px;
          line-height: 42px;
          border-bottom: none;

          .item-time,
          .item-name {
            color: #fff;
          }
        }
      }
    }
  }

  .addressBtn {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #fff2ba;
    line-height: 30px;
    border: 1px solid #fff2ba;
    padding: 0 10px;
    border-radius: 15px;
  }
}
</style>
