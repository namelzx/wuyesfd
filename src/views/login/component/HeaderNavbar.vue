<template>
  <div class="header border-bottom">
    <div class="logo-wrapper">
      <img src="@/assets/image/logo.png" alt="">
    </div>
    <div class="nav-items">
      <el-dropdown  @command="handleClick">
          <span class="el-dropdown-link">
            缴费端
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">缴费端</el-dropdown-item>
          <el-dropdown-item command="b">管理端</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link tag="span" to="/">首页</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderNavbar",
    methods:{
      handleClick(e){
        if(e==='a'){
          window.location.href='http://oy.10huisp.com/cost'
        }else{
          window.location.href='http://oy.10huisp.com/admin'
        }
        console.log(e)
      }
    }
    
  }
</script>

<style lang="stylus" scoped>
  .header {
    display: flex;
    padding: 10px 15px;
    background: #1F2325;
  }
  .border-bottom:before {
    border-bottom: 1px solid rgba(255,255,255,0.3);
  }
  .logo-wrapper {
    width: 10%;
  }

  .logo-wrapper img {
    width: 100%;
  }

  .nav-items {
    line-height: 41px;
    font-size: 14px;
    color: #fff;
    text-align: right;
    width: 90%;
    padding-right: 30px;
  }

  .nav-items span {
    display: inline-block;
    color: #fff;
    padding: 0 10px;

  }

  .nav-items span:last-child:hover {
    cursor: pointer;
    color: #c1c1c1
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
