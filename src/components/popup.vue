
<style>
.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.3);
}
.popover{
  position: fixed;
  left: 50%;
  top:25%;
  margin-left: -180px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}
.poptitle{
  width: 310px;
  padding:0 25px;
  margin: 0;
  font-size: 16px;
  line-height: 3em;
  background: #f7f7f7;
}
.close{
  float: right;
  font-size: 26px;
  cursor: pointer;
}
.close:hover{
  color: #e77408;
}
.popbody{
  height: 70px;
  padding:25px 0 0 25px;
}
.popoperate{
  text-align: center;
  margin-bottom: 1.5em;
}
.popoperate .operate-btn{
  float: none;
}
</style>

<template>
<div v-if = "show">
<div class="mask" @click = "this.show=false"></div>
<div class="popover">
  <h5 class="poptitle">提示<b class="close" @click = "this.show = false">×</b></h5>
  <div class="popbody">
    <p>{{prompt}}</p>
    <p>{{message}}</p>
  </div>
  <div class="popoperate">
    <button class="operate-btn" @click = "fire(callback)">确认</button>
    <button class="operate-btn" @click = "this.show = false">取消</button>
  </div>
</div>
</div>
</template>

<script>
  export default {
    props: ['message', 'prompt', 'show', 'callback'],
    methods: {
      fire (call) {
        call()
        this.show = false
      }
    }
  }
</script>
