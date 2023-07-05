const dino = document.getElementById('dino');
const game = document.getElementById('game');
const scoreText = document.getElementById('score');
let isJumping = false;
let dinoBottom = 0;
let gravity = 0.9;
let score = 0;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(function () {
            if (dinoBottom >= 250) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(function () {
                    if (dinoBottom <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    dinoBottom -= 5;
                    dino.style.bottom = dinoBottom + 'px';
                }, 20);
            }
            dinoBottom += 30;
            dino.style.bottom = dinoBottom + 'px';
        }, 20);
    }
}

function control(event) {
    if (event.code === 'Space') {
        jump();
    }
}

document.addEventListener('keydown', control);

function generateObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '600px';
    obstacle.style.bottom = '0px';
    game.appendChild(obstacle);

    let obstaclePosition = 600;
    let randomTime = Math.random() * 6000;

    let obstacleTimerId = setInterval(function () {
        if (obstaclePosition <= 0) {
            clearInterval(obstacleTimerId);
            game.removeChild(obstacle);
            score++;
            scoreText.innerText = 'Score: ' + score;
        }

        obstaclePosition -= 5;
        obstacle.style.left = obstaclePosition + 'px';

        if (
            obstaclePosition > 0 &&
            obstaclePosition < 60 &&
            dinoBottom < 60
        ) {
            // Collision detected
            clearInterval(obstacleTimerId);
            document.body.innerHTML = '<h1>Game Over</h1><p>Your score is: ' + score + '</p>';
        }
    }, 20);

    setTimeout(generateObstacle, randomTime);
}

generateObstacle();
