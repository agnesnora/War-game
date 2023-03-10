let deckid = "";
let dataArray = [];
const cardsContainer = document.getElementById("cards");
const scoreContainer = document.getElementById("score");
const newDeckBtn = document.getElementById("nextDeckBtn");
const drawBtn = document.getElementById("getTwo");
const message = document.getElementById("message");
const remaining = document.getElementById("remaining");
let computerScore = 0;
let yourScore = 0;

newDeckBtn.addEventListener("click", handleClick);

function handleClick() {
  drawBtn.disabled = false;
  // drawBtn.classList.remove("disabled");

  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      deckid = data.deck_id;
      console.log(deckid);
      remaining.textContent = `Remaining cards: 54`;
    });
}

drawBtn.addEventListener("click", function () {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckid}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log("remaining:", data.remaining);

      remaining.textContent = `Remaining cards: ${data.remaining}`;
      let card1Value = data.cards[0].value;
      console.log(card1Value);
      let card2Value = data.cards[1].value;
      console.log(card2Value);

      // determineCardWinner(card1Value, card2Value);
      cardsContainer.children[0].innerHTML = `
      <h4>Computer's score: ${computerScore}</h4>`;
      cardsContainer.children[1].innerHTML = `
      <img src=${data.cards[0].image} class="card"/>`;
      cardsContainer.children[2].innerHTML = `
      <img src=${data.cards[1].image} class="card">`;
      cardsContainer.children[3].innerHTML = `
      <h4>Your score: ${yourScore}</h4>
      `;

      const winnerText = determineCardWinner(card1Value, card2Value);
      message.textContent = winnerText;

      if (data.remaining === 0) {
        if (computerScore > yourScore) {
          message.textContent = `The computer is the winner`;
        } else if (yourScore > computerScore) {
          message.textContent = `you are the winner`;
        } else if (yourScore === computerScore) {
          message.textContent = `its a tie`;
        }

        drawBtn.disabled = true;
        computerScore = 0;
        yourScore = 0;
      }

      // if (data.remaining === 0) {
      //   console.log("ez man nulla");
      //   const finalWinner = winnerOfGame();
      //   message.textContent = finalWinner;

      //   drawBtn.disabled = true;
      // }
      // remaining.textContent = `Remaining cards: ${data.remaining}`;
    });
});
function determineCardWinner(card1, card2) {
  const cardValueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  const card1ValueIndex = cardValueOptions.indexOf(card1);
  const card2ValueIndex = cardValueOptions.indexOf(card2);

  console.log("1:", card1ValueIndex);
  console.log("2:", card2ValueIndex);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    console.log("computer:", computerScore);
    return `Computer wins`;
  } else if (card2ValueIndex > card1ValueIndex) {
    yourScore++;
    console.log("your:", yourScore);
    return `You win`;
  } else {
    return `war`;
  }
}

// function disableButton() {
//   drawBtn.disabled = true;
//   drawBtn.classList.add("disabled");
// }
// function enableButton() {
//   drawBtn.disabled = false;
//   drawBtn.classList.remove("disabled");
// }
//  * Challenge:
//  *
//  * Try to determine which of the 2 cards is the "winner" (has higher value)
//  * Aces are the card with the highest "score"
//  *
//  * In parts:
//  *
//  * 1. Create a function that takes 2 card objects as parameters,
//  * `card1` and `card2`. These card objects have a property called
//  * `value`, which can be any one of the following strings, in
//  * order of rising "score":
//  *
//  * "2", "3", "4", "5", "6", "7", "8", "9",
//  * "10", "JACK", "QUEEN", "KING", "ACE"
//  *
//  * I.e. "2" is the lowest score and "ACE" is the highest.
//  *
//  * The function should determine which of the 2 cards (`card1`
//  * or `card2`) has the higher score, or if they have the same score.
//  *
//  * Log which card wins (or "It's a tie!"
//  * if they're the same) to the console
//  */
// /**
//  * Challenge
//  *
//  * Background:
//  * The Deck of Cards API expects us to provide the deck id
//  * of the deck we're playing with so it can remember which
//  * cards we've already drawn, how many are remaining in the
//  * deck, etc.
//  *
//  * Task: save the deck_id from the returned data to a local
//  * variable so we can use it later
//  */

// /**
//  * Challenge
//  *
//  * Task: Using the saved deckId, draw 2 new cards from the deck
//  *
//  * Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
//  * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
//  * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
//  * that you'll see in the deck of cards API docs.
//  *
//  * 1. Create a new button that, when clicked, draws 2 cards from the deckId
//  * you have saved
//  *      Note: you'll need to get a new deck every time you refresh the page,
//  *      since you're only saving your deckId in a local variable right now
//  * 2. Log those 2 cards to the console
//  */
// /**
//  * Challenge:
//  *
//  * Start making this look lots nicer :)
//  *
//  * 1. Add a card table background with the img/table.png image provided.
//  * 2. Move the draw button to the very bottom of the page, full width
//  * 3. Add some button styles. You can use the photo on the slides
//  * for one option.
//  */
