class MinesweeperRenderer {
  constructor() {}
  
  static imageLinks = {
    closed: "images/closed.svg",
    type0:  "images/type0.svg",
    type1:  "images/type1.svg",
    type2:  "images/type2.svg",
    type3:  "images/type3.svg",
    type4:  "images/type4.svg",
    type5:  "images/type5.svg",
    type6:  "images/type6.svg",
    type7:  "images/type7.svg",
    type8:  "images/type8.svg",
    flag:   "images/flag.svg",
    mine:   "images/mine.svg",
    topLeftCorner: "images/topLeftCorner.png",
    topRightCorner: "images/topRightCorner.png",
    bottomLeftCorner: "images/bottomLeftCorner.png",
    bottomRightCorner: "images/bottomRightCorner.png",
    borderHorizontal: "images/borderHorizontal.png",
    borderVertical: "images/borderVertical.png",
  };
  
  static shortNames = {
    " ": "closed",
    "0": "type0",
    "1": "type1",
    "2": "type2",
    "3": "type3",
    "4": "type4",
    "5": "type5",
    "6": "type6",
    "7": "type7",
    "8": "type8",
    "F": "flag",
    "M": "mine",
    "UL": "topLeftCorner",
    "UR": "topRightCorner",
    "DL": "bottomLeftCorner",
    "DR": "bottomRightCorner",
    "BT": "borderHorizontal",
    "BR": "borderVertical",
    "BD": "borderHorizontal",
    "BL": "borderVertical",
  };
  
  html(state) {
    const height = state.board.length;
    const width = state.board[0].length;
    const scale = state.tileSize / 94;
    
    const rows = document.createElement("div");
    rows.style.display = "flex";
    rows.style.width = "fit-content";
    rows.style.flexDirection = "column";
    
    for (let y = 0; y < height; y++) {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.width = "fit-content";
      rows.appendChild(row);
      
      for (let x = 0; x < width; x++) {
        const tileState = state.board[y][x];
        const type = MinesweeperRenderer.shortNames[tileState];
        
        const tile = document.createElement("div");
        tile.classList.add("tile");
        
        // render image
        const image = document.createElement("img");
        image.src = MinesweeperRenderer.imageLinks[type];
        image.style.display = "block";
        tile.appendChild(image);
        
        if ([
          "topLeftCorner", "topRightCorner", "bottomLeftCorner", "bottomRightCorner"
        ].includes(type)) {
          image.style.imageRendering = "pixelated";
          image.style.width = `${24 * scale}px`;
          image.style.height = `${22 * scale}px`;
        } else {
          image.style.width = `${94 * scale}px`;
          image.style.height = `${94 * scale}px`;
        }
        
        if (type === "borderHorizontal") {
          image.style.width = `${94 * scale}px`;
          image.style.height = `${22 * scale}px`;
          image.style.imageRendering = "pixelated";
        } else if (type === "borderVertical") {
          image.style.width = `${24 * scale}px`;
          image.style.height = `${94 * scale}px`;
          image.style.imageRendering = "pixelated";
        }
        
        // render highlight
        const highLightState = state.highlight?.[y]?.[x];
        if (highLightState) {
          const highlight = document.createElement("div");
          highlight.classList.add("highlight");
          highlight.style.position = "absolute";
          highlight.style.width = image.style.width;
          highlight.style.height = image.style.height;
          highlight.style.transform = `translateY(-100%)`;
          highlight.style.backgroundColor = highLightState;
          tile.appendChild(highlight);
        }
        
        row.appendChild(tile);
      }
    }
    
    return rows;
  }
  
  static addBorders(board) {
    const height = board.length;
    const width = board[0].length;
    
    const top = ["UL", ...Array(width).fill("BT"), "UR"];
    const bottom = ["DL", ...Array(width).fill("BD"), "DR"];
    
    return [
      top,
      ...board.map(row => ["BL", ...row, "BR"]),
      bottom,
    ];
  }
  
  static padBorders(board) {
    const height = board.length;
    const width = board[0].length;
    
    const top = [null, ...Array(width).fill(null), null];
    const bottom = [null, ...Array(width).fill(null), null];
    
    return [
      top,
      ...board.map(row => [null, ...row, null]),
      bottom,
    ];
  }
}

export { MinesweeperRenderer };