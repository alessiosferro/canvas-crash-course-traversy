// Singleton Canvas class
class Canvas {
  static #instance;

  constructor(canvasId) {
    if (!!Canvas.#instance) {
      throw new ReferenceError("Instance already exists");
    }

    this.elem = document.querySelector(`#${canvasId}`);
    this.ctx = this.elem.getContext("2d");
  }

  static getInstance(canvasId) {
    if (!Canvas.#instance) {
      Canvas.#instance = new Canvas(canvasId);
      return Canvas.#instance;
    }

    return Canvas.#instance;
  }

  drawRect({ x, y, width, height, color }) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawStrokeRect({
    x,
    y,
    width = 100,
    height = 100,
    color = "blue",
    lineWidth = 1,
  }) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(x, y, width, height);
  }

  clearRect({ x, y, width, height }) {
    this.ctx.clearRect(x, y, width, height);
  }

  drawText({ text, maxWidth, x, y, font = "30px Arial", fillStyle = "black" }) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y, maxWidth);
  }

  drawStrokeText({
    text,
    x,
    y,
    maxWidth,
    font = "30px Arial",
    lineWidth = 1,
    strokeStyle = "black",
  }) {
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.font = font;
    this.ctx.strokeText(text, x, y, maxWidth);
  }

  strokeOrFill({ isStroke, lineWidth, strokeStyle, fillStyle }) {
    if (isStroke) {
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.stroke();
      return;
    }

    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }

  drawPath({
    startCoords,
    paths,
    isStroke,
    strokeStyle = "black",
    lineWidth = 1,
    fillStyle = "red",
  }) {
    this.ctx.beginPath();
    this.ctx.moveTo(startCoords.x, startCoords.y);
    paths.forEach(({ x, y }) => this.ctx.lineTo(x, y));
    this.ctx.closePath();
    this.strokeOrFill({ isStroke, lineWidth, strokeStyle, fillStyle });
  }

  drawArc({
    x,
    y,
    radius,
    startAngle,
    endAngle,
    counterclockwise,
    isStroke,
    lineWidth,
    strokeStyle,
    fillStyle,
  }) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    this.ctx.closePath();
    this.strokeOrFill({ isStroke, lineWidth, strokeStyle, fillStyle });
  }
}
