const commentContainer = document.querySelector('#comment-container');

const createElement = (elementType = 'div', properties = {}, ...children) => {
  const newElement = document.createElement(elementType);
  for (let key in properties) {
    newElement[key] = properties[key];
  }
  children.forEach((child) => {
    newElement.appendChild(child);
  });
  return newElement;
};

const createComment = (author, message, settings) => {
  // P tags for author and name
  const pAuthor = createElement('p', {
    textContent: author,
    className: 'text-bold author',
  });
  const pMessage = createElement('p', {
    textContent: message,
    className: 'comment-text',
  });
  // Btns to reply edit delete
  const buttons = [];
  const replyBtn = createElement('button', {
    textContent: 'reply',
    className: 'btn btn-primary small',
    id: 'replyBtn',
  });
  buttons.push(replyBtn);

  if (settings.hasEdit) {
    const editBtn = createElement('button', {
      textContent: 'edit',
      className: 'btn btn-primary small',
      id: 'editBtn',
    });
    buttons.push(editBtn);
  }

  if (settings.hasDelete) {
    const deleteBtn = createElement('button', {
      textContent: 'delete',
      className: 'btn btn-primary small',
      id: 'deleteBtn',
    });
    buttons.push(deleteBtn);
  }

  const buttonContainer = createElement(
    'div',
    { className: 'btn-holder' },
    ...buttons
  );
  // Div for the whole comment
  const commentDiv = createElement(
    'div',
    { className: 'comment-container' },
    pAuthor,
    pMessage,
    buttonContainer
  );

  // FIXME: Adding main comment will add it to every comment
  // if (settings.mainComment) commentDiv.classList.add('main-comment');

  return commentDiv;
};

const createCommentReply = () => {
  const authorInput = createElement('input', {
    className: 'text-bold author',
    placeholder: 'Your name',
  });
  const commentInput = createElement('input', {
    className: 'comment-text',
    placeholder: 'comment',
  });
  const postBtn = createElement('button', {
    textContent: 'Post',
    className: 'btn btn-primary small',
    id: 'postBtn',
  });
  const cancelBtn = createElement('button', {
    textContent: 'Cancel',
    className: 'btn btn-primary small',
    id: 'cancelBtn',
  });
  const btnContainer = createElement(
    'div',
    { className: 'btn-holder' },
    postBtn,
    cancelBtn
  );
  return createElement(
    'div',
    {
      className: 'comment-container',
    },
    authorInput,
    commentInput,
    btnContainer
  );
};

// ----------- Button callbacks ----------------

const handleEditBtnClick = (event, commentDiv) => {
  const textInput = commentDiv.querySelector('.comment-text');
  const editBtn = commentDiv.querySelector('#editBtn');
  if (editBtn.textContent === 'edit') {
    textInput.contentEditable = true;
    textInput.focus();
    editBtn.textContent = 'save';
  } else {
    textInput.contentEditable = false;
    editBtn.textContent = 'edit';
  }
};

const handlePostBtnClick = (event, commentDiv) => {
  const commentText = commentDiv.querySelector('input.comment-text').value;
  console.log(commentText);
  const author = commentDiv.querySelector('input.author').value;
  console.log(author);
  const newComment = createComment(author, commentText, {
    hasDelete: true,
    hasEdit: true,
    mainComment: false,
  });
  commentDiv.replaceWith(newComment);
};

const handleContainerClick = (event) => {
  const commentDiv = event.target.closest('.comment-container');
  // console.log(event.target);
  if (event.target.id === 'editBtn') {
    handleEditBtnClick(event, commentDiv);
  }
  if (event.target.matches('#replyBtn')) {
    //TODO: Move to own function
    //TODO: Comment nestring
    const commentInput = createCommentReply();
    commentDiv.appendChild(commentInput);
  }
  if (event.target.matches('#deleteBtn')) {
    commentDiv.remove();
  }
  if (event.target.matches('#postBtn')) {
    handlePostBtnClick(event, commentDiv);
  }
  if (event.target.matches('#cancelBtn')) {
    commentDiv.remove();
  }
};

// Initial comment
const comment = createComment('Sadanand', 'Hello, world', {
  hasDelete: false,
  hasEdit: false,
  mainComment: true,
});
commentContainer.appendChild(comment);

const createListeners = (commentContainer) => {
  commentContainer.addEventListener('click', handleContainerClick);
};
createListeners(commentContainer);
