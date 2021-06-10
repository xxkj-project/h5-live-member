<!-- 
   邀请码
-->
<template>
  <div class="inviteCode">
    <headerBar background="#ffd347"></headerBar>

    <div class="main">
      <div class="myCode">
        <p>我的ID</p>
        <p>{{ myId }}</p>
      </div>
      <template v-if="!isHaveInviter">
        <div class="otherCode">
          <p>请输入他人邀请ID</p>
          <!-- <van-field class="codeInput" v-model="otherId" placeholder="" label="" clearable /> -->
          <van-field class="codeInput" v-model="otherId" type="number" placeholder="" label="" clearable />
        </div>
        <div class="submit">
          <button @click="submit">提交</button>
        </div>
      </template>
      <template v-else>
        <div class="myCode">
          <p>邀请人ID</p>
          <p>{{ inviteUserId }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import { getUserInfoData, submitInviteCode } from '@/api/member'
export default {
  name: 'InviteCode',
  data() {
    return {
      isHaveInviter: false, // 是否有邀请人
      myId: '', // 我的id
      otherId: '', // 用户输入的邀请人id
      inviteUserId: '' // 邀请人id
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    submit() {
      if (this.otherId === '') {
        this.$toast('请输入邀请ID')
        return
      }
      const params = { inviteId: this.otherId }
      submitInviteCode(params).then(res => {
        this.$toast('恭喜你,提交成功啦!')
        this.getData()
      })
    },
    getData() {
      this.$loading.show()
      getUserInfoData()
        .then(res => {
          this.$loading.hide()
          const data = res.data
          this.myId = data.userId
          // console.log('-inviteUserId-', data.inviteUserId)
          if (data.inviteUserId) {
            this.isHaveInviter = true
            this.inviteUserId = data.inviteUserId
          }
        })
        .catch(error => {
          this.$loading.hide()
        })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.inviteCode {
  /deep/ .header-global {
    background: #ffd347;
  }
}
.van-cell {
  padding: 0;
}
.main {
  // font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #171717;
  padding: 20px 15px 0;
  .myCode {
    display: flex;
    margin-bottom: 20px;
    p {
      width: 86px;
      // padding-right: 20px;
    }
  }
  .otherCode {
    p {
      opacity: 0.6;
    }
    .codeInput {
      line-height: 43px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
    }
  }
  .submit {
    padding-top: 100px;
    text-align: center;
    button {
      width: 310px;
      height: 44px;
      background: linear-gradient(-45deg, #ffd461, #ffd12f);
      border-radius: 22px;
    }
  }
}
</style>
