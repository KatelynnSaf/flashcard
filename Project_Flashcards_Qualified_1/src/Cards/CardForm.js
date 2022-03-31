import React from "react";

// define CardForm component for use in editing and creating new cards
function CardForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">
        Front
        <br />
        <textarea
          name="front"
          id="front"
          className="form-control"
          value={formData.front}
          onChange={handleChange}
          placeholder="Card Front"
          style={{ width: "100%" }}
          required
          rows="10"
        />
      </label>
      <label htmlFor="back">
        Back
        <br />
        <textarea
          name="back"
          id="back"
          className="form-control"
          value={formData.back}
          onChange={handleChange}
          placeholder="Card Back"
          style={{ width: "100%" }}
          required
        />
      </label>
    </form>
  );
}

export default CardForm;
