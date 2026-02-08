const downloadFiles = {
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

/*
  Use Deno to download the files and save them to images directory
*/

for (const [key, url] of Object.entries(downloadFiles)) {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  Deno.writeFile(`images/${key}.${url.split('.').pop()}`, buffer);
}