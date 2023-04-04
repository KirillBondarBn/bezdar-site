class Position{
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

class Point {
    constructor (x, y, cluster, radius, color) {
        this.position = new Position(x, y);
        this.cluster = cluster;
        this.radius = radius;
        this.color = color;
    }
}

class Cluster {
    constructor (x, y, id, color) {
        this.position = new Position(x, y);
        this.id = id;
        this.color = color;
    }
}

const canvas = document.getElementById("clustering_field");
const context = canvas.getContext('2d');
var points = new Array();
var drawningMode = "Draw";
const colors = ["#B83B5E", "#F08A5D", "#F9ED69", "#EAFFD0", "#AA96DA", "#928A97", "#1FAB89", "#F57170", "#6C5B7B"];

function setDrawMode() {
    drawningMode = "Draw";
}

function setRemoveMode() {
    drawningMode = "Remove";
}

function getUserClickPosition(event) {
    const rectangle = canvas.getBoundingClientRect();
    let x = event.clientX - rectangle.left;
    let y = event.clientY - rectangle.top;

    let position = new Position(x, y);
    return position;
}

function getPointsDistance(positionA, positionB) {
    return Math.sqrt(Math.pow(positionA.x - positionB.x, 2) + Math.pow(positionA.y - positionB.y, 2));
}

function spaceIsFree(point) {
    for (let i = 0; i < points.length; i++) {
        if (getPointsDistance(point.position, points[i].position) <= (point.radius + points[i].radius)) {
            return false;
        }
    }
    return true;
}

function addPoint(canvas, event) {
    let cursorPosition = getUserClickPosition(event);

    let radius = document.getElementById('radiusRange');
    let point = new Point(cursorPosition.x, cursorPosition.y, -1, parseInt(radius.value), colors[7]);

    if (spaceIsFree(point)) {
        points.push(point);
    }

    display();
}

function removePoint(event) {
    let cursorPosition = getUserClickPosition(event);

    for (let i = 0; i < points.length; i++) {
        let pointPosition = points[i].position;
        if (getPointsDistance(cursorPosition, pointPosition) <= points[i].radius) {
            points = points.slice(0, i).concat(points.slice(i + 1));
            break;
        }
    }
}

function click(canvas, event) {
    if (drawningMode == "Draw") {
        addPoint(canvas, event);
    }
    else if (drawningMode == "Remove") {
        removePoint(event);
    }
    display();
}

canvas.addEventListener('mousedown', function(event) {
    click(canvas, event);
})

function display() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < points.length; i++) {
        context.beginPath();

        context.strokeStyle = points[i].color;
        context.fillStyle = points[i].color;
        context.arc(points[i].position.x, points[i].position.y, points[i].radius, 0, 2 * Math.PI);
        context.fill();

        context.stroke();
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
}

function setValidClusterCount() {
    let clusterCount = document.getElementById('clusterCount');
    if (parseInt(clusterCount.value) > points.length) {
        clusterCount.value = points.length;
    }
}

// Алгоритмы кластеризации

function k_means() {
    let clusterCount = parseInt(document.getElementById('clusterCount').value);
    let clusters = new Array(clusterCount);

    for (let i = 0; i < clusterCount; i++) {
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height;

        cluster = new Cluster(x, y, i + 1, colors[i]);
        clusters[i] = cluster;
    }

    let switches = 1;
    let lol = 0;

    while (switches != 0 && lol < 10000) {
        switches = 0;
        for (let point of points) {
            let minDistance = 1000000;
            for (let cluster of clusters) {
                let currentDistance = getPointsDistance(point.position, cluster.position) - point.radius;
                
                if (currentDistance < minDistance) {
                    minDistance = currentDistance;

                    point.color = cluster.color;
                    point.cluster = cluster.id;

                    switches++;
                }
            }
        }

        for (let cluster of clusters) {
            let count = 0, sumX = 0, sumY = 0;
            for (let point of points) {
                if (point.cluster == cluster.id) {
                    count++;
                    sumX += point.position.x;
                    sumY += point.position.y;
                }
            }

            cluster.position.x = parseInt(sumX / count);
            cluster.position.y = parseInt(sumY / count);
        }
        lol++;
    }
    
    display();
}