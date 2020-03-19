<template>
  <div class="login">
    <img src="@/assets/index.png" />
    <div class="frame">
      <div class="fram-box">
        <div class="title">欢迎登录物业缴费端</div>
        <div class="import">
          <input v-model="ruleForm.username" placeholder="请输入账号/用户名" />
        </div>
        <div class="import">
          <input v-model="ruleForm.password" type="password" placeholder="请输入密码" />
        </div>
        <a>
        <div @click="submitForm()" class="save-buttom">登陆</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$store
        .dispatch("LoginByUsername", this.ruleForm)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/" });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .frame {
    width: 320px;
    height: 380px;
    background: #ffffff;
    z-index: 10;
    position: fixed;
    right: 120px;
    top: 100px;
    border-radius: 15px;
    overflow: hidden;
    .fram-box {
      margin: 30px auto;
      width: 300px;
      .title {
        text-align: center;
        font-size: 16px;
        color: #b7b7b7;
        font-weight: 400;
        margin-bottom: 50px;
        margin-top: 30px;
      }
      .import {
        width: 300px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid #f5f5f5;
        margin: 20px 0;
        margin-top: 30px;
        input {
          width: 320px;
          margin-left: 10px;
          border: 0;
          height: 40px;
          line-height: 40px;
          background: none;
          font-size: 10px;
          outline: none;
        }
        input::-webkit-input-placeholder {
          color: #c0c0c0;
        }
      }
      .code {
        display: flex;
        align-items: center;
        .code-import {
          width: 130px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #f5f5f5;
          border-radius: 20px;
          input {
            width: 115px;
            margin-left: 10px;
            border: 0;
            height: 40px;
            line-height: 40px;
            background: none;
            font-size: 10px;
            outline: none;
          }
          input::-webkit-input-placeholder {
            color: #c0c0c0;
          }
        }
        .code-nums {
          margin-left: 10px;
          width: 60px;
          height: 30px;
          line-height: 30px;
          background: #fbf9fa;
          text-align: center;
          border: 1px solid #f5f5f5;
          color: chocolate;
        }
      }
      .save-buttom {
        margin-top: 100px;
        width: 300px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        border-radius: 30px;
        background-image: linear-gradient(#00bbfe, #0091fd);
        box-shadow: 0 0 2px 1px #00bbfe;
      }
    }
  }
}
</style>