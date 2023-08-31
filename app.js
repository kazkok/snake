let canvas = document.getElementById("snake")
let ctx = canvas.getContext("2d")

let snake = [{x:160, y:160}]
let appleGrid = {x:5, y:5}
let apple = {x: 5*80, y:5*80}

let lastPress = ""

let timer = Date.now()

let score = 0;

ctx.fillStyle = "green"
ctx.fillRect(0, 0, 80, 80)

window.addEventListener("keydown", function(event){
    if(event.key === "ArrowUp" || event.key === "w"){
        if(lastPress !== "down"){
            lastPress = "up"
        }
    } else if(event.key === "ArrowDown" || event.key === "s"){
        if(lastPress !== "up"){
            lastPress = "down"
        }
    } else if(event.key === "ArrowLeft" || event.key === "a"){
        if(lastPress !== "right"){
            lastPress = "left"
        }
    } else if(event.key === "ArrowRight" || event.key === "d"){
        if(lastPress !== "left"){
            lastPress = "right"
        }
    } else if(event.key === "r"){
        lastPress = "reset"
    }
})

function draw(){
    window.requestAnimationFrame(draw)
    if(Date.now() - 200 >= timer){    
        for(i = snake.length-1; i >= 1; i--){
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }
    
        if(lastPress === "up"){
            if(snake.length != 0){
                snake[0].y -= 80;
            }
        } else if(lastPress === "down"){
            if(snake.length != 0){
                snake[0].y += 80;
            }
        } else if(lastPress === "left"){
            if(snake.length != 0){
                snake[0].x -= 80;
            }
        } else if(lastPress === "right"){

            if(snake.length != 0){
                snake[0].x += 80;
            }
        } else if(lastPress === "reset"){
            snake = [{x:0, y:0}]
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height )
        ctx.strokeStyle = 'WHITE';
        ctx.lineWidth = 1;

        for(i = snake.length-1; i >= 0; i--){
            ctx.fillRect(snake[i].x, snake[i].y, 80, 80)
            ctx.strokeRect(snake[i].x, snake[i].y, 80, 80);
        }

        ctx.fillStyle = "red"
        ctx.fillRect(apple.x, apple.y, 80, 80)
        ctx.fillStyle = "green"

        timer = Date.now()

        appleCollision(snake[0], apple)
        for(i = snake.length-2; i >= 1; i--){
            snakeCollision(snake[0], snake[i+1])
        }
        wallCollision()
    }
}

function appleGen(){
    appleGrid.x = rng(0, 8)
    appleGrid.y = rng(0, 8)
    apple.x = appleGrid.x*80
    apple.y = appleGrid.y*80
}

function rng(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function appleCollision(square1, apple){
    if(square1.x === apple.x && square1.y === apple.y){
        if(square1.x === appleGrid.x*80){
            score += 1
            document.getElementById("score").textContent="Score: " + score
            if(lastPress === "left"){
                snake.push({x: apple.x - 80, y: apple.y});
            } else if(lastPress === "right"){
                snake.push({x: apple.x + 80, y: apple.y})
            } else if(lastPress === "up"){
                snake.push({x: apple.x, y: (apple.y + 80)});
            } else if(lastPress === "down"){
                snake.push({x: apple.x, y: (apple.y - 80)});
            }

            appleGen()
        }
    }
}

function wallCollision(){
    if(snake[0].y < 0 || snake[0].x < 0 || snake[0].y > 640+80 || snake[0].x > 640+80){
        lastPress = ""
        score = 0
        document.getElementById("score").textContent="Score: " + score
        snake = [{x:160, y:160}]
        lastPress = ""
    }
}

function snakeCollision(head, body){
    if(head.x === body.x && head.y === body.y){
        lastPress = ""
        score = 0
        document.getElementById("score").textContent="Score: " + score
        snake = [{x:160, y:160}]
        lastPress = ""
    }
}

draw()