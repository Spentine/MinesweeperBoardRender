const downloadFiles = {
  closed: "https://minesweeper.online/img/skins/hdd/closed.svg?v=16",
  type0: "https://minesweeper.online/img/skins/hdd/type0.svg?v=16",
  type1: "https://minesweeper.online/img/skins/hdd/type1.svg?v=16",
  type2: "https://minesweeper.online/img/skins/hdd/type2.svg?v=16",
  type3: "https://minesweeper.online/img/skins/hdd/type3.svg?v=16",
  type4: "https://minesweeper.online/img/skins/hdd/type4.svg?v=16",
  type5: "https://minesweeper.online/img/skins/hdd/type5.svg?v=16",
  type6: "https://minesweeper.online/img/skins/hdd/type6.svg?v=16",
  type7: "https://minesweeper.online/img/skins/hdd/type7.svg?v=16",
  type8: "https://minesweeper.online/img/skins/hdd/type8.svg?v=16",
  flag: "https://minesweeper.online/img/skins/hdd/flag.svg?v=16",
  mine: "https://minesweeper.online/img/skins/hdd/mine.svg?v=16",
};

/*
  Use Deno to download the files and save them to images directory
*/

for (const [key, url] of Object.entries(downloadFiles)) {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  Deno.writeFile(`images/${key}.svg`, buffer);
}