function drawChart(opt) {
  var obj = chart(opt)
  switch (opt.type) {
    case 'pie':
      obj.animation(obj.drawPie)
      break
    case 'Bar':
      obj.animation(obj.drawBar)
      break
    default:
      obj.animation(obj.drawBar)
      break
  }
}

function chart(opt) {
  var canvas = opt.canvas
  var w = canvas.width = canvas.parentNode.clientWidth
  var h = canvas.height = canvas.parentNode.clientHeight
  var ctx = canvas.getContext('2d')
  var title = opt.title
  var titleFontsize = opt.titleFontsize || 16
  var data = opt.data
  var length = data.length
  var color = opt.color || ['#C23531', '#2F4554', '#AF982E', '#61A0A8', '#E98F6F', '#245862', '#361CB9', '#12C443']
  var tx = parseInt(w / 20, 10) // title的x坐标
  var ty = parseInt(titleFontsize, 10) // title的y坐标
  var bh = parseInt(ty, 10) // bar的高度
  var bw = parseInt(w / 10 * 9 - 2 * bh, 10) // bar的长度
  var bi = parseInt(bh, 10) // bar 之间的间隙
  var bx = parseInt(tx, 10) // bar 起始x坐标
  var by = parseInt((h - length * (bh + bi) + bi) / 2 + titleFontsize, 10) // bar 起始y 坐标
  console.log((h - 2 * titleFontsize - (length - 1) * (bh + bi)))
  var r = parseInt((h - ty * 4) / 2, 10) // 饼图半径
  var cx = parseInt(w / 8 + r, 10) // 圆心x坐标
  var cy = parseInt(h - ty - r, 10) // 圆心Y坐标
  var total = data.reduce(function(a, b) {
    return a + b.value
  }, 0);
  return {
    animation: function(draw, _time) {
      var time = _time || 2000
      var start = Date.now()
      var _this = this
      animate()

      function animate() {
        var now = Date.now()
        var elapsed = now - start
        var ratio = elapsed / time
        if (ratio < 1) {
          draw(Math.pow(ratio, 3), _this) // 动画由慢到快
          setTimeout(animate, Math.min(25, time - elapsed))
        } else {
          draw(1, _this)
        }
      }
    },
    drawBar: function(ratio, self) {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = '#666' // bar 外边框颜色
      ctx.fillStyle = '#E77408' // bar 填充颜色
      ctx.lineWidth = 1 // bar 外框线宽
      data.forEach(function(key, index) {
        var len = (length > 1) ? (key.value / total) : key.value
        ctx.strokeRect(bx - 0.5, by + (bh + bi) * index - 0.5, bw, bh)
        ctx.fillRect(bx, by + (bh + bi) * index, len * bw * ratio, bh - 1)
      })
      if (ratio === 1) {
        self.drawPercent()
      }
      self.drawTitle()
    },
    drawTitle: function() {
      ctx.beginPath()
      ctx.textBaseline = 'top'
      ctx.font = titleFontsize + 'px sans-serif'
      ctx.fillStyle = '#555'
      ctx.fillText(title, tx, ty)
    },
    drawPercent: function() {
      data.forEach(function(key, index) {
        var len = (length > 1) ? (key.value / total) : key.value
        var text = Math.round(len * 100) + '%'
        ctx.beginPath()
        ctx.textBaseline = 'top'
        ctx.font = bh + 'px sans-serif'
        ctx.fillStyle = '#666'
        ctx.fillText(text, bx + bw + bh / 4, by + (bh + bi) * index)
      })
    },
    drawPie: function(ratio, self) {
      ctx.save()
      ctx.clearRect(0, 0, w, h)
      ctx.translate(cx, cy)
      var startRad = -Math.PI / 2
      data.forEach(function(key, index) {
        var len = key.value / total
        var endRad = len * Math.PI * 2 + startRad
        ctx.beginPath()
        ctx.fillStyle = color[index]
        ctx.strokeStyle = color[index]
        ctx.moveTo(0, 0)
        ctx.arc(0, 0, r, startRad, endRad)
        ctx.fill()
        var text = key.text.substr(0, 5) + ' ' + Math.round(len * 100) + '%'
        self.drawText(r, startRad, endRad, text)
        startRad = endRad
      })
      self.mask(w, ratio)
      ctx.restore()
      self.drawTitle()
    },
    mask: function(r, ratio) {
      ctx.beginPath()
      ctx.fillStyle = '#fff'
      ctx.moveTo(0, 0)
      var startRad = -Math.PI / 2 + Math.PI * 2 * ratio
      ctx.arc(0, 0, r, startRad, 3 / 2 * Math.PI)
      ctx.fill()
    },
    drawText: function(r, s, e, t) {
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.font = '12px sans-serif'
      ctx.textBaseline = 'middle'
      var sx = r * Math.cos(-((e - s) / 2 + s))
      var sy = -r * Math.sin(-((e - s) / 2 + s))
      ctx.moveTo(sx, sy)
      var ix = sx > 0 ? sx + r / 10 : sx - r / 10
      var iy = sy > 0 ? sy + r / 50 : sy - r / 50
      ctx.lineTo(ix, iy)
      var ex = ix > 0 ? ix + r / 8 : ix - r / 8
      var ey = iy
      ctx.lineTo(ex, ey)
      var w = ctx.measureText(t)
      var tx = ex > 0 ? ex + 2 : ex - 2 - w.width
      ctx.fillText(t, tx, ey)
      ctx.stroke()
    }
  }
}
