
<template>
<div>
  <div class="header">
    <div class="nav clearfix"> <i class="iconfont float-left">&#xe606;</i>
      <h1 class = 'float-left'>问卷管理</h1>
      <h2 class="float-left">
        <a v-link = "'/home'">我的问卷</a>
      </h2>
    </div>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
  import './css/reset.css'
  import './css/header.css'
</script>
