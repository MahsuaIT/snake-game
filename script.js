const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const eatSound = document.getElementById('eatSound');
const scale = 20;
let rows, columns;

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;
    rows = Math.floor(canvas.width / scale);
    columns = Math.floor(canvas.height / scale);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let snake;
let fruit;
let score = 0;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            eatSound.play();
            score += 5;
            document.getElementById('score').innerText = 'Score: ' + score;
            fruit.pickLocation();
        }

        snake.checkCollision();
        if (snake.collided) {
            showGameOverModal();
        }
    }, 250);
}());

window.addEventListener('keydown', e => {
    const direction = e.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

document.getElementById('upButton').addEventListener('click', () => snake.changeDirection('Up'));
document.getElementById('downButton').addEventListener('click', () => snake.changeDirection('Down'));
document.getElementById('leftButton').addEventListener('click', () => snake.changeDirection('Left'));
document.getElementById('rightButton').addEventListener('click', () => snake.changeDirection('Right'));

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.collided = false;

    this.draw = function() {
        ctx.fillStyle = '#e91e63';

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        // Snake head with different color
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, scale, scale);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, scale, scale);
    };

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) this.x = 0;
        if (this.y >= canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width - scale;
        if (this.y < 0) this.y = canvas.height - scale;
    };

    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    };

    this.eat = function(fruit) {
        const tolerance = scale / 2;
        if (Math.abs(this.x - fruit.x) < tolerance && Math.abs(this.y - fruit.y) < tolerance) {
            this.total++;
            return true;
        }

        return false;
    };

    this.checkCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
                this.collided = true;
                return;
            }
        }
        this.collided = false;
    };
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = Math.floor(Math.random() * rows) * scale;
        this.y = Math.floor(Math.random() * columns) * scale;
    };

    this.draw = function() {
        ctx.fillStyle = '#64dd17';
        ctx.fillRect(this.x, this.y, scale, scale);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, scale, scale);
    };
}

function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    const finalScore = document.getElementById('finalScore');
    finalScore.innerText = `Game Over! Your score: ${score}`;
    $('#gameOverModal').modal('show');

    document.getElementById('restartButton').addEventListener('click', () => {
        score = 0;
        document.getElementById('score').innerText = 'Score: 0';
        snake = new Snake();
        fruit = new Fruit();
        fruit.pickLocation();
    });
}
