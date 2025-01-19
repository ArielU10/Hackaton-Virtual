import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';

const SelectorSombrero = ({ character, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Pre-fetch API data if needed
    fetch('https://hp-api.herokuapp.com/api/characters')
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error('Error fetching API:', error));
  }, []);

  const [apiData, setApiData] = useState([]);

  const questions = [
    {
      question: '¿Que destaca en ti?',
      options: ['Valentía', 'Sabiduría','Lealtad','Ambición'],
    },
    {
      question: '¿Eres más de seguir las reglas o de romperlas?',
      options: ['Seguir las reglas', 'Romperlas'],
    },
    {
      question: '¿Prefieres trabajar en equipo o solo?',
      options: ['En equipo', 'Solo'],
    },
    {
      question: '¿Qué te motiva más: la fama o la amistad?',
      options: ['La fama', 'La amistad'],
    },
    {
      question: '¿Cómo reaccionas ante un desafío?',
      options: ['Te enfrentas a él', 'Prefieres evitarlo'],
    },
    {
      question: '¿Eres más bien impulsivo o reflexivo?',
      options: ['impulsiva', 'reflexiva'],
    },
    {
      question: '¿Qué valoras más?',
      options: ['La lealtad', 'La inteligencia', 'La ambición', 'La bondad'],
    },
    {
      question: '¿Cuál es tu asignatura favorita en Hogwarts?',
      options: ['Defensa Contra las Artes Oscuras', 'Pociones', 'Transformaciones', 'Herbología'],
    },
    {
      question: '¿Qué tipo de criatura mágica te gustaría tener como mascota?',
      options: ['Búho', 'Gato', 'Hipogrifo', 'Dragón'],
    },
    {
      question: '¿Prefieres los deportes o las actividades más tranquilas?',
      options: ['Deportes', 'Actividades tranquilas'],
    },
    {
      question: '¿Qué tipo de música te gusta?',
      options: ['Clásica', 'Rock', 'Pop', 'Instrumental'],
    },
    {
      question: '¿Cuál es tu color favorito?',
      options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
    },
    {
      question: '¿Qué te gustaría hacer en tu tiempo libre?',
      options: ['Leer', 'Practicar deportes', 'Explorar', 'Descansar'],
    },
    {
      question: '¿Cuál es tu mayor miedo?',
      options: ['la soledad', 'el fracaso', 'la oscuridad', 'las alturas'],
    },
    {
      question: '¿Cuál es tu mayor fortaleza?',
      options: ['La determinación', 'La creatividad', 'La valentía', 'La empatía'],
    },
    {
      question: '¿Qué te hace sentir más feliz?',
      options: ['Estar con amigos', 'Lograr tus metas', 'Ayudar a otros', 'Disfrutar un hobby'],
    },
    {
      question: '¿Qué te hace sentir más triste?',
      options: ['Perder a alguien', 'Fracasar en algo', 'Sentirte incomprendido', 'La soledad'],
    },
  ];

  const handleAnswer = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = async () => {
    const house = determineHouse(answers[0]);
    const bestFriend = getRandomFriend();
    const featuredSpell = await getRandomSpell(); // Obtener el hechizo desde la API
    const pet = determinePet(answers[8]);
    const story = generateStory(character, house, pet, answers);
  
    setResult({
      house,
      bestFriend,
      featuredSpell, // Pasar el hechizo como un objeto con nombre y descripción
      pet,
      story,
    });
  };

  const determineHouse = (answer) => {
    switch (answer) {
      case 'Valentía':
        return 'Gryffindor';
      case 'Sabiduría':
        return 'Ravenclaw';
      case 'Lealtad':
        return 'Hufflepuff';
      case 'Ambición':
        return 'Slytherin';
      default:
        return 'Indefinido';
    }
  };

  const getRandomFriend = () => {
    if (!apiData || apiData.length === 0) return 'Desconocido';
    const friends = apiData.filter((char) => char.house);
    const randomIndex = Math.floor(Math.random() * friends.length);
    return friends[randomIndex]?.name || 'Desconocido';
  };

  const getRandomSpell = async () => {
    try {
      const response = await fetch('https://hp-api.herokuapp.com/api/spells');
      const spells = await response.json();
  
      if (spells.length === 0) {
        return { name: 'No se encontraron hechizos', description: '' };
      }
  
      const randomIndex = Math.floor(Math.random() * spells.length);
      const spell = spells[randomIndex];
      return {
        name: spell.name || 'Hechizo desconocido',
        description: spell.description || 'Descripción no disponible',
      };
    } catch (error) {
      console.error('Error obteniendo hechizos:', error);
      return { name: 'Error al obtener el hechizo', description: '' };
    }
  };
  

  const determinePet = (answer) => {
    const pets = ['Búho', 'Gato', 'Sapo', 'Hipogrifo', 'Bowtruckle', 'Rata', 'Fénix'];
    return pets.includes(answer) ? answer : 'Búho';
  };

  const generateStory = (character, house, pet, answers) => {
    return `${character.name} nació en una pequeña aldea muggle cerca de Hogsmeade. 
    Desde pequeño, ${character.name} mostró una fascinación por los animales y la naturaleza. 
    Sus padres, desconociendo su verdadera naturaleza, siempre le regalaban libros sobre criaturas 
    mágicas.
    Cuando recibió su carta de Hogwarts, ${character.name} se sintió abrumado por la emoción. 
    Sabía que había encontrado su lugar en el mundo. Al llegar a Hogwarts, 
    fue seleccionado para la casa de ${house}.
    ${character.name} destacó en clases como ${answers[7]}. 
    Su ${pet} lo acompañaba a todas partes y era su confidente más fiel. A pesar de su naturaleza 
    ${answers[5]}, ${character.name} tenía un gran corazón y siempre estaba dispuesto a ayudar a 
    sus amigos.Su mayor miedo era ${answers[13]}, pero gracias a su valentía y determinación, 
    logró superarlo. Durante sus años en Hogwarts, ${character.name} vivió muchas aventuras, 
    desde enfrentarse a peligrosos enemigos hasta descubrir secretos ancestrales. 
    Al final, se convirtió en una leyenda poderosa y respetada en Howarts`;
  };

  return (
    <div className="bg-light p-4 rounded shadow-sm">
      <h2 className="text-secondary">Sombrero Seleccionador</h2>
      <h4 className="text-info">{character.name}</h4>
      {!result ? (
        <Form>
          {questions.map((q, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label>{q.question}</Form.Label>
              {q.options.map((option, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  label={option}
                  name={`question-${index}`}
                  id={`question-${index}-option-${i}`}
                  onChange={() => handleAnswer(index, option)}
                />
              ))}
            </Form.Group>
          ))}
          
          <Button 
            variant="success" 
            className="me-2 d-flex justify-content-center align-items-center fs-5"  // Aumenta aún más el tamaño del texto
            onClick={handleSubmit}
            style={{ fontSize: '2rem' }}  // Aumenta aún más el tamaño del texto
            >
            <FontAwesomeIcon 
              icon={faHatWizard} 
              className="fa-3x"  // Aumenta el tamaño del icono a 3 veces su tamaño original
              style={{ marginRight: '8px' }}
            />
            Preguntar al Sombrero
          </Button>




          <Button variant="secondary" onClick={onBack}>
            Regresar
          </Button>
        </Form>
      ) : (
        <div>
          <h3>SOMBRERO SELECCIONADOR GRITAAA: {result.house} !!</h3>
          <p><strong>Mejor amigo:</strong> {result.bestFriend}</p>
          <p>
          <strong>Hechizo destacado:</strong> {result.featuredSpell.name}
          <br />
          <em>{result.featuredSpell.description}</em>
          </p>
          <p><strong>Mascota:</strong> {result.pet}</p>
          <h4>Historia del Personaje:</h4>
          <p>{result.story}</p>
          <Button variant="secondary" onClick={onBack}>
            Regresar
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectorSombrero;
