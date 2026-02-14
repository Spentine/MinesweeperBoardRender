import { MinesweeperRenderer } from "../../src/boardRender.js";
import { Minesweeper } from "../../src/easyTag.js";

function main() {
  const widthInput = document.getElementById("width");
  const heightInput = document.getElementById("height");
  const borderCheckbox = document.getElementById("borders");
  const tileSizeInput = document.getElementById("tileSize");
  
  const state = {
    board: [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "0"],
      ["C", "F", "M"],
    ],
    tileSize: Number(tileSizeInput.value),
    highlight: [
      [null, null, null],
      [null, "#00ff0040", null],
      [null, null, null],
    ],
    borders: true,
  };
  
  const selectionState = {
    board: [
      ["1", "2", "3", "C", "C"],
      ["4", "5", "6", "C", "C"],
      ["7", "8", "0", "C", "C"],
      ["C", "F", "M", "C", "C"],
    ],
    tileSize: 48,
    highlight: [
      [null, null, null, "#ff000040", "#0000ff40"],
      [null, null, null, "#ffff0040", "#ff00ff40"],
      [null, null, null, "#00ff0040", "#ffffff40"],
      [null, null, null, "#00ffff40", null],
    ],
    borders: true,
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
      { type: null, selection: "clear"},
    ],
  ];
  
  const tileSelectionFunctions = new Array(selectionState.board.length).fill(null)
    .map(() => new Array(selectionState.board[0].length).fill(null));
  
  const selectionCallback = (tile, x, y) => {
    const { type, selection } = selectionMap[y][x];
    
    const f = () => {
      // check bounds
      if (
        x < 0 || x > selectionState.board[0].length - 1 ||
        y < 0 || y > selectionState.board.length - 1
      ) return;
      
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
    };
    
    tileSelectionFunctions[y][x] = f;
    
    tile.addEventListener("click", f);
  }
  
  const keyboardSelectionMap = {
    "1": [0, 0],
    "2": [0, 1],
    "3": [0, 2],
    "q": [1, 0],
    "w": [1, 1],
    "e": [1, 2],
    "a": [2, 0],
    "s": [2, 1],
    "d": [2, 2],
    "z": [3, 0],
    "x": [3, 1],
    "c": [3, 2],
    
    "4": [0, 3],
    "5": [0, 4],
    "r": [1, 3],
    "t": [1, 4],
    "f": [2, 3],
    "g": [2, 4],
    "v": [3, 3],
    "b": [3, 4],
    
    " ": [3, 0],
  };
  
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key in keyboardSelectionMap) {
      const [y, x] = keyboardSelectionMap[key];
      const f = tileSelectionFunctions[y][x];
      if (f) f();
    }
  });
  
  let mouseDown = false;
  
  window.addEventListener("mousedown", (event) => {
    mouseDown = true;
  });
  
  window.addEventListener("mouseup", (event) => {
    mouseDown = false;
  });
  
  const boardCallback = (tile, x, y) => {
    const replace = () => {
      if (!mouseDown) return;
      
      // check bounds
      if (x < 0 || x > state.board[0].length - 1 || y < 0 || y > state.board.length - 1) return;
      
      const type = currentlySelected.type
        ? currentlySelected.type
        : state.board[y][x];
      
      const selection = currentlySelected.selection === "clear"
        ? null
        :currentlySelected.selection ?? state.highlight?.[y]?.[x];
      
      state.board[y][x] = type;
      state.highlight[y][x] = selection;
      
      const newTile = MinesweeperRenderer.htmlTile(
        MinesweeperRenderer.shortNames[type],
        selection,
        state.tileSize / 94
      );
      
      tile.replaceWith(newTile);
      
      boardCallback(newTile, x, y);
    };
    
    
    tile.addEventListener("mousedown", () => {
      mouseDown = true;
      replace()
    });
    tile.addEventListener("mousemove", replace);
  }
  
  render();

  const selectionHTML = MinesweeperRenderer.html(selectionState, selectionCallback);
  document.getElementById("selection").appendChild(selectionHTML);
  
  function render() {
    // clear board
    document.getElementById("board").innerHTML = "";
    
    const newStateHTML = MinesweeperRenderer.html(
      state,
      boardCallback
    );
    document.getElementById("board").appendChild(newStateHTML);
  }
  
  function clear() {
    state.board = new Array(Number(heightInput.value)).fill(null)
      .map(() => new Array(Number(widthInput.value)).fill("C"));
    
    state.highlight = new Array(Number(heightInput.value)).fill(null)
      .map(() => new Array(Number(widthInput.value)).fill(null));
    
    state.tileSize = Number(tileSizeInput.value);
    
    render();
  }
  
  clear();
  
  borderCheckbox.addEventListener("change", () => {
    state.borders = borderCheckbox.checked;
    render();
  });
  
  widthInput.addEventListener("change", () => {
    const newWidth = Number(widthInput.value);
    
    if (newWidth > state.board[0].length) {
      state.board.forEach(row => row.push(...new Array(newWidth - row.length).fill("C")));
      state.highlight.forEach(row => row.push(...new Array(newWidth - row.length).fill(null)));
    } else if (newWidth < state.board[0].length) {
      state.board.forEach(row => row.splice(newWidth));
      state.highlight.forEach(row => row.splice(newWidth));
    }
    render();
  });
  heightInput.addEventListener("change", () => {
    const newHeight = Number(heightInput.value);
    
    if (newHeight > state.board.length) {
      state.board.push(...new Array(newHeight - state.board.length).fill(null)
        .map(() => new Array(state.board[0].length).fill("C"))
      );
      state.highlight.push(...new Array(newHeight - state.highlight.length).fill(null)
        .map(() => new Array(state.highlight[0].length).fill(null))
      );
    } else if (newHeight < state.board.length) {
      state.board.splice(newHeight);
      state.highlight.splice(newHeight);
    }
    render();
  });
  tileSizeInput.addEventListener("change", () => {
    state.tileSize = Number(tileSizeInput.value);
    render();
  });
  
  document.getElementById("clear").addEventListener("click", clear);
  
  document.getElementById("export").addEventListener("click", () => {
    const json = JSON.stringify(state);
    navigator.clipboard.writeText(json);
    alert("Board state copied to clipboard");
  });
  
  document.getElementById("import").addEventListener("click", () => {
    const json = prompt("Paste board state JSON:");
    if (!json) return;
    try {
      const newState = JSON.parse(json);
      state.board = newState.board;
      state.highlight = newState.highlight;
      state.tileSize = newState.tileSize;
      widthInput.value = state.board[0].length;
      heightInput.value = state.board.length;
      tileSizeInput.value = state.tileSize;
      render();
    } catch (e) {
      alert("Invalid JSON");
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}