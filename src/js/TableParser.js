import { setTimeout } from 'core-js';

export default class TableParser {
  constructor(json, el) {
    this.el = el;
    this.json = json;
  }

  drawTable() {
    // Headers
    const tableHeaders = document.createElement('tr');
    const idHeader = document.createElement('td');
    idHeader.textContent = 'id';
    idHeader.dataset.id = 'id';
    const titleHeader = document.createElement('td');
    titleHeader.textContent = 'title';
    titleHeader.dataset.title = 'title';
    const imdbHeader = document.createElement('td');
    imdbHeader.textContent = 'imdb';
    imdbHeader.dataset.imdb = 'imdb';
    const yearHeader = document.createElement('td');
    yearHeader.textContent = 'year';
    yearHeader.dataset.year = 'year';
    this.el.appendChild(tableHeaders);
    tableHeaders.appendChild(idHeader);
    tableHeaders.appendChild(titleHeader);
    tableHeaders.appendChild(imdbHeader);
    tableHeaders.appendChild(yearHeader);
    // Content
    for (const item of this.json) {
      const newRow = document.createElement('tr');
      const idCell = document.createElement('td');
      idCell.textContent = item.id;
      newRow.dataset.id = item.id;
      const titleCell = document.createElement('td');
      titleCell.textContent = item.title;
      newRow.dataset.title = item.title;
      const imdbCell = document.createElement('td');
      imdbCell.textContent = item.imdb;
      newRow.dataset.imdb = item.imdb;
      const yearCell = document.createElement('td');
      yearCell.textContent = item.year;
      newRow.dataset.year = item.year;
      this.el.appendChild(newRow);
      newRow.appendChild(idCell);
      newRow.appendChild(titleCell);
      newRow.appendChild(imdbCell);
      newRow.appendChild(yearCell);
    }
  }

  startSorting() {
    const rowsArr = Array.from(this.el.querySelectorAll('tr'));
    rowsArr.shift();
    const rowHeaderArr = Array.from(this.el.querySelector('tr').querySelectorAll('td'));
    const dataArr = ['id', 'title', 'imdb', 'year'];
    let iterator = 0;
    const sortByItem = () => {
      rowsArr.sort((a, b) => {
        if (a.dataset[dataArr[iterator]] > b.dataset[dataArr[iterator]]) {
          return 1;
        }
        if (a.dataset[dataArr[iterator]] < b.dataset[dataArr[iterator]]) {
          return -1;
        }
        return 0;
      });
      if (rowHeaderArr[iterator - 1]) {
        rowHeaderArr[iterator - 1].style.backgroundColor = 'purple';
      } else if (rowHeaderArr[rowHeaderArr.length - 1]) {
        rowHeaderArr[rowHeaderArr.length - 1].style.backgroundColor = 'purple';
      }
      if (iterator < dataArr.length - 1) {
        iterator += 1;
      } else iterator = 0;
      setTimeout(sortByItem, 1000);
      if (iterator - 1 === -1) {
        rowHeaderArr[rowHeaderArr.length - 1].style.backgroundColor = 'red';
      } else {
        rowHeaderArr[iterator - 1].style.backgroundColor = 'red';
      }
      for (const item of rowsArr) {
        this.el.insertBefore(item, null);
      }
    };
    sortByItem();
  }
}
