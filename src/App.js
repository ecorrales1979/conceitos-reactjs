import React, { useEffect, useState } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Repository ${Date.now()}`,
      owner: 'Eduardo Reyna',
      techs: [
        'NodeJS',
        'ReactJS',
        'React Native'
      ]
    };

    const response = await api.post('repositories', repository);

    setRepositories([
      ...repositories,
      response.data
    ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status != 204) {
      console.log('Error deleting repository');
      return;
    }

    setRepositories(
      repositories.filter(repository => repository.id != id)
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => {
          return (
            <li key={ repository.id }>
              { repository.title }

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
