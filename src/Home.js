import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() !== "") {
      navigate("/game");
    }
  };

  return (
    <div>
      <h1>Welcome to the Memory Game!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Start game</button>
      </form>
    </div>
  );
}

export default Home;
