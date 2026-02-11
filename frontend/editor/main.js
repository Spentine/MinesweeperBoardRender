import { MinesweeperRenderer } from "../../src/boardRender.js";
import { Minesweeper } from "../../src/easyTag.js";

function main() {
  const state = {
    board: MinesweeperRenderer.addBorders([
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "0"],
      ["C", "F", "M"],
    ]),
    tileSize: 48,
    highlight: MinesweeperRenderer.padBorders([
      [null, null, null],
      [null, "#00ff0040", null],
      [null, null, null],
    ]),
  };
  
  const selectionState = {
    board: MinesweeperRenderer.addBorders([
      ["1", "2", "3", "C", "C"],
      ["4", "5", "6", "C", "C"],
      ["7", "8", "0", "C", "C"],
      ["C", "F", "M", "C", "C"],
    ]),
    tileSize: 48,
    highlight: MinesweeperRenderer.padBorders([
      [null, null, null, "#ff000040", "#0000ff40"],
      [null, null, null, "#ffff0040", "#ff00ff40"],
      [null, null, null, "#00ff0040", "#ffffff40"],
      [null, null, null, "#00ffff40", "#00000040"],
    ]),
  };
  
  const currentlySelected = {
    tile: null,
    type: null,
    selection: null,
  };
  
  const selectionMap = [
    [
      { type: "1", selection: null},
      { type: "2", selection: null},
      { type: "3", selection: null},
      { type: null, selection: "#ff000040"},
      { type: null, selection: "#0000ff40"},
    ],
    [
      { type: "4", selection: null},
      { type: "5", selection: null},
      { type: "6", selection: null},
      { type: null, selection: "#ffff0040"},
      { type: null, selection: "#ff00ff40"},
    ],
    [
      { type: "7", selection: null},
      { type: "8", selection: null},
      { type: "0", selection: null},
      { type: null, selection: "#00ff0040"},
      { type: null, selection: "#ffffff40"},
    ],
    [
      { type: "C", selection: null},
      { type: "F", selection: null},
      { type: "M", selection: null},
      { type: null, selection: "#00ffff40"},
      { type: null, selection: "#00000040"},
    ],
  ];
  
  const selectionCallback = (tile, x, y) => {
    tile.addEventListener("click", () => {
      // check bounds
      if (x < 1 || x > 5 || y < 1 || y > 4) return;
      
      const { type, selection } = selectionMap[y - 1][x - 1];
      
      if (currentlySelected.tile === tile) {
        tile.classList.remove("selected");
        currentlySelected.tile = null;
        currentlySelected.type = null;
        currentlySelected.selection = null;
        return;
      }
      
      if (currentlySelected.tile) {
        currentlySelected.tile.classList.remove("selected");
      }
      
      tile.classList.add("selected");
      currentlySelected.tile = tile;
      currentlySelected.type = type;
      currentlySelected.selection = selection;
    });
  }
  
  const stateHTML = MinesweeperRenderer.html(state);
  document.getElementById("board").appendChild(stateHTML);

  const selectionHTML = MinesweeperRenderer.html(selectionState, selectionCallback);
  document.getElementById("selection").appendChild(selectionHTML);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}