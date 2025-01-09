const axios = require('axios');
const cheerio = require('cheerio');

async function decodeSecretMessage(docUrl) {
  try {
    const response = await axios.get(docUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const rows = $('table tr');
    const data = [];

    rows.each((index, row) => {
      const cells = $(row).find('td');
      if (cells.length === 3) {
        const x = parseInt($(cells[0]).text().trim(), 10);
        const char = $(cells[1]).text().trim();
        const y = parseInt($(cells[2]).text().trim(), 10);
        if (!isNaN(x) && !isNaN(y) && char) {
          data.push({ x, char, y });
        }
      }
    });

    if (data.length === 0) {
      console.log("No valid data found in the document.");
      return;
    }

    const maxX = Math.max(...data.map(d => d.x));
    const maxY = Math.max(...data.map(d => d.y));

    const grid = Array.from({ length: maxX + 1 }, () => Array(maxY + 1).fill(' '));

    data.forEach(item => {
      if (item.x >= 0 && item.y >= 0) {
        grid[item.x][item.y] = item.char;
      }
    });

    grid.forEach(row => {
      console.log(row.join(''));
    });

  } catch (error) {
    console.error("Error fetching or parsing the document:", error);
  }
}

const docUrl = 'https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub';
decodeSecretMessage(docUrl);