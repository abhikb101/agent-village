export function getBuildingsConfig(width, height) {
  return [
    {
      name: "Bakery",
      x: width * 0.15, // 15% from left
      y: height * 0.2, // 20% from top
      width: width * 0.15, // 15% of screen width
      height: height * 0.15, // 15% of screen height
      color: [210, 180, 140], // Light brown
    },
    {
      name: "Library",
      x: width * 0.65, // 65% from left
      y: height * 0.2, // 20% from top
      width: width * 0.18, // 18% of screen width
      height: height * 0.15, // 15% of screen height
      color: [139, 69, 19], // Saddle brown
    },
    {
      name: "Adventurer's Guild",
      x: width * 0.15, // 15% from left
      y: height * 0.65, // 65% from top
      width: width * 0.2, // 20% of screen width
      height: height * 0.18, // 18% of screen height
      color: [128, 0, 0], // Dark red
    },
    {
      name: "Blacksmith",
      x: width * 0.65, // 65% from left
      y: height * 0.65, // 65% from top
      width: width * 0.15, // 15% of screen width
      height: height * 0.15, // 15% of screen height
      color: [169, 169, 169], // Dark gray
    },
  ];
}
