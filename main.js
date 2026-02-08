import { MinesweeperRenderer } from "./src/boardRender.js";

function main() {
  const renderer = new MinesweeperRenderer();
  
  const state = {
    board: MinesweeperRenderer.addBorders([
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "0"],
      [" ", "F", "M"],
    ]),
    tileSize: 48,
  };
  
  const stateHTML = renderer.html(state);
  document.body.appendChild(stateHTML);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}