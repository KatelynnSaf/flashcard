import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";

function StudyCard({ cards }) {
  // set initial study session state
  const initialState = {
    onFront: true,
    cardNumber: 0,
  };

  const { deckId } = useParams();
  const history = useHistory();
  const [studySession, setStudySession] = useState({ ...initialState });

  const handleNext = () => {
    // handle next button click until no cards are left in the study session
    if (studySession.cardNumber < cards.length - 1) {
      setStudySession({
        ...studySession,
        cardNumber: studySession.cardNumber + 1,
        onFront: true,
      });
    } else {
      const confirm = window.confirm(
        "Restart cards? Click cancel to return to the home page."
      );
      if (confirm) {
        setStudySession(initialState);
      } else {
        history.push("/");
      }
    }
  };

  // handle card flip from front to back based on onFront key
  const handleFlip = () => {
    if (!studySession.onFront) {
      setStudySession({
        ...studySession,
        onFront: true,
      });
    } else {
      setStudySession({
        ...studySession,
        onFront: false,
      });
    }
  };

  // if there are at least 3 cards in a deck, use studySession state to render cards in order. create flip and next buttons.
  if (cards.length > 2) {
    return (
      <div className="container">
        <div className="card w-100">
          <div className="card-body">
            <h4 className="card-title">
              Card {studySession.cardNumber + 1} of {cards.length}
            </h4>
            <p className="card-text font-weight-lighter">
              {studySession.onFront
                ? cards[studySession.cardNumber].front
                : cards[studySession.cardNumber].back}
            </p>
            <button className="btn btn-secondary mr-1" onClick={handleFlip}>
              Flip
            </button>
            {!studySession.onFront && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    // if there are less than 3 cards, display a warning to the user and the option to add a card
    return (
      <React.Fragment>
        <h3>Not enough cards.</h3>
        <div className="row my-2">
          <p>
            You need at least 3 cards to study. This deck has {cards} cards.
          </p>
        </div>
        <div className="row">
          <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary">
              <i class="bi bi-plus mr-1"></i>
              Add Card
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default StudyCard;
