// Rediseño del componente App.js
import React, { useState } from 'react';
import CharacterCreator from './Components/CharacterCreator';
import CharacterList from './Components/CharacterList';
import SelectorSombrero from './Components/SelectorSombrero';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCreate = (character) => {
    setCharacters([...characters, character]);
  };

  const handleDelete = (index) => {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
  };

  return (
    <div className="container text-center my-5">
      <h1 className="display-4 text-primary">Creador de Personajes Mágicos</h1>
      <p className="lead text-muted">¡Crea tus propios personajes y deja que el Sombrero Seleccionador haga su magia!</p>
      <div className="mt-4">
        {!selectedCharacter ? (
          <>
            <CharacterCreator onCreate={handleCreate} />
            <CharacterList
              characters={characters}
              onDelete={handleDelete}
              onSelect={setSelectedCharacter}
            />
          </>
        ) : (
          <SelectorSombrero
            character={selectedCharacter}
            onBack={() => setSelectedCharacter(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;