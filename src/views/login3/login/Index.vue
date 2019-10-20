<template>
  <div class="login">
    <header-navbar />
    <login-form :ruleForm="ruleForm" :rules="rules" :details="details"/>
    <my-footer/>
  </div>
</template>

<script>
  import HeaderNavbar from './component/HeaderNavbar'
  import LoginForm from './component/LoginForm'
  import Footer from './component/Footer'
  export default {
    name: 'Index',
    data() {
      return {
        ruleForm: {
          username: '18677947067',
          password: '123456'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ],
        },
        details:[
          {
            'id': '01',
            'name':'忘记密码',
            'path':'/fg-password'
          },
          {
            'id': '02',
            'name':'忘记会员名',
            'path':'/fg-username'
          },
          {
            'id': '03',
            'name':'免费注册',
            'path':'/register'
          }
        ]
      }
    },
    components: {
      HeaderNavbar,
      LoginForm,
      MyFooter: Footer
    }
  }
</script>

<!--
  没安装 stylus stylus-loader 运行下面
  npm install stylus stylus-loader --save-dev
-->
<style lang="stylus" scoped>
</style>
