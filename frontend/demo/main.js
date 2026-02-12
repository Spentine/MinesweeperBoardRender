import { MinesweeperRenderer } from "../../src/boardRender.js";
import { Minesweeper } from "../../src/easyTag.js";

function main() {
  const state = {
    board: [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "0"],
      ["C", "F", "M"],
    ],
    tileSize: 48,
    highlight: [
      [null, null, null],
      [null, "#00ff0040", null],
      [null, null, null],
    ],
  };
  
  const stateHTML = MinesweeperRenderer.html(state);
  document.body.appendChild(stateHTML);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}