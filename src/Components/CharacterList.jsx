import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CharacterList = ({ characters, onDelete, onSelect }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {characters.map((char, index) => (
        <Card key={index} className="m-3 shadow-sm" style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src={URL.createObjectURL(char.image)}
            alt={char.name}
            style={{ height: '12rem', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{char.name}</Card.Title>
            <Card.Text>
              <strong>Edad:</strong> {char.age} <br />
              <strong>Linaje:</strong> {char.lineage} <br />
              <strong>Género:</strong> {char.gender}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="danger" onClick={() => onDelete(index)}>
                Borrar
              </Button>
              <Button variant="primary" onClick={() => onSelect(char)}>
                Sombrero Seleccionador
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CharacterList;
