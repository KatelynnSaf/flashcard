import React from "react";
import { Link } from "react-router-dom";

// define function to display a card front/back with edit and delete buttons
function Card({ card, handleCardDelete }) {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="card">
          <div className="card-body row">
            <p className="card-text col-6">{card.front}</p>
            <p className="card-text col-6">{card.back}</p>
          </div>
          <div className="row">
            <div>
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
  );
}

export default Card;
