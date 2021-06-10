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
              <span class="icon"></span>
              <p class="changePrice">{{ item.number }}</p>
            </div>
            <p class="price">{{ item.price }}元</p>
            <div class="tagWrap" v-if="item.reward">
              <p class="tagPrice">奖励{{ item.reward }}</p>
              <span class="tagIcon"></span>
            </div>
          </template>

          <template v-else>
            <p class="">自定义</p>
          </template>
          <span class="actIcon"></span>
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
@imgUrl: '~@/assets/images/myWallet/';
.listWrap {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 18px 13px 0;

  .itemWrap {
    width: 50%;
    margin-bottom: 18px;

    &:nth-child(3n) {
      .item {
        margin-right: 0;
      }
    }

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
    height: 90px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #dddee6;

    &.activeItem {
      border: 1px solid #fcf200;

      .actIcon {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 19px;
        height: 15px;
        background: url('@{imgUrl}icon-active.png') no-repeat center / cover;
      }
    }

    .itemTop {
      display: flex;
      align-items: center;

      .icon {
        width: 11px;
        height: 11px;
        background: url('@{imgUrl}icon-tst-sign2.png') no-repeat center / cover;
        margin-right: 4px;
      }
    }

    .changePrice {
      font-size: 16px;
    }

    .price {
      font-size: 14px;
      color: #a1a2a6;
      padding-top: 13px;
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
      border-radius: 0 6px 0 6px;

      .tagIcon {
        width: 12px;
        height: 12px;
        background: url('@{imgUrl}icon-tst-sign2.png') no-repeat center;
        background-size: 100% 100%;
        margin-left: 3px;
      }
    }
  }
}
</style>
