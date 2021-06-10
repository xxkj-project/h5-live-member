<!--
 2021 - 演唱会活动
-->
<template>
  <div class="concert">
    <headerBar arrowsType="white">
      <span class="shareIcon" @click="onShare"></span>
    </headerBar>

    <div class="main">
      <div class="videoWrap">
        <videoPlay class="videoWrap" :posterUrl="posterUrl" :videoUrl="videoUrl" />
      </div>
      <div class="groupWrap baseInfoWrap">
        <p class="title">
          <span>无线梦想音乐演唱会 2021</span>
          <span class="price">￥200</span>
        </p>
        <p class="txt">200 分钟 / 群星线上演唱会</p>
        <p class="txt">2021-05-01 18:30 全网线上首映</p>
      </div>
      <div class="groupWrap descWrap">
        <p class="title">简介</p>
        <p class="txt">首次线上演唱会【World Music Showcase 2021】由唐僧直播独家播出！</p>
        <p class="txt">
          <span>这是一场梦想的音乐！ </span>
          <span>这是一场激动人心的演出！ </span>
          <span>这是一次跨界思维的碰撞！ </span>
          <span>所有的可能，这就是 “ 无限音乐，无限梦想 ” ！ </span>
        </p>
        <p class="txt">只要带上耳机就能一秒步入这场“无限梦想”的音乐世界，快来观赏这场绝无仅有的线上演唱会吧！</p>
        <p class="txt">
          * 【World Music Showcase 2021】线上演唱会播出时间： 2021年5月1日（周六）18:30（北京时间）
        </p>
      </div>
      <div class="groupWrap">
        <p class="title">拟邀艺人</p>
        <ul class="groupBox" v-for="(itemOptions, pIdx) in actorList" :key="pIdx">
          <li class="item" v-for="(item, cIdx) in itemOptions" :key="cIdx">
            <img class="itemImg" :src="item.imgUrl" alt="" />
            <span class="zhName">{{ item.zhName }}</span>
            <span class="enName">{{ item.enName }}</span>
          </li>
        </ul>
      </div>
      <div class="groupWrap noticeWrap">
        <p class="title">购票须知</p>
        <p class="txt">1.须打开【唐僧直播APP-演唱会直播间-输入入场票据码】入场观看；</p>
        <p class="txt">
          2.入场票据码将通过邮件的形式发送，请各位注意验收，入场票据码仅为入场观看演唱会的权利，未收到入场票据码请联系我们官方客服（微信号：TangSengKF001）；
        </p>
        <p class="txt">
          3.入场票据码为一次性，一码一票，请妥善保管自己入场票据码，不要泄露给他人，若因个人保管、转让、倒卖等原因导致入场票据码无法进入观看演唱会，此带来的不良后果及票务风险由购票者自行承担。同时请警惕入场票据码转让、倒卖行为，谨防上当受骗。
        </p>
      </div>
    </div>

    <div class="footerWrap">
      <p class="buyBtn" @click="onBuy">立即购买</p>
    </div>

    <envMask opacity="0.8" :visible.sync="isMask" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import videoPlay from '@/components/videoPlay'
import envMask from '@/components/envMask'
import { baseResourceUrl, activity2021RootFile, videoRootFile } from '@/const/global'
import { mapState } from 'vuex'
import openNative from '@/utils/openNative'
import noKey from '@/mixins/noKey'
import platform from '@/utils/platform'
export default {
  name: '',
  mixins: [noKey],
  data() {
    return {
      isMask: false
    }
  },
  computed: {
    ...mapState('user', ['accessToken']),
    ...mapState('globalStatus', ['sign']),
    isAppEnv() {
      return this.sign === 'app'
    },
    baseImgUrl() {
      return `${baseResourceUrl}${activity2021RootFile}/concert`
    },
    posterUrl() {
      return `${this.baseImgUrl}/concertVideoPosterBg.png`
    },
    videoUrl() {
      return `${baseResourceUrl}${videoRootFile}/concert_active_video2.mp4`
    },
    shareUrl() {
      return `${process.env.VUE_APP_SERVER_URL}/livemember/2021_concert`
    },
    actorList() {
      return [this.actorOneList, this.actorTwoList]
    },
    actorOneList() {
      console.log('-base-img-url-', this.baseImgUrl)
      let list = [
        {
          zhName: '茜拉',
          enName: 'Shila Amzah',
          imgUrl: `${this.baseImgUrl}/actorBg1.png`
        },
        {
          zhName: '李佩玲',
          enName: 'Jeryl',
          imgUrl: `${this.baseImgUrl}/actorBg2.png`
        },
        {
          zhName: '菲道尔',
          enName: 'Firdhaus',
          imgUrl: `${this.baseImgUrl}/actorBg3.png`
        }
      ]
      return list
    },
    actorTwoList() {
      let list = [
        {
          zhName: '蔡恩雨',
          enName: 'Priscilla Abby',
          imgUrl: `${this.baseImgUrl}/actorBg4.png`
        },
        {
          zhName: '朱浩仁',
          enName: 'Haoren',
          imgUrl: `${this.baseImgUrl}/actorBg5.png`
        },
        {
          zhName: '黄隽贤',
          enName: 'Sammicci',
          imgUrl: `${this.baseImgUrl}/actorBg6.png`
        },
        {
          zhName: '刘雨妮',
          enName: 'Veny',
          imgUrl: `${this.baseImgUrl}/actorBg7.png`
        }
      ]
      return list
    }
  },
  components: { headerBar, videoPlay, envMask },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 500)
  },
  mounted() {
    // console.log('-video-url-', this.videoUrl)
    console.log('-poster-url-', this.posterUrl)
  },
  methods: {
    onShare() {
      let title = '无线梦想音乐演唱会，期待你的光临！'
      let desc = '演唱会即将开始了，赶快来购票吧！'
      let url = `${this.shareUrl}?sign=h5`
      const params = {
        title,
        desc,
        url,
        image: `${baseResourceUrl}/concertShareIcon.jpg`,
        type: 4
      }
      // console.log('-params-', params)
      openNative.goShare(params)
    },
    onBuy() {
      if (this.isAppEnv) {
        this.$router.push({ name: 'ConcertConfirmOrder', query: { price: 200 } })
        return
      }
      // h5外链环境
      if (platform.isWechat) {
        this.isMask = true
        return
      }
      this.clickEventFunc()
    },

    toastFunc(message, duration = 2000) {
      this.$toast({
        message,
        duration,
        getContainer: '.concert'
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/concert/';
@main-fz: #c4c3cf;

.concert {
  background: #12111f;
  font-size: 12px;
  color: #fff;

  /deep/ .van-toast {
    color: #000;
  }

  /deep/ .van-toast--text {
    background: #fff;
  }

  /deep/ .header {
    .header-global {
      background: #12111f;
      color: #fff;

      .right {
        right: 13px;
      }
    }
  }

  .shareIcon {
    width: 18px;
    height: 18px;
    background: url('@{imgUrl}icon-share.png') no-repeat center / cover;
  }

  .main {
    padding: 15px 15px 0;
  }

  .footerWrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #2c2b3d;
    padding: 10px 15px;

    .buyBtn {
      width: 100%;
      background: #fc3b52;
      font-size: 18px;
      line-height: 44px;
      text-align: center;
      border-radius: 44px;
    }
  }
}

.videoWrap {
  overflow: hidden;
  width: 100%;
  // width: 345px;
  // height: 211px;
  background: #ccc;
  border-radius: 16px;
}

.groupWrap {
  border-bottom: 1px solid #2c2b3d;

  &.baseInfoWrap {
    padding-bottom: 11px;

    .title {
      display: flex;
      justify-content: space-between;
      font-size: 21px;
      padding-top: 25px;

      .price {
        color: #fc3b52;
      }
    }
  }

  &.descWrap {
    padding-bottom: 21px;
  }

  &.noticeWrap {
    // 35 + 65
    padding-bottom: 100px;
  }

  .title {
    font-size: 18px;
    padding: 20px 0 15px 0;
  }

  .txt {
    color: @main-fz;
    line-height: 20px;
    margin-bottom: 11px;

    &:last-child {
      margin-bottom: 0;
    }

    span {
      display: block;
    }
  }
}

.groupBox {
  display: flex;
  padding-bottom: 28px;

  &:last-child {
    padding-bottom: 25px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    margin-right: 9px;

    &:last-child {
      margin-right: 0;
    }

    .itemImg {
      width: 100%;
      border-radius: 5px;
    }

    .zhName {
      font-size: 14px;
      padding: 10px 0 7px 0;
    }

    .enName {
      font-size: 12px;
      color: @main-fz;
    }
  }
}
</style>
