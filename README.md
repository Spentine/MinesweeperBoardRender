# Minesweeper Board Render

A simple program that renders Minesweeper board states more beautifully for sites, in particular more wiki-oriented sites. I haven't found anything like it online, so I decided to make my own for the sake of having well-rendered boards. It was originally made so that I can create a more comprehensive list of patterns for myself.

## Assets

It uses images from **Minesweeper Online**. I chose it because the images for the tiles are SVGs, which allows for good scaling quality for the board renders.

## API

### Class `MinesweeperRenderer`

```js
MinesweeperRenderer.html({
  board: [] // string[][]
  tileSize: 48 // number
  highlight: [] // {string | null}[][] 
  borders: true // boolean
}); // => HTMLElement
```

### Tag `minesweeper`

Simple mode renders the board from a human readable source.

```html
<minesweeper-board>
  1 2 3
  4 5 6
  7 8 0
  - F M
</minesweeper-board>
```

JSON mode renders the board from a JSON as specified by `MinesweeperRenderer`.

```html
<minesweeper-board type="json">
  {
    "board": [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "0"],
      [" ", "F", "M"]
    ],
    
    "highlight": [
      [null, null, null],
      [null, "#00ff0040", null],
      [null, null, null],
      [null, null, null]
    ]
  }
</minesweeper-board>
```