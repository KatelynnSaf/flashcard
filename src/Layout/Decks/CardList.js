import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteCard, updateDeck } from "../../utils/api/index";

function CardList({ deck }) {
  // initialize deckId from url parameters
  const { deckId } = useParams();

  // delete a card
  const handleCardDelete = async ({ target }) => {
    const confirm = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirm) {
      await deleteCard(target.value)
        .then(updateDeck(deckId))
        .then(window.location.reload());
    }
  };

  return (
    <div className="container">
      <h2>Cards</h2>
      <div className="card-list">
        {deck.cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-body">
              <div className="container">
                <div className="row justify-content-start my-2">
                  <div className="col-6">{card.front}</div>
                  <div className="col-6">{card.back}</div>
                  <div className="row">
                    <div className="col-9"></div>
                    <div className="col-3 py-2">
                      <Link to={`/decks/${card.deckID}/cards/${card.id}/edit`}>
                        <button className="btn btn-secondary mr-1">
                          <i className="bi bi-pencil-square mr-1"></i>
                          Edit
                        </button>
                      </Link>
                      <button
                        value={card.id}
                        className="btn btn-danger"
                        onClick={handleCardDelete}
                      >
                        <i value={card.id} className="bi bi-trash3 mr-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
