// Rediseño del componente CharacterCreator.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CharacterCreator = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lineage, setLineage] = useState('Sangre pura');
  const [gender, setGender] = useState('Masculino');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !image) {
      alert('Por favor completa todos los campos.');
      return;
    }
    onCreate({ name, age, lineage, gender, image });
    setName('');
    setAge('');
    setImage(null);
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
      <h3 className="text-secondary">Crea un Nuevo Personaje</h3>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Linaje</Form.Label>
        <Form.Select value={lineage} onChange={(e) => setLineage(e.target.value)}>
          <option value="Sangre pura">Sangre pura</option>
          <option value="Mestizo">Mestizo</option>
          <option value="Muggle">Muggle</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="No binario">No binario</option>
          <option value="Prefiero no responder">Prefiero no responder</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Imagen del Personaje</Form.Label>
        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Crear Personaje
      </Button>
    </Form>
  );
};

export default CharacterCreator;