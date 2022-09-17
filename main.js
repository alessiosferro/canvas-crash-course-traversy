const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const jump = document.querySelector("#jump");
const idle = document.querySelector("#idle");

let player = {
  x: canvas.width / 2 - 16,
  y: canvas.height / 2 - 16,
  size: 32,
  dx: 0,
  dy: 0,
  speed: 1.75,
  animation: idle,
  currentAnimationFrame: 0,
  totalAnimationFrames: 4,
  isAnimationLooping: true,
};

function updatePlayerAnimationFrame() {
  setInterval(() => {
    updatePlayer({
      currentAnimationFrame: player.isAnimationLooping
        ? (player.currentAnimationFrame + 1) % player.totalAnimationFrames
        : player.currentAnimationFrame + 1,
    });

    if (
      !player.isAnimationLooping &&
      player.currentAnimationFrame === player.totalAnimationFrames
    ) {
      updatePlayer({
        animation: idle,
        currentAnimationFrame: 0,
        isAnimationLooping: true,
        totalAnimationFrames: 4,
      });
    }
  }, 150);
}

function playerJump() {
  updatePlayer({
    animation: jump,
    currentAnimationFrame: 0,
    isAnimationLooping: false,
    totalAnimationFrames: 8,
  });
}

function updatePlayer(update) {
  player = {
    ...player,
    ...update,
  };
}

function getHorizontalPlayerPosition() {
  // right side collision detection
  if (player.x + player.size + player.dx > canvas.width) {
    return player.x;
  }

  // left side collision detection
  if (player.x + player.dx < 0) {
    return 0;
  }

  return player.x + player.dx;
}

function getVerticalPlayerPosition() {
  if (player.y + player.size + player.dy > canvas.height) {
    return player.y;
  }

  if (player.y + player.dy < 0) {
    return 0;
  }

  return player.y + player.dy;
}

function drawPlayer() {
  ctx.drawImage(
    player.animation,
    player.currentAnimationFrame * 32,
    0,
    32,
    32,
    player.x,
    player.y,
    32,
    32
  );
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer({
    x: getHorizontalPlayerPosition(),
    y: getVerticalPlayerPosition(),
  });

  drawPlayer();

  requestAnimationFrame(update);
}

function movePlayer() {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" || player.dy < 0) return;

    updatePlayer({ dy: player.dy - player.speed });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" || player.dx > 0) return;

    updatePlayer({ dx: player.dx + player.speed });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" || player.dy > 0) return;

    updatePlayer({ dy: player.dy + player.speed });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" || player.dx < 0) return;

    updatePlayer({ dx: player.dx - player.speed });
  });

  document.addEventListener("keyup", (event) => {
    if (event.key !== "ArrowUp") return;

    updatePlayer({ dy: player.dy + player.speed });
  });

  document.addEventListener("keyup", (event) => {
    if (event.key !== "ArrowRight") return;

    updatePlayer({ dx: player.dx - player.speed });
  });

  document.addEventListener("keyup", (event) => {
    if (event.key !== "ArrowDown") return;

    updatePlayer({ dy: player.dy - player.speed });
  });

  document.addEventListener("keyup", (event) => {
    if (event.key !== "ArrowLeft") return;

    updatePlayer({ dx: player.dx + player.speed });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== " ") return;
    playerJump();
  });
}

update();
updatePlayerAnimationFrame();
movePlayer();
