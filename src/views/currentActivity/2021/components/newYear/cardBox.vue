<!--
 * @Author: wangshengxian
 * @Date: 2021-01-23 14:04:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-28 16:00:53
 * @Desc: 
-->
<template>
  <div class="card">
    <ul class="cardBox cardInitAni">
      <li class="item" v-for="(item, index) in list" :key="index">
        <span class="cardBg" :class="item.value > 0 ? 'card_' + index : 'card_not_' + index"></span>
        <span class="count" v-if="item.value">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/currentActivity/newYearShare/main/';

.cardInitAni {
  .item {
    animation: initAni 1.5s;
  }
}

@keyframes initAni {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.cardStatusOneAni {
  .item {
    animation: statusOneAni 2s;
  }
}

@keyframes statusOneAni {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

.cartStatusTwoAni {
  .cardItem {
    animation: statusTwoAni 2s;
  }
}

@keyframes statusTwoAni {
  0% {
    opacity: 0;
    // transform: scale(0);
  }
  100% {
    opacity: 1;
    // transform: scale(1);
  }
}

.cardBox {
  display: flex;
  flex-wrap: wrap;
  padding: 21px 8px 0px;
  // padding: 21px 12px 0px;

  .item {
    position: relative;
    display: flex;
    justify-content: center;
    width: 20%;
    margin-bottom: 10px;

    .count {
      position: absolute;
      top: -7px;
      right: -7px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      background: #ce142a;
      color: #ffcdc9;
      font-size: 22px;
      border-radius: 50%;
      transform: scale(0.5);
      border: 2px solid #ffcdc9;
    }

    .cardBg {
      width: 57px;
      height: 90px;
    }

    .card_not_0 {
      background: url('@{imgUrl}icon-not-words1.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_1 {
      background: url('@{imgUrl}icon-not-words2.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_2 {
      background: url('@{imgUrl}icon-not-words3.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_3 {
      background: url('@{imgUrl}icon-not-words4.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_4 {
      background: url('@{imgUrl}icon-not-words5.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_5 {
      background: url('@{imgUrl}icon-not-words6.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_6 {
      background: url('@{imgUrl}icon-not-words7.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_7 {
      background: url('@{imgUrl}icon-not-words8.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_8 {
      background: url('@{imgUrl}icon-not-words9.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_not_9 {
      background: url('@{imgUrl}icon-not-words10.png') no-repeat center;
      background-size: 100% 100%;
    }

    .card_0 {
      background: url('@{imgUrl}icon-words1.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_1 {
      background: url('@{imgUrl}icon-words2.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_2 {
      background: url('@{imgUrl}icon-words3.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_3 {
      background: url('@{imgUrl}icon-words4.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_4 {
      background: url('@{imgUrl}icon-words5.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_5 {
      background: url('@{imgUrl}icon-words6.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_6 {
      background: url('@{imgUrl}icon-words7.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_7 {
      background: url('@{imgUrl}icon-words8.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_8 {
      background: url('@{imgUrl}icon-words9.png') no-repeat center;
      background-size: 100% 100%;
    }
    .card_9 {
      background: url('@{imgUrl}icon-words10.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
