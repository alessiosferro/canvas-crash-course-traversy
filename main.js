const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const jump = document.querySelector("#jump");
const idle = document.querySelector("#idle");

// ctx.drawImage(image, 96, 0, 32, 32, 20, 20, 32, 32);

let i = 0;

setInterval(() => {
  i = (i + 1) % 4;
}, 100);

async function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    idle,
    i * 32,
    0,
    32,
    32,
    canvas.width / 2 - 16,
    canvas.height / 2 - 16,
    32,
    32
  );

  requestAnimationFrame(update);
}

update();
