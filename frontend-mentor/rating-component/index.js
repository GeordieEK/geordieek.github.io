// Capture rating value

// globals
const ratingContainer = document.querySelector('#ratingContainer');
const numBtnContainer = document.querySelector('#numBtnContainer');
const submitBtn = document.querySelector('#submitBtn');
let chosenRating = null;

// Dynamically generate rating buttons 1-5
const generateNumBtns = (maxNum, container) => {
  for (let i = 1; i < maxNum + 1; i++) {
    const newBtn = document.createElement('button');
    newBtn.textContent = i;
    newBtn.classList.add('numBtn');
    container.append(newBtn);
  }
};

// on click, stay higlighted, save value clicked
numBtnContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('numBtn')) {
    chosenRating = event.target.innerText;
    const numBtns = document.querySelectorAll('.numBtn');
    numBtns.forEach((btn) => btn.classList.remove('clicked'));
    event.target.classList.add('clicked');
  }
});

// On submit, update container text to thankyou and chosen rating
submitBtn.addEventListener('click', () => {
  const thankyouText = `
  <p>You selected ${chosenRating} out of 5</p>
  <p>Thank you!</p>
  <p>We appreciate you taking the time to give a rating. </p> <p>If you ever need more support, 
  don’t hesitate to get in touch!</p>`;
  ratingContainer.innerHTML = thankyouText;
});
generateNumBtns(5, numBtnContainer);

//TODO: Dependency injection
