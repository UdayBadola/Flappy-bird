var bird = document.getElementById("bird");
var pipesContainer = document.querySelector(".pipes-container");
var scoreEl = document.createElement("div");
var score = 0;
var gameRunning = true;

scoreEl.classList.add("score");
scoreEl.textContent = "Score: " + score;
document.body.appendChild(scoreEl);

function jump() {
  bird.style.animation = "none";
  bird.offsetHeight; /* trigger reflow */
  bird.style.animation = "jump 0.5s";
}

function gameOver() {
  gameRunning = false;
  pipesContainer.style.animationPlayState = "paused";
  alert("Game over! Your score is " + score);
}

function checkCollision() {
  var birdRect = bird.getBoundingClientRect();
  var pipes = document.querySelectorAll(".pipe");

  for (var i = 0; i < pipes.length; i++) {
    var pipeRect = pipes[i].getBoundingClientRect();

    if (birdRect.left < pipeRect.right && birdRect.right > pipeRect.left &&
        birdRect.top < pipeRect.bottom && birdRect.bottom > pipeRect.top) {
      gameOver();
    }
  }
}

setInterval(function() {
    if (gameRunning) {
      score++;
      scoreEl.textContent = "Score: " + score;
  
      var pipeTop = document.createElement("div");
      pipeTop.classList.add("pipe", "top");
      pipeTop.style.left = "100%";
  
      var pipeBottom = document.createElement("div");
      pipeBottom.classList.add("pipe");
      pipeBottom.style.left = "100%";
      pipeBottom.style.bottom = Math.floor(Math.random() * 300) + 50 + "px";
  
      pipesContainer.appendChild(pipeTop);
      pipesContainer.appendChild(pipeBottom);
  
      var pipeTopRect = pipeTop.getBoundingClientRect();
      var pipeBottomRect = pipeBottom.getBoundingClientRect();
  
      var duration = 6;
      var distance = window.innerWidth + pipeTopRect.width;
  
      pipeTop.style.animation = "pipe " + duration + "s linear";
      pipeTop.style.animationFillMode = "forwards";
      pipeTop.style.animationDelay = duration * -0.5 + "s";
  
      pipeBottom.style.animation = "pipe " + duration + "s linear";
      pipeBottom.style.animationFillMode = "forwards";
      pipeBottom.style.animationDelay = duration * -0.5 + "s";
  
      setTimeout(function() {
        pipeTop.remove();
        pipeBottom.remove();
      }, duration * 1000);
  
      checkCollision();
    }
  }, 1500);
  
  document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
      jump();
    }
  });
  