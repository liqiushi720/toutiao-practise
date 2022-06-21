<template>

  <div class="login-container">
    <!--导航栏-->
    <van-nav-bar title="登录" class="page-nav">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!--表单组件-->
    <van-form @submit="onSubmit" ref="loginFromDate">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model='mobile'
        :rules="userRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="code"
        :rules="userRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!--倒计时的组件-->
          <van-count-down @finish="isCountDownShow=false" :time="1000*3" format="ss s" v-if="isCountDownShow"/>
          <!--发送验证码按钮-->
          <van-button v-else @click="btnSend" class="btn-login-send" round size="small" type="default"
                      native-type="button">获取验证码
          </van-button>
        </template>

      </van-field>

      <!--登录提交的表单-->
      <div class="btn-login-wrap">
        <van-button class="btn-login-submit" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import { loginAPI, sendAPI } from '@/api/login'

export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data () {
    return {
      isCountDownShow: false,
      mobile: '',
      code: '',
      userRules: {
        mobile: [{
          require: true,
          message: '请输入手机号'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式不正确'
        }],
        code: [{
          require: true,
          message: '请输入手机号'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码的格式不正确'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    // 表单提交方法
    async onSubmit (values) {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const { data } = await loginAPI(values)
        console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (e) {
        if (e.response.status === 400) {
          console.log('验证码不对')
          this.$toast.fail('验证码不对')
        }
      }
    },
    // 验证码发送方法
    async btnSend () {
      try {
        await this.$refs.loginFromDate.validate('mobile')
      } catch (e) {
        return this.$toast.fail('发送验证码失败')
      }

      this.isCountDownShow = true

      try {
        await sendAPI(this.mobile)
        this.$toast('验证码发送成功')
      } catch (e) {
        this.isCountDownShow = false
        if (e.response.status === 429) {
          this.$toast('发送太尼玛频繁了,请稍后重试')
        } else {
          this.$toast.fail('发送验证码失败l')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  /deep/ .van-field__button {
    padding-left: 20px;
    border-left: 2px solid #eeeeee;

    .btn-login-send {
      height: 46px;
      width: 160px;
      line-height: 46px;
      background-color: #ededed;
      //margin-left: 20px!important;
      //border-left: 2px solid #eeeeee;
    }

  }

  /deep/ .btn-login-wrap {
    padding: 53px 28px;

    .btn-login-submit {
      color: #fff;
      background-color: #6db4fb;
    }
  }
}

</style>
