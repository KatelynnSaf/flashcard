import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import BreadCrumb from "../Common/BreadCrumb";
import CardList from "./CardList";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});

  // load deck with readDeck()
  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const targetDeck = await readDeck(deckId);
        setDeck(() => targetDeck);
      }
    }
    loadDeck();
  }, [deckId]);

  // handle deck deletion using deleteDeck() and return to home view
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmDelete) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  // after deck load, render the deck name, description, buttons for edit, study, add and delete card, and CardList component.
  if (deck.id) {
    return (
      <div>
        <BreadCrumb
          link={`/decks/${deckId}`}
          linkName={deck.name}
          pageName={deck.name}
        />
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="row justify-content-between">
          <div className="col-8">
            <Link to={`/decks/${deckId}/edit`}>
              <button className="btn btn-secondary mr-1">
                <i className="bi bi-pencil mr-1"></i>
                Edit
              </button>
            </Link>
            <Link to={`/decks/${deckId}/study`}>
              <button className="btn btn-primary mr-1">
                <i className="bi bi-book mr-1"></i>
                Study
              </button>
            </Link>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className="btn btn-primary mr-1">
                <i className="bi bi-plus mr-1"></i>
                Add Card
              </button>
            </Link>
            <div className="col-2">
              <button className="btn btn-danger" onClick={handleDelete}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <CardList deck={deck} />
      </div>
    );
  }
  // if there is no deck.id found, inform user and prompt to create new deck
  return "No deck here! Please create a new deck.";
}

export default Deck;
