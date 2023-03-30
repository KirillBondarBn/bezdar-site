function printMatrix() {
    let sizeInput = document.getElementById("sizeMatrix");
    let size = parseInt(sizeInput.value);
    // size = Number(size);
    console.log(size);
    let a = new Array(size);
    for(var i = 0; i < size; i++) {
        a[i] = new Array(size);
    }
    let matrix = document.querySelector(".matrix")
    for(let i = 0; i < size; i++) {
        let rows = document.createElement("div");
        rows.style.display="flex";
        for(let j = 0; j < size; j++) {
            a[i][j] = document.createElement("div")
            a[i][j].style.width = "10px";
            a[i][j].style.height = "10px";
            a[i][j].style.border = "2px solid black";
            a[i][j].style.background = "rgb(255, 255, 255)";
            rows.appendChild(a[i][j]);
        }
        matrix.appendChild(rows);
    }
}
