var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var numCol = 6
var gridSize = canvas.height/(numCol+1)|0
var widthOffset = (canvas.width%gridSize)/2|0
var heightOffset = gridSize/2|0
var numRow = ((canvas.height-heightOffset)/gridSize|0) - 1
var board = new Array(numCol).fill(0).map(n => new Array(numRow).fill(0))
var player = {x:0,y:0}

function drawGrid(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000"
    // draw lines
    ctx.beginPath()
    for(var x = widthOffset; x <= canvas.width; x += gridSize){
        ctx.moveTo(x,heightOffset)
        ctx.lineTo(x,canvas.height-heightOffset)
    }
    for(var y = heightOffset; y <= canvas.height; y += gridSize){
        ctx.moveTo(widthOffset,y)
        ctx.lineTo(canvas.width-widthOffset,y)
    }
    ctx.stroke()
    
    // draw squares
    for(var r = 0; r < numRow; r++){
        for(var c = 0; c < numCol; c++){
            if(board[r][c]){
                ctx.fillRect(c*gridSize+widthOffset,r*gridSize+heightOffset,gridSize,gridSize)
            }
        }
    }
    
    // draw player
    ctx.fillStyle = "#293"
    ctx.fillRect(player.x*gridSize+widthOffset+gridSize/4,player.y*gridSize+heightOffset+gridSize/4,gridSize/2,gridSize/2)
}

function gameRules(b,a){
    function tog(p){
        board[p.y][p.x] = !board[p.y][p.x]
    }
    var before = board[b.x][b.y]
    var after = board[a.x][a.y]
//    if(before^after){
//        tog(b)
        tog(a)
//    } else {
//        tog(b)
//    }
}

document.onkeydown = function(e) {
    e = e || window.event;
    
    var before = {x:player.x,y:player.y}
    switch(e.keyCode){
        case 38: // up
            player.y--
            break
        case 40: // down
            player.y++
            break
        case 37: // left
            player.x--
            break
        case 39: // right
            player.x++
            break
    }
    player.x = (player.x+numRow)%numRow
    player.y = (player.y+numCol)%numCol
    var after = {x:player.x,y:player.y}
    gameRules(before,after)
    drawGrid()
}

drawGrid()
console.log(numRow,numCol)