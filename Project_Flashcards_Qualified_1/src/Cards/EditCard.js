import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CardForm from "./CardForm";
import BreadCrumb from "../Common/BreadCrumb";
import { readDeck, readCard, updateCard } from "../../utils/api/index";

function EditCard() {
  // define deckId and cardId from parameters, initialize history for navigation after submit, initialize state variables for deck and card
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  // load deck and card when deckId or cardId change
  useEffect(() => {
    const loadDeck = async () => setDeck(await readDeck(deckId));
    loadDeck();
    const loadCard = async () => setCard(await readCard(cardId));
    loadCard();
  }, [deckId, cardId]);
  // handle change in form
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };
  // handle submit button to update card in deck and return to deck view
  const handleSubmit = (event) => {
    event.preventDefault();
    async function editCardData() {
      const abortController = new AbortController();
      try {
        const targetCard = await updateCard(card, abortController.signal);
        history.push(`/decks/${targetCard.deckId}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    editCardData();
  };
  // return edit form filled with card data with cancel/submit buttons, include breadcrumb at top of page
  return (
    <div>
      <BreadCrumb
        link={`/decks/${deckId}`}
        linkName={`Deck ${deck.name}`}
        pageName={`Edit Card ${cardId}`}
      />
      <div className="row w-100">
        <CardForm
          formData={card}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="row w-100">
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-1">
          Cancel
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditCard;
