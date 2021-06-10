<!-- 
   平台介绍
-->
<template>
  <div class="platform">
    <headerBar :onBack="onBack"></headerBar>
    <h3>
      唐僧直播平台介绍
    </h3>
    <p>
      唐僧直播是国内首个采用区块链+直播形式的分布式价值视频共享平台，以社区化自治的方式实现实时分容分享、社交和圈子的建立，以公平价值认可及价值分配制，帮助主播实现和用户的直接链接，减少第三方中间平台的参与，建立全新价值分配体系，以资金反馈乘数效应和多维度挖矿的机制，使每个用户能够体验实时的消费权益分红，将用户创造的商业价值，逐步回归给每个用户，只要消费行为产生即可参与挖矿；
    </p>
    <p>
      唐僧直播革新了传统直播的消费模式，以区块链技术重构直播领域的用户生态，形成围绕平台核心价值的新体系，改革经济理论、算法创新、价值分配的“直播三元悖论”；唐僧直播将绝大部分利润回归用户本身，只有极少部分用于平台运营推广运维，这种“强势性”分成比例是所有直播行业史无前例的，唐僧直播以主播和用户为核心，确保所有参与者的付出与回报都是公平、合理、以及不受剥削的。在公平公正的交换体系上，将激发主播的创造力，从中可以分享更多有趣和有价值的内容。
    </p>
    <p>
      唐僧直播不仅仅是主播的大秀场，更有着颠覆传统直播平台的商业模式，通过建立自组织协作和价值护城河的方式，以短视频和直播的双向引流、双向转化机制，快速打造大数据、大流量的直播平台，为平台用户带来前所未有的权益交换新体系。
    </p>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import loadingAniMixins from '@/mixins/loadingAni'
export default {
  name: '',
  mixins: [loadingAniMixins],
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    onBack() {
      openNative.closeWebview()
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.platform {
  font-size: 16px;
  color: #000;
}
h3 {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 12px 0 20px;
}
.platform p {
  text-indent: 2em;
  line-height: 24px;
  padding: 0 16px 20px;
}
</style>
