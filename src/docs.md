Board Render Format:

```js
data = {
  board: [] // string[][]
  tileSize: 48 // number
  highlight: [] // {string | null}[][] 
}
```

Minesweeper Class:

- `type` attribute: `simple` or `json`

Simple Specification:

- `border` attribute: boolean
- `textContent`: board