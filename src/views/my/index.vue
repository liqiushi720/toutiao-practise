<template>

  <div class="my-container">
    <!--已登录-->
    <div v-if="user"  class="user-info header">
      <!--      用户信息-->
      <div class="base-user">
        <div class="left">
          <van-image
            class="avator"
            round

            :src="userInfo.photo"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <!--      用户统计-->
      <div class="status">
        <div class="status-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="status-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="status-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="status-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>

    </div>
    <!--未登录-->
    <div v-else  class="header not-login">
      <div class="login-btn">
        <img class="mobile-img" src="@/assets/mobile.png" alt="">
        <span class="text" @click="$router.push('/login')">登录&nbsp;/&nbsp;注册</span>
      </div>
    </div>
    <!--宫格-->
    <van-grid class="grid" clickable :column-num="2">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang shoucang"></i>
        <span slot="text" class="text"> 收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi lishi"></i>
        <span slot="text" class="text"> 历史</span>
      </van-grid-item>

    </van-grid>
    <!--单元格导航-->
    <van-cell-group>
      <van-cell title="消息通知" is-link/>
      <van-cell class="mb-9" title="小智同学" is-link/>
      <van-cell @click="onLogout"  v-if="user" title="退出登录" class="logout-cell" clickable/>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'myIndex',
  components: {

  },
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // 2.3 成功赋值
        this.userInfo = data.data
      } catch (err) {
        // 2.4 错误处理
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    ...mapMutations(['removeItems']),
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗?'
        // message: '弹窗内容'
      })
        .then(() => {
          // on confirm
          // this.$router.push('/login')
          this.removeItems(this.user)
          // this.$router.push('/login')
          // this.$store.commit('setUser', null)
        })

        .catch(() => {
          // on cancel
          console.log('??')
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {

  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
    // 图片的覆盖样式还的必须得再url之后
  }

  //未登录状态
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .mobile-img {
      height: 132px;
      width: 132px;
      margin-bottom: 15px;
    }

    .text {
      font-size: 28px;
      color: #ffffff;
    }
  }

  //登录状态
  .user-info {
    //这是上面一个盒子
    .base-user {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        //justify-content: center;
        align-items: center;

        .avator {
          height: 132px;
          width: 132px;
          border: 3px solid #fff;
          margin-right: 22px;
          //margin-bottom: 23px;
        }

        .name {
          color: #fff;
          font-size: 30px;
        }
      }

    }

    //这是下面的一个盒子
    .status {
      display: flex;

      .status-item {
        flex: 1;
        height: 130px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  //宫格导航
  .grid {
    height: 141px;

    .grid-item {
      .shoucang {
        color: red;
      }

      .lishi {
        color: orange;
      }

      .toutiao {
        font-size: 45px;
      }

      .text {
        font-size: 27px;
      }
    }
  }

  //单元格导航
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
