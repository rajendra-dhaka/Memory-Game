const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

playerLivesCount.textContent = playerLives;

const getData = () => [
  { imgSrc: "./images/javascript.jpg", name: "javascript" },
  { imgSrc: "./images/react.jpg", name: "react" },
  { imgSrc: "./images/mongodb.jpg", name: "mongodb" },
  { imgSrc: "./images/html.jpg", name: "html" },
  { imgSrc: "./images/sass.jpg", name: "sass" },
  { imgSrc: "./images/node.jpg", name: "node" },
  { imgSrc: "./images/css.jpg", name: "css" },
  { imgSrc: "./images/google.jpg", name: "google" },
  { imgSrc: "./images/javascript.jpg", name: "javascript" },
  { imgSrc: "./images/react.jpg", name: "react" },
  { imgSrc: "./images/mongodb.jpg", name: "mongodb" },
  { imgSrc: "./images/html.jpg", name: "html" },
  { imgSrc: "./images/sass.jpg", name: "sass" },
  { imgSrc: "./images/node.jpg", name: "node" },
  { imgSrc: "./images/css.jpg", name: "css" },
  { imgSrc: "./images/google.jpg", name: "google" },
];

//Randomize the card data
const randomize = () => {
  const cardData = getData();
  //Method to randomize an array data
  return cardData.sort(() => Math.random() - 0.5);
};

//Card Generator
const cardGenerator = () => {
  const cardData = randomize();
  //Generate HTML

  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList.add("card");
    face.classList.add("face");
    back.classList.add("back");
    //Attach the info to the card
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attach the cards to the Section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//Check Cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("👎Try Again");
      }
    }
  }
  //Run a check for win
  if (toggleCard.length === 16) {
    restart("🤘You Won");
  }
};

//Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => {
    window.alert(text);
  }, 100);
};
cardGenerator();
