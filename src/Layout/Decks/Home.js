import React from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";

function Home({ decks, setDecks }) {

    return (
        <div>
            <div>
                <Link to="/decks/new"><button className="btn btn-primary btn-large"><i className="bi bi-plus"></i>Create Deck</button></Link>
            </div>
             <DeckList decks={decks} setDecks={setDecks}/>
        </div>
    )
}

export default Home;