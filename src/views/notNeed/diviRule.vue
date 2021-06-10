<!-- 
   分红规则(主播/用户)
-->
<template>
  <div class="diviRule">
    <headerBar background="#ffd347"></headerBar>
    <div class="main">
      <div class="ruleBox anchorRuleBg" v-if="ruleType == 'anchor'">
        <div class="ruleContent">
          <p>用户打赏主播后，上级主播获得分成；</p>
          <p>主播同时可以邀请用户，享受用户的分红比例；</p>
          <p>主播分销权限需要设置，并且满足一定条件；</p>
          <table class="tab" cellspacing="0" cellpadding="0">
            <tr v-for="(item, index) in anchorRules" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.oneTypeNum }}</td>
              <td>{{ item.twoTypeNum }}</td>
              <td>{{ item.threeTypeNum }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="ruleBox inviteRuleBg" v-else>
        <div class="ruleContent">
          <p>消费分成：用户消费TST，领导获得消费的分成;</p>
          <p>邀请有效人数：直邀并且满足消费 D=100 TST;</p>
          <table class="tab" cellspacing="0" cellpadding="0">
            <tr v-for="(item, index) in inviteRules" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.oneTypeNum }}</td>
              <td>{{ item.twoTypeNum }}</td>
              <td>{{ item.threeTypeNum }}</td>
              <td>{{ item.fourTypeNum }}</td>
              <td>{{ item.fiveTypeNum }}</td>
            </tr>
          </table>
        </div>
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
      // 规则类型 ==》anchor主播；invite邀请
      ruleType: '',
      anchorRules: [
        { title: '人数', oneTypeNum: '1', twoTypeNum: '2', threeTypeNum: '3' },
        { title: '代数', oneTypeNum: '1', twoTypeNum: '2', threeTypeNum: '3' },
        { title: '分成', oneTypeNum: '10%', twoTypeNum: '5%', threeTypeNum: '2%' }
      ],
      inviteRules: [
        {
          title: '邀请有效人数',
          oneTypeNum: '1',
          twoTypeNum: '2',
          threeTypeNum: '3',
          fourTypeNum: '4',
          fiveTypeNum: '5'
        },
        {
          title: '代数',
          oneTypeNum: '1',
          twoTypeNum: '2',
          threeTypeNum: '3',
          fourTypeNum: '4',
          fiveTypeNum: '5'
        },
        {
          title: '分成',
          oneTypeNum: '10%',
          twoTypeNum: '5%',
          threeTypeNum: '2%',
          fourTypeNum: '2%',
          fiveTypeNum: '1%'
        }
      ]
    }
  },
  created() {
    this.ruleType = this.$route.query.ruleType
  },
  mounted() {},
  computed: {},
  methods: {},
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/';

.diviRule {
  /deep/ .header-global {
    background: #ffd347;
  }
}

.diviRule {
}
.main {
  padding: 15px 15px 0;
  .ruleBox {
    width: 345px;
    padding: 7.5px;
    .ruleContent {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 6px;
      font-size: 14px;
      color: #000;
      padding: 22px 13.5px 0 16px;
      p {
        padding-bottom: 14px;
      }
    }
  }
}

// table表格
.tab {
  width: 300px;
  // height: 107px;
  text-align: center;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px #000;
  tr {
    height: 35px;
    line-height: 35px;
  }
  tr td {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  tr td:first-child {
    border-left: 1px solid #000;
  }
  tr:first-child td {
    border-top: 1px solid #000;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 5px;
  }
  tr:first-child td:last-child {
    border-top-right-radius: 5px;
  }
  tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }
}
.anchorRuleBg {
  height: 250px;
  background: url('@{imgUrl}anchorRuleBg.png') no-repeat center / cover;
}
.inviteRuleBg {
  height: 225px;
  background: url('@{imgUrl}inviteRuleBg.png') no-repeat center / cover;
}
</style>
