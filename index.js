let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
    // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener('click', toggleDarkMode);

// Add your query for the sign now button here
let signNowButton = document.getElementById("sign-now-button");

const addSignature = (person) => {
    // Write your code to manipulate the DOM here
  const signText = document.createElement("p");
  signText.textContent = "️🖊️ " + person.name + " from " + person.hometown + " supports this.";

  let signaturesContainer = document.getElementsByClassName("signatures");
  signaturesContainer[0].appendChild(signText);

  const oldCount = document.getElementById("counter");
  oldCount.remove();
  count = count + 1;
  const newCount = document.createElement("p");
  newCount.id = "counter";
  newCount.textContent = "️🖊️ " + count + " people have signed this petition and support this cause.";

  signaturesContainer[0].appendChild(newCount);
}

let count = 4;

// TODO: Complete validation form

const validateForm = () => {

  let containsErrors = false;
  const email = document.getElementById('email');

  var petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }
  // TODO: Loop through all inputs
  for(let i = 0; i < petitionInputs.length; i++){
    // TODO: Validate the value of each input
    if(person.name.length < 2){
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  } 
  else {
    email.classList.remove('error');
  }

  // TODO: Call addSignature() and clear fields if no errors
  if(containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for(let i = 0; i < petitionInputs.length; i++){
      person = "";
      containsErrors = false;
    }
  }
}

signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: "2s",
  transitionProperty: "all",
  transitionTimingFunction: "ease"
}

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for(let i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if(topOfRevealableContainer < windowHeight - animation.revealDistance){
      revealableContainers[i].classList.add("active");
    }
    else{
      revealableContainers[i].classList.remove("active");
    }
  }
    
}

window.addEventListener('scroll', reveal);

let motionButton = document.getElementById("reduce-motion");

let reduceMotionAnimation = {
  transition: "none",
  transitionDuration: "5s",
  transitionProperty: "all",
  transitionTimingFunction: "ease"
}

const reduceMotion = () => {
  for(let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transition = reduceMotionAnimation.transition;
    revealableContainers[i].style.transitionDuration = reduceMotionAnimation.transitionDuration;
    revealableContainers[i].style.transitionProperty = reduceMotionAnimation.transitionProperty;
    revealableContainers[i].style.transitionTimingFunction = reduceMotionAnimation.transitionTimingFunction;
  }
}

motionButton.addEventListener('click', reduceMotion);

const toggleModal = (person) => {
    const modal = document.querySelector("#thanks-modal");
    const modalContent = document.querySelector("#thanks-modal-content");
    modal.style.display = "flex";
    modalContent.textContent = "Thank you for signing this petition, " + person.name + "!";
    let intervalId = setInterval(scaleImage, 500);
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(invervalId);
    }, 4000);
}

let scaleFactor = 1;
let modalImage = document.querySelector('.modal-content img');
const scaleImage = () => {
  if(scaleFactor === 1) {
    scaleFactor = 0.8;
  }
  else {
    scaleFactor = 1;
  }
  modalImage.style.transform = "scale(" + scaleFactor + ")";
}

let closeButton = document.getElementById("close-modal-button");
const closeModal = () => {
  const modal = document.querySelector("#thanks-modal");
   modal.style.display = "none";
}

closeButton.addEventListener("click", closeModal);