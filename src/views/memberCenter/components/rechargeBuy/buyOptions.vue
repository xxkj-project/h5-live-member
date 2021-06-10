<!-- 
   购买选择
-->
<template>
  <div class="buy-options">
    <ul class="listWrap">
      <li class="itemWrap" v-for="(item, index) in list" :key="index">
        <div class="item" :class="{ activeItem: selIndex === index }" @click="onSelItem(item, index)">
          <template v-if="item.number > 0">
            <div class="itemTop">
              <p class="changePrice">{{ item.number }}</p>
              <span class="icon">TST</span>
            </div>
            <p class="price"><span class="rmb">￥</span>{{ item.price }}</p>
          </template>

          <template v-else>
            <p class="">自定义</p>
          </template>

          <div class="tagWrap" v-if="item.reward">
            <p class="tagPrice">奖励{{ item.reward }}</p>
            <span class="tagIcon">TST</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      selIndex: 0
    }
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
  methods: {
    onSelItem(item, index) {
      console.log('-item-', item, index)
      this.selIndex = index
      this.$emit('change', index)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.listWrap {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 92px 15px 5px;
  margin-bottom: 10px;

  .itemWrap {
    width: 50%;
    margin-bottom: 21px;

    &:nth-child(2n + 1) {
      padding-right: 10px;
    }

    &:nth-child(2n) {
      padding-left: 10px;
    }
  }

  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    background: #f7f7f7;
    border-radius: 12px;

    &.activeItem {
      background: #ffd12f;

      .price {
        color: #171717;
      }

      .tagWrap {
        background: rgba(255, 255, 255, 0.5);
      }
    }

    .itemTop {
      display: flex;

      .icon {
        display: flex;
        align-items: flex-end;
        font-size: 12px;
        // line-height: 24px;
        // width: 17px;
        // height: 17px;
        // background: url('@{imgUrl}icon-money-middle.png') no-repeat center;
        // background-size: 100% 100%;
      }
    }

    .changePrice {
      display: flex;
      align-items: flex-end;
      font-size: 24px;
      line-height: 20px;
      margin-right: 3px;
    }

    .price {
      font-size: 14px;
      color: #999;
      padding-top: 13px;

      .rmb {
        font-size: 12px;
      }
    }

    .tagWrap {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      height: 20px;
      background: #ffd12f;
      font-size: 12px;
      padding: 0 6px 0 12px;
      border-radius: 0 12px 0 12px;

      .tagIcon {
        font-size: 10px;
        // width: 12px;
        // height: 12px;
        // background: url('@{imgUrl}icon-money-small.png') no-repeat center;
        // background-size: 100% 100%;
        margin-left: 3px;
      }
    }
  }
}
</style>
