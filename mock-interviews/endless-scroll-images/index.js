// Checking when reaching bottom of page.
// Load images from API and append to container
// Fetch images from API and process

const imageContainer = document.querySelector('.container');

const imageRequest = async (offset, numImages) => {
  const apiData = await fetch(
    `https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=${numImages}`
  );
  const jsonData = await apiData.json();
  if (!apiData.ok) console.error('Api call fail');
  return jsonData;
};

const loadMoreImages = () => {
  let offset = 0;
  const imageJump = 20;
  let numImages = imageJump;
  return async () => {
    const imageArray = [];
    //TODO: Get number of images based on parameter
    try {
      // Image data
      const imageData = await imageRequest(offset, numImages);
      const photoArray = imageData.photos;
      for (element of photoArray) {
        const newImage = document.createElement('img');
        newImage.src = element.url;
        newImage.width = '250';
        imageArray.push(newImage);
      }
      displayImages(imageContainer, imageArray);
    } catch (e) {
      console.log('Results processing failed');
      console.error(e);
    }
    offset += 20;
    numImages += 20;
    console.log(offset, numImages);
    return imageArray;
  };
};

const displayImages = (container, arr) => {
  arr.forEach((image) => {
    container.append(image);
  });
};

const loadImages = loadMoreImages();
loadImages();
// check if reached end of page
window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    console.log('Bottom of page reached');
    loadImages();
  }
};
