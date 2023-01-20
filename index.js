document.getElementById("nextDeckBtn").addEventListener("click", handleClick);

let deckid = "";
let dataArray = [];

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckid = data.deck_id;
      console.log(deckid);
    });
}

document.getElementById("getTwo").addEventListener("click", function () {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckid}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dataArray = data.cards;

      dataArray.forEach(function (img) {
        document.getElementById(
          "cards"
        ).innerHTML += `<img src="${img.image}">`;
      });
    });
});

/**
 * Challenge
 *
 * Background:
 * The Deck of Cards API expects us to provide the deck id
 * of the deck we're playing with so it can remember which
 * cards we've already drawn, how many are remaining in the
 * deck, etc.
 *
 * Task: save the deck_id from the returned data to a local
 * variable so we can use it later
 */

/**
 * Challenge
 *
 * Task: Using the saved deckId, draw 2 new cards from the deck
 *
 * Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
 * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
 * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
 * that you'll see in the deck of cards API docs.
 *
 * 1. Create a new button that, when clicked, draws 2 cards from the deckId
 * you have saved
 *      Note: you'll need to get a new deck every time you refresh the page,
 *      since you're only saving your deckId in a local variable right now
 * 2. Log those 2 cards to the console
 */
