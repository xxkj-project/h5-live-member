<!-- 
   提现
-->
<template>
  <div class="withdraw">
    <headerBar />
    <div class="main">
      <div class="formBox">
        <van-form @submit="onSubmit">
          <div class="itemBox">
            <p class="title">提现信息</p>
            <van-field class="currencyBox" name="coin" label="提现币种" :label-width="labelWidth">
              <template #input>
                <van-radio-group v-model="formData.coin" direction="horizontal" @change="onChangeCoin">
                  <van-radio :name="item" v-for="item in coinList" :key="item">{{ item }}</van-radio>
                </van-radio-group>
              </template>
            </van-field>

            <van-field
              v-model="formData.address"
              name="address"
              label="提现地址"
              placeholder="请输入提现地址"
              :label-width="labelWidth"
              clearable
            >
              <template #button>
                <span class="scanCode" @click="onScan"></span>
              </template>
            </van-field>
          </div>

          <div class="addressExplainBox itemBox">
            <p>请确认使用的地址支持TF或TST收款，否则会丢失，且无法找回</p>
          </div>

          <div class="line"></div>

          <div class="itemBox">
            <p class="title">提现金额</p>
            <van-field
              v-model="formData.amount"
              type="number"
              name="amount"
              placeholder="请输入数量"
              :label-width="0"
              clearable
              @focus="handleAmountFocus"
              @blur="handleAmountBlur"
              @clear="handleAmountClear"
            >
              <template #button>
                <span class="allBtn" @click="onAll">全部</span>
              </template>
            </van-field>
          </div>

          <div class="explainBox">
            <div class="txtBox" v-show="!isBlur">
              <p>可用 {{ currency }} {{ withdrawMax }}</p>
              <p>不可用 {{ currency }} {{ freezeNum }}</p>
            </div>
            <div class="txtBox" v-show="isBlur">
              <p>实际到账 {{ currency }} {{ realAmount }}</p>
              <p>手续费 {{ currency }} {{ serviceFee }}</p>
            </div>
          </div>

          <div class="bottomWrap">
            <p>提现到账状态请到【我的】-【充提记录】中查看</p>
            <div class="submitBox">
              <van-button class="submitBtn" block type="info" native-type="submit">
                立即提现
              </van-button>
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar/headerBar'
import openNative from '@/utils/openNative'
import jsEventManager from '@/utils/jsEventManager'
import jsPrecision from '@/utils/jsPrecision'
import { getConfigInfo } from '@/api/common'
import { getWithdrawInfo, applyWithdraw } from '@/api/pay'
import { withdrawAuthObj } from '@/const/global'
export default {
  name: 'Withdraw',
  data() {
    return {
      isBlur: false,
      currency: 'TF',
      formData: {
        coin: 'TF',
        address: '',
        amount: ''
      },
      configList: [],
      infoData: {},
      coinList: ['TF', 'TST'],
      pageHeight: '667px'
    }
  },
  computed: {
    labelWidth() {
      return 80 / 37.5 + 'rem'
    },
    serviceFee() {
      let key = this.currency === 'TF' ? 'tfMinFee' : 'tstMinFee'
      const result = this.configList.filter(val => val.name === key)[0]
      return result ? result.data : 0
    },
    withdrawMax() {
      let max = this.currency === 'TF' ? this.infoData.tfCan : this.infoData.tstCan
      const result = max <= this.serviceFee ? 0 : max
      return result || 0
    },
    freezeNum() {
      const result = this.currency === 'TF' ? this.infoData.tfNot : this.infoData.tstNot
      return result || 0
    },
    realAmount() {
      const result = jsPrecision.sub(this.formData.amount, this.serviceFee)
      console.log('-real-amount-', result)
      return result <= 0 ? 0 : result
    }
  },
  filters: {
    decimal(val, num = 4) {
      let result = 0
      let fPoint = val.toString().split('.')[1] // 小数后的位数
      // result = fPoint && fPoint.length > num ? (+val).toFixed(num) : val // 四舍五入
      result = fPoint && fPoint.length > num ? parseInt(val * Math.pow(10, num)) / Math.pow(10, num) : val // 直接舍弃多余的小数位
      return result
    }
  },
  created() {
    this.pageHeight = window.innerHeight + 'px'
    this.getData()
  },
  mounted() {
    jsEventManager.addEvent('scanSuccess', this.handleScanResult)
  },
  methods: {
    handleScanResult(data) {
      this.formData.address = data
    },
    // 初始化可提现数量
    initForm(curr = '') {
      this.formData.amount = curr
    },
    // 改变提现币种
    onChangeCoin(type) {
      // console.log('-type-', type)
      this.currency = type
      this.isBlur = false
      this.initForm()
    },
    onScan() {
      openNative.scanCode()
    },
    // 全部
    onAll() {
      // console.log('-all-amount-', this.withdrawMax)
      this.formData.amount = this.withdrawMax + ''
      this.handleAmountBlur()
    },
    handleAmountFocus() {
      this.isBlur = true
    },
    handleAmountBlur() {
      const { amount } = this.formData
      if (!amount) {
        this.isBlur = false
        return
      }
      this.isBlur = true
      let curr = this.$options.filters['decimal'](amount)
      this.initForm(curr)
    },
    handleAmountClear() {
      this.initForm()
    },
    onSubmit(data) {
      this.validateFunc(data, () => {
        // 验证是否实名认证
        this.$dialog
          .confirm({
            message: '申请提交后，请等待审核',
            beforeClose: (action, done) => {
              if (action != 'confirm') {
                done()
                return
              }
              setTimeout(() => {
                this.submitReq()
                done()
              }, 1000)
            }
          })
          .catch(action => {})
      })
    },
    validateFunc(data, callback) {
      console.log('-data-', data)
      if (!data.address) {
        this.$toast('请输入有效提现地址！')
        return
      }
      if (!data.amount || data.amount == 0) {
        this.$toast('请输入提现数量！')
        return
      }
      if (+data.amount <= this.serviceFee) {
        this.$toast('提现数量不得低于或等于手续费！')
        return
      }
      if (+data.amount > +this.withdrawMax) {
        this.$toast('可提现数量不足')
        return
      }
      callback()
    },
    async getData() {
      this.$loading.show()
      try {
        const withdrawData = await getWithdrawInfo()
        const configData = await getConfigInfo()
        this.$loading.hide()
        let keys = ['tfMinFee', 'tstMinFee']
        this.configList = configData.data.filter(val => keys.includes(val.name))
        this.infoData = withdrawData.data
        // console.log('-init-data-', this.infoData, this.configList)
        this.initForm()
      } catch (err) {
        this.$loading.hide()
      }
    },
    submitReq() {
      const params = { ...this.formData }
      // console.log('-params-', params)
      applyWithdraw(params)
        .then(res => {
          this.$toast({
            message: '订单已提交等待审核！',
            duration: 1000,
            onClose: () => {
              this.$router.push({ name: 'WithdrawResult' })
            }
          })
        })
        .catch(err => {
          this.submitErrorFunc(err.code)
        })
    },
    submitErrorFunc(code) {
      console.log('-code-', code, withdrawAuthObj[code])
      let { message, btnTxt } = withdrawAuthObj[code]
      this.$dialog
        .alert({
          message,
          confirmButtonText: btnTxt,
          closeOnClickOverlay: true
        })
        .then(() => {
          btnTxt == '去认证' && openNative.openNativePage(1)
        })
        .catch(() => {})
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/withdraw/';
/deep/ .van-cell {
  padding: 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/deep/ .van-field {
  height: 45px;
  border-bottom: 1px solid #dddee6;

  .van-field__label {
    margin-right: 0;
  }
}

.withdraw {
  width: 100%;
  height: 100%;
  background: #f5f7f9;
  -webkit-overflow-scrolling: touch;

  .main {
    background: #fff;
    font-size: 15px;
    color: #191919;
  }
}
.formBox {
  .itemBox {
    padding: 19px 13px 0;

    .currencyBox {
      /deep/ .van-field__control--custom {
        justify-content: flex-end;
      }
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      padding-bottom: 21px;
    }

    .scanCode {
      display: block;
      width: 18px;
      height: 18px;
      background: url('@{imgUrl}icon-scan.png') no-repeat center / cover;
    }

    .allBtn {
      font-size: 16px;
      color: #108ee9;
      box-shadow: border-box;
    }

    /deep/ .van-field__button {
      display: flex;
    }
  }

  .explainBox {
    line-height: 44px;
    font-size: 14px;
    color: #666;
    padding: 0 13px;

    .txtBox {
      display: flex;

      p {
        margin-right: 20px;
      }
    }
  }

  .addressExplainBox {
    font-size: 12px;
    color: #a1a2a6;
    padding: 10px 13px 15px;
  }

  .line {
    width: 100%;
    height: 5px;
    background: #f5f7f9;
  }

  .bottomWrap {
    background: #f5f7f9;
    font-size: 12px;
    color: #a1a2a6;
    padding: 10px 13px 0;

    .submitBox {
      padding-top: 35px;
      .submitBtn {
        background: #ffd200;
        font-size: 16px;
        font-weight: 600;
        color: #000;
        border: none;
        border-radius: 6px;
      }
    }
  }
}
</style>
