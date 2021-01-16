var ball;
var db, pos;
function setup() {
    createCanvas(500, 500);
    db = firebase.database();
    ball = createSprite(250, 250, 10, 10);
    ball.shapeColor = "red";
    var posref = db.ref('ball/position');
    posref.on("value", readpos, showerror);

}

function draw() {
    background("white");
    if (pos != undefined) {
        if (keyDown(LEFT_ARROW)) {
            changePosition(-1, 0);
        }
        else if (keyDown(RIGHT_ARROW)) {
            changePosition(1, 0);
        }
        else if (keyDown(UP_ARROW)) {
            changePosition(0, -1);
        }
        else if (keyDown(DOWN_ARROW)) {
            changePosition(0, +1);
        }
    }
    drawSprites();
}

function changePosition(x, y) {
    db.ref('ball/position').set({
        x: pos.x + x,
        y: pos.y + y
    })
}

function showerror() {
    console.log(error);
}

function readpos(data) {
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;
}