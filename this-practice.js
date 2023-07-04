class Person {
  constructor(name) {
    this.name = name;
  }

  printNameArrow() {
    let greet = () => console.log('Arrow:', this.name);
    greet();
  }

  printNameFunction() {
    console.log('Function:', this.name);
  }

  printNameArrowTimeout() {
    setTimeout(() => {
      console.log('Arrow timeout:', this.name);
    }, 0);
  }

  printNameFunctionTimeout() {
    setTimeout(function () {
      console.log('Function timeout:', this.name);
    }, 0);
  }
}

const person = new Person('Bob');

person.printNameArrow(); // This is same as where function is defined (in class)
person.printNameFunction(); // Why is this not defined from where function is called?
person.printNameArrowTimeout(); // This works because arrow function doesn't have its own this?
person.printNameFunctionTimeout(); // This is defined from where function is called?

const obj = {
  props: [1, 2, 3],
  getPropsArrow() {
    this.props.forEach(() => {
      //This works because arrow function doesn't have its own this?
      // It grabs this from lexical environment.
      console.log(this.props);
    });
  },
  getPropsFunction() {
    this.props.forEach(function () {
      // This prints global object because for each applies a callback function
      // Which is called by global object and regular function holds onto caller as this
      console.log(this.props);
    });
  },
};

obj.getPropsArrow();
obj.getPropsFunction();

console.log('VIDEO EXAMPLE');

const video = {
  title: 'movie',
  tags: ['a', 'b', 'c'],
  showTags() {
    this.tags.forEach(function (tag) {
      // THIS DOESN'T WORK
      // This references global object because we're inside the calback function not a method in the video object
      // and a regular function expression creates its own this from where it's called (callback called by global obj)
      // tag is fine as it's passed as argument to callback function
      console.log(tag, this.title);
    });
  },
  showTagsArrow() {
    this.tags.forEach((tag) => {
      // WORKS
      // Arrow function just grabs this from lexical environment (object method in this case)
      console.log(tag, this.title);
    });
  },
};

video.showTags();
video.showTagsArrow();
