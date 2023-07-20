class Carousel {
  constructor(carousel, images, leftHandle, rightHandle, selected = 0) {
    this.carousel = carousel;
    this.images = images;
    this.leftHandle = leftHandle;
    this.rightHandle = rightHandle;
    this.selected = selected;

    // Initialise carousel
    this.loadImages();
    this.addListeners();
    this.displayImage();
    this.displayDots();
    this.updateSelection();
  }

  addListeners() {
    const leftButton = document.querySelector('#leftHandle');
    const rightButton = document.querySelector('#rightHandle');
    leftButton.addEventListener('click', this.swipeLeft);
    rightButton.addEventListener('click', this.swipeRight);
  }

  loadImages() {
    const imageFrame = document.createElement('div');
    imageFrame.classList.add('img-frame');
    const imageHolder = document.createElement('div');
    imageHolder.classList.add('img-holder');
    this.images.forEach((image) => {
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', image);
      imageElement.classList.add('img');
      imageHolder.appendChild(imageElement);
    });
    imageFrame.appendChild(imageHolder);
    this.carousel.appendChild(imageFrame);
  }

  swipeLeft = () => {
    // This is an arrow function so it doesn't create its own this, uses lexical environment instead
    this.selected -= 1;
    if (this.selected < 0) this.selected = this.images.length - 1;
    this.updateSelection();
  };

  swipeRight = () => {
    this.selected += 1;
    this.selected %= this.images.length;
    this.updateSelection();
  };

  updateSelection() {
    const imageHolder = this.carousel.querySelector('.img-holder');
    imageHolder.style.transform = `translateX(${256 * -this.selected}px)`;
    this.highlightDot();
  }

  displayDots() {
    const dotHolder = document.createElement('div');
    dotHolder.classList.add('dot-holder');
    for (let i = 0; i < this.images.length; i++) {
      const circleNode = document.createElement('span');
      circleNode.dataset.index = i;
      circleNode.classList.add('dot');
      dotHolder.appendChild(circleNode);
    }
    this.carousel.appendChild(dotHolder);
  }

  highlightDot() {
    const dotArray = this.carousel.querySelectorAll('.dot');
    dotArray.forEach((dot) => {
      dot.classList.remove('selected');
      if (Number(dot.dataset.index) === this.selected) {
        dot.classList.add('selected');
      }
    });
  }
}

const carousel = document.querySelector('#carousel');
const leftHandle = document.querySelector('#leftHandle');
const rightHandle = document.querySelector('#rightHandle');
const data = [
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
];

const myCarousel = new Carousel(carousel, data, leftHandle, rightHandle);
