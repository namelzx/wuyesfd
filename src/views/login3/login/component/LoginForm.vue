<template>
  <div class="data-from">
    <!-- 左侧文字 -->
    <div class="ad-title">
      <div class="items">
        <h3>缴费宝</h3>
        <!-- <p>收费端</p> -->
        <!-- <p>产品爆款，云主机低至190元/年</p>
        <p>释放科技红利，助力普惠上云</p> -->
      </div>
    </div>
    <!-- 右侧登录框 -->
    <div class="ad-content">
      <div class="form-container">
        <h3 class="login-title">密码登录</h3>
        <!-- 表单 -->
        <div class="form-item">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="邮箱/用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item class="submit-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 忘记密码/忘记用户名/注册-->
        <div class="details">
          <router-link tag="span" v-for="item of details" :key="item.id" :to="item.path">
            {{ item.name }}
          </router-link>
        </div>
        <!-- 其他登录 -->
        <div class="company-logo">
          <span>其他方式登录：</span>
          <!-- <img src="@/assets/image/tb.png" alt="">
          <img src="@/assets/image/1688.png" alt="">
          <img src="@/assets/image/alipay.svg" alt="">
          <img src="@/assets/image/dingtalk.svg" alt="">
          <img src="@/assets/image/weibo.svg" alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginForm",
    data(){
      return{
      }
    },
    props:{
      ruleForm:{
        type: Object
      },
      rules:{
        type: Object
      },
      details:{
        type: Array
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 逻辑代码
              this.$store.dispatch('LoginByUsername', this.ruleForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .ad-content >>> .el-button.el-button--primary {
    width: 100%;
    background-color: #00c1de;
    border-color: #00c1de;
  }

  .data-from {
    width: 100%;
    height: 568px;
    background: url(../../../assets/image/bg.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
  }

  .ad-title {
    color: #fff;
  }

  .ad-title, .ad-content {
    position: relative;
    width: 50%;
  }

  .ad-title .items {
    position: absolute;
    top: 25%;
    left: 20%;
  }

  .ad-title .items h3 {
    font-size: 30px;
  }

  .ad-title .items p {
    font-size: 14px;
    font-weight: 200;
  }

  .form-container {
    background-color: #fff;
    width: 56%;
    position: absolute;
    top: 20%;
    left: 20%;
    padding: 0 10px 50px;
  }

  .form-container h3.login-title {
    padding-left: 15px;
    font-weight: 400;
    font-size: 18px;
  }

  .form-item {
    padding: 10px 15px;
  }

  .submit-btn {
    margin-bottom: 10px;
  }

  .details {
    text-align: right;
    padding: 0 14px;
    color: #999;
    font-size: 12px;
  }

  .details span {
    margin: 0 2px;
  }

  .details span:hover {
    color: #333;
    cursor: pointer;
  }

  .company-logo {
    display: inline-block;
    margin-top: 25px;
    padding-left: 15px;
  }

  .company-logo span {
    color: #333;
    font-size: 12px;
  }

  .company-logo img {
    width: 6%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    vertical-align: text-bottom;
    margin: 0 2px;
  }
  .company-logo img:hover {
    cursor: pointer;
  }
</style>
