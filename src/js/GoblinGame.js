import { randomIndex, insertImage } from './utils';

export default class GoblinGame {
  constructor(el) {
    this.el = el;
    this.index = randomIndex(16);
  }

  drawTable() {
    const scriptTag = this.el.querySelector('script');
    for (let i = 0; i < 16; i += 1) {
      const newDiv = document.createElement('div');
      newDiv.dataset.index = i;
      this.el.insertBefore(newDiv, scriptTag);
    }
  }

  startGame() {
    const newImg = document.createElement('img');
    const newInsertFunction = () => {
      const newRandomIndex = randomIndex(this.index);
      this.index = newRandomIndex;
      insertImage(this.el, newImg, newRandomIndex);
    };
    setInterval(newInsertFunction, 1000);
  }
}
