let weights = new Array(2);
weights[0] = new Array(28);
weights[1] = new Array(10);


for(let i = 0; i < 28; i++) {
    weights[0][i] = new Array(784 * 28);
    for(let j = 0; j < 784 * 28; j++) {
        weights[0][i][j] = Math.random() * 2 - 1;
    }
}
for(let i = 0; i < 10; i++){
    weights[1][i] = new Array(28 * 10);
    for(let j = 0; j < 28 * 10; j++){
        weights[1][i][j] = Math.random() * 2 - 1;
    }
}

let biases = new Array(3);
biases[0] = new Array(28);
biases[1] = new Array(10);

for(let i = 0; i < 28; i++) {
    biases[0][i] = Math.random() * 2 - 1;
}
for(let i = 0; i < 10; i++) {
    biases[1][i] = Math.random() * 2 - 1;
}

    // Сигмоида
function sigmoid(x) {
    return 1 / (1 + Math.exp( -x ));
}

// умножение матриц
function matrixMultiplication(a, b) {
    let result = Array(a.length)
    for (let i = 0; i < a.length; i++) {
        let sum = 0;
        for (let j = 0; j < a[0].length; j++) {
            sum += a[i][j] * b[j]
        }
        result[i] = sum;
    }
    // console.log('mult ' + result);
    return result;
}

// сложение матриц
function matrixAddition(a, b) {
    let result = Array(a.length)
    for (let i = 0; i < a.length; i++) {
        result[i] = sigmoid(a[i] + b[i][0]);
    }
    // console.log('add ' + result);
    return result;
}

function feedForward(matrix) {
    for (let i = 0; i < 2; i++) {
        matrix = matrixMultiplication(weights[i], matrix)
        matrix = matrixAddition(matrix, biases[i])
    }
    
    let maxIndex = -100
    let maxValue = -100
    for (let i = 0; i < 10; i++) {
        if (maxValue < matrix[i]) {
            maxIndex = i
            maxValue = matrix[i]
        }
    }
}

//матрицу с картинки перемножаю с матрицей weights потом прибавляю biases, потом по sigmoid прогоняю каждое значение ячейки