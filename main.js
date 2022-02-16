var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
lineWidth = 5

//标记，用来判断用户鼠标点击状态
var using = false

//设置canvas尺寸
setCanvasSize(canvas)

// 监听用户动作
listenToUser(canvas, ctx)

//启用橡皮擦/画笔
var eraserEnabled = false

pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    pen.classList.remove('active')
    eraser.classList.add('active')
}
// 清空画板
clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//保存画板
download.onclick = function () {
    var url = canvas.toDataURL("img/png")
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.href = url
    a.download = 'canvas-image'
    a.target = "_blank"
    a.click()
}

black.onclick = function () {
    ctx.strokeStyle = "black"
    black.classList.add("active")
    red.classList.remove("active")
    yellow.classList.remove("active")
    blue.classList.remove("active")
    green.classList.remove("active")
}
red.onclick = function () {
    ctx.strokeStyle = "red"
    red.classList.add("active")
    yellow.classList.remove("active")
    black.classList.remove("active")
    blue.classList.remove("active")
    green.classList.remove("active")
}
yellow.onclick = function () {
    ctx.strokeStyle = "yellow"
    yellow.classList.add("active")
    red.classList.remove("active")
    black.classList.remove("active")
    blue.classList.remove("active")
    green.classList.remove("active")
}
blue.onclick = function () {
    ctx.strokeStyle = "blue"
    blue.classList.add("active")
    yellow.classList.remove("active")
    black.classList.remove("active")
    red.classList.remove("active")
    green.classList.remove("active")
}
green.onclick = function () {
    ctx.strokeStyle = 'green'
    green.classList.add('active')
    blue.classList.remove('active')
    yellow.classList.remove("active")
    black.classList.remove("active")
    red.classList.remove("active")
}

thin.onclick = function () {
    lineWidth = 5
}
thick.onclick = function () {
    lineWidth = 10
}

/***********************工具函数***************** */
//创建一个画板
function setCanvasSize(canvas) {
    function pageSize() {
        // 设置canvas的宽高为全屏
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }

    pageSize()

    // 当用户拉伸窗口时，改变canvas的宽高
    window.onresize = function () {
        pageSize()
    }
}

function listenToUser(canvas, ctx) {
    // 确定用户点击的此刻坐标
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    // 画圆
    function drawCir(x, y, radius) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 360)
        ctx.fill()
    }

    // 画线
    function drawLine(x1, y1, x2, y2, ) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineWidth = lineWidth
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
    }

    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        // 如果设备支持触屏
        canvas.ontouchstart = function (keyWord) {

            var x = keyWord.touches[0].clientX;
            var y = keyWord.touches[0].clientY;

            if (eraserEnabled) {
                using = true
                ctx.clearRect(x, y, 10, 10)
            } else {
                // 判断用户鼠标点击状态（如果为fales,则鼠标松开；如果为true，则鼠标按下）
                //确定此刻用户所点击的坐标，以配合下一个点的坐标
                using = true;
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }

        canvas.ontouchmove = function (keyWord) {

            var x = keyWord.touches[0].clientX;
            var y = keyWord.touches[0].clientY;

            if (eraserEnabled) {
                if (using) {
                    ctx.clearRect(x, y, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = {
                        x: x,
                        y: y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    //这句话很重要
                    lastPoint = newPoint
                }
            }
        }

        canvas.ontouchend = function (keyWord) {
            using = false
        }
    } else {
        // 如果设备不支持触屏
        canvas.onmousedown = function (keyWord) {
            var x = keyWord.clientX;
            var y = keyWord.clientY;
            if (eraserEnabled) {
                using = true
                ctx.clearRect(x, y, 10, 10)
            } else {
                // 确定此刻用户所点击的坐标，以配合下一个点的坐标
                using = true;
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.onmousemove = function (keyWord) {

            var x = keyWord.clientX;
            var y = keyWord.clientY;

            if (eraserEnabled) {
                if (using) {
                    ctx.clearRect(x, y, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = {
                        x: x,
                        y: y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    //这句话很重要
                    lastPoint = newPoint
                }
            }
        }
        canvas.onmouseup = function (keyWord) {
            using = false
        }
    }
}