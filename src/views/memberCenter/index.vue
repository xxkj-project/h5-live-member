<!-- 
  直播会员系统首页
 -->
<template>
  <div class="index">
    <headerBar
      :onBack="onBack"
      :isHighColor="false"
      arrowsType="white"
      background="#161513"
      titleColor="#fff"
    ></headerBar>
    <div class="main">
      <div class="topBg">
        <div class="headInfoBox">
          <div class="headIconImg">
            <img class="" :src="userInfo.smallpic" alt="" />
          </div>
          <p class="userName">{{ userInfo.myname }}</p>
        </div>
      </div>
      <div class="content">
        <div class="contentBox">
          <div class="userInfoWrap">
            <div class="groupBox groupOneBox">
              <p class="">TST总额</p>
              <p class="txt">{{ userInfo.tst }}</p>
              <span class="sign">≈ 0.00 CNY</span>
            </div>
            <div class="groupWrap">
              <div class="groupBox">
                <p class="">TF总额</p>
                <p class="txt">{{ userInfo.tsp }}</p>
                <span class="sign">≈ 0.00 CNY</span>
              </div>
              <div class="groupBox">
                <p class="">矿池总额</p>
                <p class="txt">{{ userInfo.tspPool }}</p>
                <span class="sign">≈ 0.00 CNY</span>
              </div>
            </div>

            <div class="btnBox">
              <span class="btn topUpBtn" @click="toTopup" v-if="!isHideTopup">充值</span>
              <span class="btn withdrawBtn" @click="toWithdraw">提现</span>
            </div>
          </div>
          <div class="memberWrap">
            <h4>会员权益</h4>
            <ul class="memberBox">
              <li @click="toJumpPage('InviteDivi')">
                <div>
                  <img src="@/assets/images/home/icon-member1.png" alt="" />
                  <p>邀请分红</p>
                </div>
              </li>
              <li @click="toJumpPage('AnchorDivi')" v-if="userInfo.anchor">
                <div>
                  <img src="@/assets/images/home/icon-member2.png" alt="" />
                  <p>主播分红</p>
                </div>
              </li>
              <li @click="toJumpPage('ExpenseMining')">
                <div>
                  <img src="@/assets/images/home/icon-member3.png" alt="" />
                  <p>消费挖矿</p>
                </div>
              </li>
              <li @click="toJumpPage('Task')">
                <div>
                  <img src="@/assets/images/home/icon-member4.png" alt="" />
                  <p>任务页</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="line"></div>
          <ul class="jumpPageBox">
            <li @click="toJumpPage('InviteCode')">
              <div>
                <span class="jumpIcon1"></span>
                <p>邀请码</p>
              </div>
              <div class="rightArrow"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import { Dialog } from 'vant'
import { mapState } from 'vuex'
import { getUserInfoData } from '@/api/member'
export default {
  name: 'Index',
  inject: ['reload'],
  data() {
    return {
      isHideTopup: false,
      isLoading: false,
      userInfo: {}
    }
  },
  computed: {
    isProdEnv() {
      return process.env.VUE_APP_SERVER_ENV == 'prod'
    },
    ...mapState('globalStatus', ['channelId', 'loadErrorCount'])
  },
  created() {
    // TODO: 缺少一个用户是否已经实名认证的标识
    console.log('更新：2021-05-06', '-env-', process.env.NODE_ENV)
    this.getData()
  },
  mounted() {
    this.isHideTopup = this.channelId === 'android_google'
  },
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    toTopup() {
      this.$router.push({ name: 'Recharge' })
    },
    toWithdraw() {
      this.$router.push({ name: 'Withdraw' })
    },
    toJumpPage(item) {
      // console.log(item)
      this.isLoading = true
      setTimeout(() => {
        this.$router.push({ name: item })
        this.isLoading = false
      }, 500)
    },
    getData() {
      this.$loading.show()
      getUserInfoData()
        .then(res => {
          this.$loading.hide()
          this.userInfo = res.data
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          this.$store.commit('user/userInfo', this.userInfo)
          // console.log('-userinfo-data-', this.userInfo)
        })
        .catch(error => {
          this.$loading.hide()
          this.handleErrorRes(error)
        })
    },
    // 请求失败/超时
    handleErrorRes(error) {
      Dialog.confirm({
        title: '服务器开小差了!',
        message: error.message,
        cancelButtonText: '返回',
        confirmButtonText: '重新加载'
      })
        .then(() => {
          this.$store.commit('globalStatus/setLoadErrorCount')
          // console.log('-load-count-', this.loadErrorCount)
          if (this.loadErrorCount > 3) {
            this.$toast({
              message: '服务器开小差了，请稍后再重试!',
              onClose: () => {
                openNative.closeWebview()
              }
            })
            return
          }
          this.reload() // 刷新当前页
        })
        .catch(() => {
          openNative.closeWebview()
        })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/images/home/';

.index {
  /deep/ .headerLine {
    background: #fff;
  }
  /deep/ .header-global {
    background: linear-gradient(-45deg, #20222f, #151826);
  }
}

.index {
  height: 100%;
  background: #f5f7f9;

  .main {
    .topBg {
      width: 100%;
      height: 115px;
      background: linear-gradient(-45deg, #20222f, #151826);
    }
    .content {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 15px 0 50px;

      .contentBox {
        position: absolute;
        top: -55px;
      }
    }
  }
}

.topBg {
  padding: 10px 0 0 13px;
  .headInfoBox {
    display: flex;
    align-items: center;

    .headIconImg {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 7px;

      img {
        width: 100%;
      }
    }

    .userName {
      font-size: 18px;
      color: #fff;
    }
  }
}

.userInfoWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 349px;
  height: 245px;
  background: url('@{imgUrl}mainBg.png') no-repeat center;
  background-size: cover;
  color: #462500;
  margin-bottom: 6px;
  padding: 26px 19px 24px;

  .groupOneBox {
    margin-bottom: 10px;

    .txt {
      display: inline-block;
      margin-right: 6px;
    }
  }

  .groupBox {
    font-size: 14px;
    padding-left: 12px;

    .txt {
      font-size: 35px;
      font-weight: 600;
    }
    .sign {
      color: #b47f2c;
    }
  }

  .groupWrap {
    display: flex;

    .groupBox {
      width: 50%;
      &:first-child {
        margin-right: 6%;
      }
      .txt {
        font-size: 20px;
        line-height: 32px;
      }
      .sign {
        font-size: 12px;
      }
    }
  }

  .btnBox {
    display: flex;
    justify-content: space-between;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      // width: 143px;
      width: 50%;
      height: 36px;
      font-size: 16px;
      font-weight: 600;
      color: #462500;
      border-radius: 36px;

      &.topUpBtn {
        margin-right: 6%;
        border: 1px solid #b47f2c;
      }

      &.withdrawBtn {
        background: #fff9e0;
      }
    }
  }
}

.memberWrap {
  background: #fff;
  border-radius: 10px;
  padding: 15px 0;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #191919;
    line-height: 16px;
    padding: 0 0 20px 13px;
  }
  .memberBox {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    li {
      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          height: 29px;
          margin-bottom: 9px;
        }

        p {
          font-size: 12px;
          line-height: 12px;
          color: #666;
        }
      }
    }
  }
}

.line {
  width: 100%;
  height: 10px;
  background: #f6f6f6;
}

.jumpPageBox {
  background: #fff;
  border-radius: 10px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    line-height: 55px;
    padding: 0 13px 0 11px;
    div {
      display: flex;
      align-items: center;
      span {
        width: 20px;
        height: 20px;
        margin-right: 11px;
      }
    }
    .rightArrow {
      width: 10px;
      height: 12px;
      background: url('@{imgUrl}blackRightArrow.png') no-repeat center / cover;
    }
    .jumpIcon1 {
      background: url('@{imgUrl}icon-other1.png') no-repeat center / cover;
    }
  }
}
</style>
