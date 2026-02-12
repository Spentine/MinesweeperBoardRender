import { MinesweeperRenderer } from "./boardRender.js";

function convertSimpleBoard(string) {
  const rows = string.trim().split("\n")
    .map(row => row.replaceAll(" ", ""));
  return rows.map(row => row.trim().split(""));
}

class Minesweeper extends HTMLElement {
  static observedAttributes = ["board", "tile-size", "highlight", "border", "type"];
  
  constructor() {
    super();
    
    this.border = true;
    this.tileSize = 48;
    this.type = "simple";
  }
  
  loadVisual() {
    if (this.type === "json") {
      this.loadJsonVisual();
    } else {
      this.loadSimpleVisual();
    }
  }
  
  loadSimpleVisual() {
    const state = {};
    state.board = convertSimpleBoard(this.textContent);
    this.innerHTML = "";
    
    if (this.border) {
      state.board = state.board;
    }
    
    const html = MinesweeperRenderer.html(state);
    this.appendChild(html);
  }
  
  loadJsonVisual() {
    const state = JSON.parse(this.textContent);
    this.innerHTML = "";
    
    if (this.border) {
      state.board = state.board;
      state.highlight = state.highlight;
    }
    
    const html = MinesweeperRenderer.html(state);
    this.appendChild(html);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "tile-size") {
      this.tileSize = parseInt(newValue);
    } else if (name === "border") {
      this.border = newValue === "true";
    } else if (name === "type") {
      this.type = newValue;
    }
  }
  
  connectedCallback() {
    this.loadVisual();
  }
}

customElements.define("minesweeper-board", Minesweeper);

export { Minesweeper };