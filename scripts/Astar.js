class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function clean() {
    document.querySelector(".board").innerHTML = ""
}

function rangeNumber() {
    var rng=document.getElementById("sizeMatrix")
    var p=document.getElementById("rangeNumbers")
    p.innerHTML=rng.value
}

const canvas = document.getElementById("board")
const context = canvas.getContext("2d")

function display() {
    function getRandomInRange(min, max) {
        return Number(Math.floor(Math.random() * (max - min + 1)) + min)
    }

    context.clearRect(0, 0, canvas.width, canvas.height)

    let size = parseInt(document.getElementById("sizeMatrix").value);

    const a = new Array(size);
    let o = 0
    let c = 0
    for(let i = 0; i < 700; i+=700/size) {
        a[i] = new Array(size);
        for(let j = 0; j < 700; j+=700/size) {
            if (getRandomInRange(0, 100) > 70) {
                o = i
                c = j
            }
            // if ((getRandomInRange(0, 100) > 80) && (o === 0 || c === 0)) {
            //     if (o != 1) {
            //         a[i][j] = 2
            //         o = 1
            //     } else if (c != 1) {
            //         a[i][j] = 3
            //         c = 1
            //     }
            // } else {
                if ((Math.round(Math.random()))===1) {
                    a[i][j] = 1
                } else {
                    a[i][j] = 0
                }
            //}
        }
    }

    a[0][0] = 2
    console.log(a.length)
    a[o][c] = 3

    // for(let i = 0; i < 2; i++) {
    //     let f = getRandomInRange(Number(0), Number(size-1))
    //     let s = getRandomInRange(Number(0), Number(size-1))
    //     a[f][s] = 2
    // }
    //let index = a.index[getRandomInRange(1, size)][getRandomInRange(1, size)] = 2
    //a[getRandomInRange(1, size)+1][getRandomInRange(1, size)+1] = 3

    for(let i = 0; i < 700; i+=700/size) {
        for(let j = 0; j < 700; j+=700/size) {
            if (a[i][j] == 1) {
                context.fillStyle = "#000000"
                context.strokeRect(i, j, 700/size, 700/size)
                context.fillRect(i, j, 700/size, 700/size)
            } else if (a[i][j] == 2) {
                context.fillStyle = "#00ff00"
                context.strokeRect(i, j, 700/size, 700/size)
                context.fillRect(i, j, 700/size, 700/size)
            } else if (a[i][j] == 3) {
                context.fillStyle = "#ff0000"
                context.strokeRect(i, j, 700/size, 700/size)
                context.fillRect(i, j, 700/size, 700/size)
            } else if (a[i][j] == 0) {
                context.fillStyle = "#ffffff"
                context.strokeRect(i, j, 700/size, 700/size)
                context.fillRect(i, j, 700/size, 700/size)
            }
        }
    }
}