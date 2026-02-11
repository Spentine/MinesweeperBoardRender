class MinesweeperRenderer {
  /*
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
  */
  
  static imageLinks = {
    closed: "https://minesweeper.online/img/skins/hdd/closed.svg",
    type0: "https://minesweeper.online/img/skins/hdd/type0.svg",
    type1: "https://minesweeper.online/img/skins/hdd/type1.svg",
    type2: "https://minesweeper.online/img/skins/hdd/type2.svg",
    type3: "https://minesweeper.online/img/skins/hdd/type3.svg",
    type4: "https://minesweeper.online/img/skins/hdd/type4.svg",
    type5: "https://minesweeper.online/img/skins/hdd/type5.svg",
    type6: "https://minesweeper.online/img/skins/hdd/type6.svg",
    type7: "https://minesweeper.online/img/skins/hdd/type7.svg",
    type8: "https://minesweeper.online/img/skins/hdd/type8.svg",
    flag: "https://minesweeper.online/img/skins/hdd/flag.svg",
    mine: "https://minesweeper.online/img/skins/hdd/mine.svg",
    topLeftCorner: "https://minesweeper.online/img/skins/hdd/corner_up_left_2x.png",
    topRightCorner: "https://minesweeper.online/img/skins/hdd/corner_up_right_2x.png",
    bottomLeftCorner: "https://minesweeper.online/img/skins/hdd/corner_bottom_left_2x.png",
    bottomRightCorner: "https://minesweeper.online/img/skins/hdd/corner_bottom_right_2x.png",
    borderHorizontal: "https://minesweeper.online/img/skins/hdd/border_hor_2x.png",
    borderVertical: "https://minesweeper.online/img/skins/hdd/border_vert_2x.png",
  };
  
  
  static shortNames = {
    "C": "closed",
    " ": "closed",
    "-": "closed",
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
  
  static html(inputState, tileCall) {
    const state = {};
    state.board = inputState.board ?? [];
    state.tileSize = inputState.tileSize ?? 48;
    state.highlight = inputState.highlight ?? (
      new Array(state.board.length)
        .fill(new Array(state.board[0]?.length ?? 0)
          .fill(null)
        )
    );
    
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
        
        const noDrag = `
          user-drag: none;
          -webkit-user-drag: none;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
        `;
        
        const tile = document.createElement("div");
        tile.classList.add("tile");
        
        // render image
        const image = document.createElement("img");
        image.src = MinesweeperRenderer.imageLinks[type];
        image.style = noDrag;
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
        
        if (tileCall) {
          tileCall(tile, x, y);
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