import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import BreadCrumb from "../Common/BreadCrumb";
import { readDeck, createCard } from "../../utils/api/index";

function CreateNewCard() {
  // get deck id from url parameters
  const { deckId } = useParams();
  // define initial form state
  const initialFormState = {
    front: "",
    back: "",
    deckId: deckId,
    id: 0,
  };
  // initialize state variables for deck and form data
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ ...initialFormState });
  // handle change function for form
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // add new card to deck using createCard(), then clear the form. Catch errors, ignoring abort controller
    async function newCard() {
      try {
        await createCard(deckId, formData);
        setFormData({ ...initialFormState });
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    newCard();
  };
  // load a new deck whenever deckId changes
  useEffect(() => {
    async function loadDeck() {
      const targetDeck = await readDeck(deckId);
      setDeck(targetDeck);
    }
    loadDeck();
  }, [deckId]);

  // return form for card creation with breadcrumb feature and buttons for returning to deck and saving new card
  return (
    <div>
      <BreadCrumb
        link={`/decks/${deckId}`}
        linkName={deck.name}
        pageName={"Add Card"}
      />
      <div className="row">
        <h2>{deck.name}: Add Card</h2>
        <br />
      </div>
      <div className="row"> 
        <CardForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <br />
      </div>
      <div className="row">
        {/* done button to return to deck */}
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">
          Done
        </Link>
        {/* save button to handle submit */}
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

export default CreateNewCard;
