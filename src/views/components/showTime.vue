<template>
  <div class="showTime">
    <van-datetime-picker
      v-show="isShow"
      v-model="currentDate"
      type="year-month"
      title="选择时间"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="onAffirm"
      @cancel="isShow = false"
    />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    //确认
    onAffirm(value) {
      console.log(value)
      this.isShow = false
    },

    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    }
  }
}
</script>
<style lang="less" scoped>
//@importurl();引入公共css类
.showTime {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
