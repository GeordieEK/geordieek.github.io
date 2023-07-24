const getUserInput = (fieldset) => {
  const fieldsetData = Array.from(fieldset.children).filter((item) => {
    if (item.tagName === 'INPUT') return item;
  });

  return {
    title: fieldsetData[0].value,
    description: fieldsetData[1].value,
    rating: fieldsetData[2].value,
  };
};

const createReviewNode = ({ title, description, rating }) => {
  //FIXME: More accurate semantic html
  const reviewDiv = document.createElement('div');
  const titleDiv = document.createElement('h2');
  const descriptionDiv = document.createElement('p');
  const ratingDiv = document.createElement('h3');
  for (let i = 0; i < parseInt(rating); i++) {
    ratingDiv.innerText += '*';
  }
  titleDiv.contentEditable = true;
  descriptionDiv.contentEditable = true;
  ratingDiv.contentEditable = true;
  reviewDiv.classList.add('review');
  //TODO: ID?
  //TODO: Editable text
  titleDiv.innerText = title;
  descriptionDiv.innerText = description;
  reviewDiv.append(titleDiv, descriptionDiv, ratingDiv);
  return reviewDiv;
};

const postReview = (e, container, review, fieldset) => {
  container.append(review);
  //FIXME: Wrong place for sideeffect?
  const fieldsetChildren = Array.from(fieldset.children).filter((item) => {
    if (item.tagName === 'INPUT') return item;
  });
  fieldsetChildren.forEach((input) => (input.value = ''));
};

const createReview = (e, fieldset, container) => {
  const userInput = getUserInput(fieldset); //Object with user inputted data
  const reviewNode = createReviewNode(userInput);
  console.log(reviewNode);
  postReview(e, container, reviewNode, fieldset);
};

// Take in user-input
// Pass to create review and make a html node
// Append the new review to posted reviews
// Make sure that the posted reviews are editable (html attribute)
const fieldset = document.querySelector('#review-input-container');
const container = document.querySelector('#posted-reviews');
const postButton = fieldset.querySelector('#post-review-btn');

postButton.addEventListener('click', (e) => {
  createReview(e, fieldset, container);
});

//TODO:
// Enforce rating as number, throw alert when user tries to input invalid
// Styling
// Encapsulation

// Lessons:
// - Possibly modularising too much
// - Learn Formdata html element
// - Remember tagname not nodeType
// - Brush up on filter and reduce
