/*
// 参数例子
var options = {
  title: '数据占比',
  type: 'bar',      //['bar','pie']默认pie
  canvas: document.querySelector('#kaka'),
  color: ['#C23531', '#2F4554', '#AF982E', '#61A0A8', '#E98F6F'],  //扇形颜色可选
  data: [{
    value: 100,
    text: '篮球'
  }, {
    value: 336,
    text: '足球'
  }, {
    value: 206,
    text: '乒乓球'
  }, {
    value: 306,
    text: '网球'
  }]
}*/

export default chart
/* eslint-disable */
function chart (opt) {
  opt.canvas.width = opt.canvas.parentNode.clientWidth
  opt.canvas.height = opt.canvas.parentNode.clientHeight
  switch (opt.type) {
    case 'bar':
      new BarChart(opt)
      break
    default:
      new PieChart(opt)
      break
  }
}
/* eslint-disable */
function total (raw) {
  return raw.reduce(function (a, b) {
    return a + b.value
  }, 0)
}

function main (opt) {
  this.canvas = opt.canvas
  this.ctx = this.canvas.getContext('2d')
  this.title = opt.title
  this.data = opt.data
  this.color = opt.color || ['#C23531', '#2F4554', '#AF982E', '#61A0A8', '#E98F6F', '#245862', '#361CB9', '#12C443']
  this.w = this.canvas.width
  this.h = this.canvas.height
  this.animation()
}

function BarChart (opt) {
  main.call(this, opt)
  this.tx = this.w / 20 // title的x坐标
  this.ty = this.h / (2 * (this.data.length + 1) + 1) // title的y坐标
  this.bw = this.w / 3 * 2 // bar的长度
  this.bh = this.ty // bar的高度
  this.bi = this.bh // bar 之间的间隙
  this.sx = this.tx // bar 起始x坐标
  this.sy = 3 * this.bh // bar 起始y 坐标
}
BarChart.prototype.animation = function (times) {
  var time = times || 2000
  var start = Date.now()
  var _this = this
  animate()
  function animate () {
    var now = Date.now()
    var elapsed = now - start
    var ratio = elapsed / time
    if (ratio < 1) {
      _this.draw(Math.pow(ratio, 3))  // 动画由慢到快
      setTimeout(animate, Math.min(25, time - elapsed))
    } else {
      _this.draw(1)
    }
  }
}

BarChart.prototype.draw = function (ratios) {
  var ratio = ratios || 1
  var _this = this
  this.ctx.clearRect(0, 0, this.w, this.h)
  this.ctx.strokeStyle = '#666' // bar 外边框颜色
  this.ctx.fillStyle = '#E77408' // bar 填充颜色
  this.ctx.lineWidth = 1 // bar 外框线宽
  this.data.forEach(function (key, index) {
    var len = key.value / total(_this.data) * _this.bw
    _this.ctx.strokeRect(parseInt(_this.sx)+0.5, parseInt(_this.sy + (_this.bh + _this.bi) * index)+0.5, parseInt(_this.bw),parseInt(_this.bh))
    _this.ctx.fillRect(_this.sx, _this.sy + (_this.bh + _this.bi) * index, len * ratio, _this.bh)
  })

  if (ratio === 1) {
    this.drawPercent()
  }
  this.drawTitle()
}

BarChart.prototype.drawTitle = function () {
  this.ctx.textBaseline = 'top'
  this.ctx.font = '16px sans-serif'
  this.ctx.fillStyle = '#555'
  this.ctx.fillText(this.title, this.tx, this.ty)
}

BarChart.prototype.drawPercent = function () {
  var _this = this
  this.data.forEach(function (key, index) {
    var len = key.value / total(_this.data)
    var text = Math.round(len * 100) + '%'
    _this.ctx.textBaseline = 'top'
    _this.ctx.fillStyle = '#666'
    _this.ctx.fillText(text, _this.sx + _this.bw + _this.bh / 2, _this.sy + (_this.bh + _this.bi) * index)
  })
}

function PieChart (opt) {
  main.call(this, opt)
  this.tx = this.w / 20 // title的x坐标
  this.ty = this.h / (2 * (this.data.length + 1) + 1) // title的y坐标
  this.r = (this.h - this.ty * 4) / 2
  this.cx = this.w / 4 + this.r  // 圆心x坐标
  this.cy = this.h - this.ty - this.r // 圆心Y坐标
}

PieChart.prototype.animation = function () {
  BarChart.prototype.animation.call(this)
}
PieChart.prototype.draw = function (ratio) {
  this.ctx.save()
  this.ctx.clearRect(0, 0, this.w, this.h)
  this.ctx.translate(this.cx, this.cy)
  var startRad = -Math.PI / 2
  var _this = this
  this.data.forEach(function (key, index) {
    var len = key.value / total(_this.data)
    var endRad = (len * Math.PI * 2 + startRad)
    _this.ctx.beginPath()
    _this.ctx.fillStyle = _this.color[index]
    _this.ctx.strokeStyle = _this.color[index]
    _this.ctx.moveTo(0, 0)
    _this.ctx.arc(0, 0, _this.r, startRad, endRad)
    _this.ctx.fill()
    var t = key.text.substr(0, 10) + ' ' + Math.round(len * 100) + '%'
    _this.drawText(_this.ctx, _this.r, startRad, endRad, t)
    startRad = endRad
  })
  this.mask(this.ctx, this.cx - 1, ratio)
  this.ctx.restore()
  BarChart.prototype.drawTitle.call(this)
}
PieChart.prototype.drawText = function (c, r, s, e, t) {
  c.beginPath()
  c.lineWidth = 2
  c.font = '12px sans-serif'
  c.textBaseline = 'middle'
  var sx = r * Math.cos(-((e - s) / 2 + s))
  var sy = -r * Math.sin(-((e - s) / 2 + s))
  c.moveTo(sx, sy)
  var ix = sx > 0 ? sx + r / 10 : sx - r / 10
  var iy = sy > 0 ? sy + r / 50 : sy - r / 50
  c.lineTo(ix, iy)
  var ex = ix > 0 ? ix + r / 8 : ix - r / 8
  var ey = iy
  c.lineTo(ex, ey)
  var w = c.measureText(t)
  var tx = ex > 0 ? ex + 2 : ex - 2 - w.width
  c.fillText(t, tx, ey)
  c.stroke()
}
PieChart.prototype.mask = function (c, r, ratio) {
  c.beginPath()
  c.fillStyle = '#fff'
  c.moveTo(0, 0)
  var startRad = -Math.PI / 2 + Math.PI * 2 * ratio
  c.arc(0, 0, r, startRad, 3 / 2 * Math.PI)
  c.fill()
}
