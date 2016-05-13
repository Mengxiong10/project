<style>
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1463064943_897826.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1463064943_897826.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/font_1463064943_897826.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/font_1463064943_897826.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1463064943_897826.svg#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont";
  margin-right:6px;
}

body{
  background: #eee;
}

.header{
  width: 100%;
  font-size:24px;
  line-height:2;
  color:#fff;
  background:#ee7419;
}
.nav{
  width:1260px;
  margin: 0 auto;
}
.header h1,.header h2,.header i{
  float: left;
}

.header a{
  margin-left:80px;
  font-size: 20px;
  color:#fff;
}
.main{
  width: 976px;
  padding:0 32px;
  margin:50px auto 250px;
  background: #fff;
  border-radius:4px;
  box-shadow: 0 4px 8px rgba(0,0,0,.5);
}
/**
 * 按钮通用类
 */
.operate-btn {
  display:inline-block;
  width: 78px;
  line-height:20px;
  border: 1px solid #a1a1a1;
  border-radius: 2px;
  margin-right: 2px;
  text-align: center;
  background: #fff;
  cursor: pointer;
}
.operate-btn:hover{
  background:#e77408;
  color:#fff;
  text-decoration: none;
}
</style>

<template>
  <div class="header">
    <div class="nav clearfix"> <i class="iconfont">&#xe606;</i>
      <h1>问卷管理</h1>
      <h2>
        <a v-link = "'/home'">我的问卷</a>
      </h2>
    </div>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
