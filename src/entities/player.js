export function createPlayer(k) {
  return k.add([
    k.rect(32, 32),
    k.pos(k.width() / 2, k.height() / 2),
    k.color(0, 0, 255),
    k.area(),
    k.body(),
    "player",
    {
      speed: 200,
      update() {
        const moveX =
          (k.isKeyDown("right") || k.isKeyDown("d") ? 1 : 0) -
          (k.isKeyDown("left") || k.isKeyDown("a") ? 1 : 0);

        const moveY =
          (k.isKeyDown("down") || k.isKeyDown("s") ? 1 : 0) -
          (k.isKeyDown("up") || k.isKeyDown("w") ? 1 : 0);

        this.move(moveX * this.speed, moveY * this.speed);
      },
    },
  ]);
}
