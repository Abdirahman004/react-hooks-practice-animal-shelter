import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
import data from "../db.json"; // Importing the data from db.json

function App() {
  const [pets, setPets] = useState([]);  // Store the list of pets
  const [filters, setFilters] = useState({ type: "all" });  // Store the selected animal type

  // Callback to change the selected type of animal
  const onChangeType = (type) => {
    setFilters({ ...filters, type });
  };

  // Callback to fetch the pets based on the selected filter
  const onFindPetsClick = () => {
    let filteredPets = data.pets;
    if (filters.type !== "all") {
      filteredPets = filteredPets.filter(pet => pet.type === filters.type);
    }
    setPets(filteredPets);
  };

  // Callback to adopt a pet
  const onAdoptPet = (id) => {
    const updatedPets = pets.map(pet =>
      pet.id === id ? { ...pet, isAdopted: true } : pet
    );
    setPets(updatedPets);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
