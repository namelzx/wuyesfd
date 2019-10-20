<template>
  <div class="footer">
    <div class="fri-links">
      <span>关于本站</span>
      <span>联系我们</span>
      <span>免责声明</span>
    </div>
    <div class="copyright">
      <span>Copyright &copy2019 Cheme.cn All Rights Reserved.  </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style lang="stylus" scoped>

  .footer {
    padding: 1% 14% 2%;
    background: #1F2325;
    text-align: center;
    font-size: 12px;
    color: #888;
  }

  .footer .fri-links {
    margin: 15px 0;
  }

  .footer .fri-links span {
    padding: 0 10px;
  }

  .fri-links span:hover {
    color: #fff;
    cursor: pointer;
  }
</style>
