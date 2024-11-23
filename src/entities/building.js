export function createBuilding(k, buildingData) {
  return k.add([
    k.rect(buildingData.width, buildingData.height),
    k.pos(buildingData.x, buildingData.y),
    k.color(
      k.rgb(buildingData.color[0], buildingData.color[1], buildingData.color[2])
    ),
    k.area(),
    k.body({ isStatic: true }),
    "building",
    {
      name: buildingData.name,
    },
  ]);
}
