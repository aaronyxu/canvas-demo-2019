
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5
var radius = 2.5

autoSetCanvasSize(yyy)



listenToUser(yyy)



var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}


black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    gray.classList.remove('active')
    yellow.classList.remove('active')
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    gray.classList.remove('active')
    green.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    red.classList.remove('active')
    gray.classList.remove('active')
    yellow.classList.remove('active')
}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    gray.classList.remove('active')
    yellow.classList.remove('active')
}
gray.onclick = function () {
    context.fillStyle = 'gray'
    context.strokeStyle = 'gray'
    gray.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}
yellow.onclick = function () {
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    gray.classList.remove('active')
}



thin.onclick = function () {
    lineWidth = 4
    radius = 2
}

medium.onclick = function () {
    lineWidth = 8
    radius = 4
}
thick.onclick = function () {
    lineWidth = 12
    radius = 6
}

clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height)
}

download.onclick = function () {
    var url = yyy.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'My Canvas'
    a.target = '_blank'
    a.click()
}





function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function autoSetCanvasSize(canvas) {
    canvasResize()

    window.onresize = function () {
        canvasResize()
    }
    function canvasResize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    if (document.body.ontouchstart !== undefined) {

        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            }
            else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x, y, radius)
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            }
            else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x, y, radius)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function (aaa) {
            using = false
        }


    } else {
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            }
            else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x, y, radius)
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            }
            else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x, y, radius)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }

}