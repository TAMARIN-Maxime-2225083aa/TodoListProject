import React from 'react';
import Task from './Task';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	items: [
      	new Task("tache 1",true),
        new Task("tache 2",true),
        new Task("tache 3",false),
        new Task("tache 4",false)
      ],
      filter: "" // Ajout de l'état pour le filtre
    };
    // Bind de la fonction addTask pour pouvoir accéder à this.setState
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.moveTaskUp = this.moveTaskUp.bind(this);
    this.moveTaskDown = this.moveTaskDown.bind(this);
  }
  
  addTask() {
  	// saisi nom tâche
    const taskName = prompt("un nom pour cette tâche")
  
    // Création d'une nouvelle tâche avec un texte par défaut et non faite
    const newTask = new Task(taskName,false);
    // Mise à jour de l'état en ajoutant la nouvelle tâche à la liste existante
    this.setState({items: [...this.state.items, newTask]});
  }
  
  removeTask(indexToRemove){
  	// Création d'une copie de la liste actuelle des tâches
    const updatedItems = [...this.state.items];
    // Suppression de la tâche à l'index spécifié
    if(window.confirm("voulez vous supprimer cette tâche ?")) {
    	updatedItems.splice(indexToRemove, 1);
    }
    // Mise à jour de l'état avec la nouvelle liste des tâches
    this.setState({
      items: updatedItems
    });
  }
  
  toggleTask(indexToToggle) {
  	// Création d'une copie de la liste actuelle des tâches
    const updatedItems = [...this.state.items];
    // Basculement de l'état done de la tâche à l'index spécifié
    updatedItems[indexToToggle].isChecking = !updatedItems[indexToToggle].isChecking;
    // Mise à jour de l'état avec la nouvelle liste des tâches
    this.setState({
      items: updatedItems
    });
  }
  
  handleFilterChange(event) {
    // Mettre à jour l'état du filtre avec la valeur saisie
    this.setState({
      filter: event.target.value
    });
  }
  
  moveTaskUp(indexToMove) {
    if (indexToMove > 0) {
      const updatedItems = [...this.state.items];
      const temp = updatedItems[indexToMove];
      updatedItems[indexToMove] = updatedItems[indexToMove - 1];
      updatedItems[indexToMove - 1] = temp;
      this.setState({
        items: updatedItems
      });
    }
	}

  moveTaskDown(indexToMove) {
    if (indexToMove < this.state.items.length - 1) {
      const updatedItems = [...this.state.items];
      const temp = updatedItems[indexToMove];
      updatedItems[indexToMove] = updatedItems[indexToMove + 1];
      updatedItems[indexToMove + 1] = temp;
      this.setState({
        items: updatedItems
      });
    }
  }

  // Fonction pour sauvegarder les tâches dans le localStorage
  saveTasksToLocalStorage() {
    // Convertir les tâches en chaîne JSON
    const tasksJson = JSON.stringify(this.state.items);
    
    // Stocker la chaîne JSON dans le localStorage avec une clé spécifique
    localStorage.setItem('tasks', tasksJson);
  }

  // Fonction pour charger les tâches depuis le localStorage lors du montage du composant
  loadTasksFromLocalStorage() {
    // Récupérer la chaîne JSON des tâches depuis le localStorage
    const tasksJson = localStorage.getItem('tasks');
    
    // Si des tâches sont trouvées dans le localStorage, les charger dans l'état du composant
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson); // Désérialiser la chaîne JSON en objets JavaScript
      this.setState({ items: tasks });
    }
  }
  
  render() {
  	// Compter le nombre de tâches done
    const tasksDone = this.state.items.filter(item => item.isChecking).length;
    // Compter le nombre de tâches not done
    const tasksNotDone = this.state.items.filter(item => !item.isChecking).length;
    const taskNomber = this.state.items.length;
    
    // Filtrer les tâches en fonction de la valeur du filtre
    const filteredTasks = this.state.items.filter(item =>
      item.title.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    
    return (
      <div>
        <h2>Todos:</h2>
        <input type='text' id='filter' placeholder='filtre' value={this.state.filter} onChange={this.handleFilterChange}/> <br/>
        <ol>
        {filteredTasks.map((item, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" checked={item.isChecking} onChange={() => this.toggleTask(index)} />
              <span className={item.isChecking ? "done" : ""}>{item.title}</span>
            </label>
            <button onClick={() => this.removeTask(index)}>Supprimer</button>
            <button onClick={() => this.moveTaskUp(index)} disabled={index === 0}>↑</button>
            <button onClick={() => this.moveTaskDown(index)} disabled={index === this.state.items.length - 1}>↓</button>
          </li>
        ))}
        </ol> <br/>
        <p>Tâches faites : {tasksDone}</p>
        <p>Tâches à faire : {tasksNotDone}</p>
        <p>nombre de Tâches : {taskNomber}</p> <br/>
        <button onClick={this.addTask}>ajouter une tâche</button>
      </div>
    )
  }
}

export default App;