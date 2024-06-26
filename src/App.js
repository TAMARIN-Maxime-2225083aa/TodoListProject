import React from 'react';
import Task from './Task';
import Header from './component/Header';
import Footer from './component/Footer';

// Import du fichier CSS pour les styles de l'application
import './App.css';

// import des icones nécessaires
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	items: [],
      category: [{name:'aucune',icon:null},{name:'home',icon:HomeIcon},{name:'work',icon:WorkIcon}],
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

  componentDidMount() {
    // Appeler loadTasksFromLocalStorage après le montage du composant dans le DOM
    this.loadTasksFromLocalStorage();
  }
  
  addTask(taskName,taskCategory) {
    // Création d'une nouvelle tâche avec un texte par défaut et non faite
    const newTask = new Task(taskName,false,taskCategory);
    // Mise à jour de l'état en ajoutant la nouvelle tâche à la liste existante
    this.setState({items: [...this.state.items, newTask]}, () => { this.saveTasksToLocalStorage()});
  }
  
  removeTask(indexToRemove){
  	// Création d'une copie de la liste actuelle des tâches
    const updatedItems = [...this.state.items];
    // Suppression de la tâche à l'index spécifié
    if(window.confirm("voulez vous supprimer cette tâche ?")) {
    	updatedItems.splice(indexToRemove, 1);
    }
    // Mise à jour de l'état avec la nouvelle liste des tâches
    this.setState({items: updatedItems}, () => { this.saveTasksToLocalStorage()});

    // Appeler saveTasksToLocalStorage après avoir mis à jour l'état des tâches
    this.saveTasksToLocalStorage();
  }
  
  toggleTask(indexToToggle) {
  	// Création d'une copie de la liste actuelle des tâches
    const updatedItems = [...this.state.items];
    // Basculement de l'état done de la tâche à l'index spécifié
    updatedItems[indexToToggle].isChecking = !updatedItems[indexToToggle].isChecking;
    // Mise à jour de l'état avec la nouvelle liste des tâches
    this.setState({items: updatedItems}, () => { this.saveTasksToLocalStorage()});
  }
  
  handleFilterChange(event) {
    // Mettre à jour l'état du filtre avec la valeur saisie
    this.setState({filter: event.target.value}, () => { this.saveTasksToLocalStorage()});
  }
  
  moveTaskUp(indexToMove) {
    if (indexToMove > 0) {
      const updatedItems = [...this.state.items];
      const temp = updatedItems[indexToMove];
      updatedItems[indexToMove] = updatedItems[indexToMove - 1];
      updatedItems[indexToMove - 1] = temp;
      this.setState({items: updatedItems}, () => { this.saveTasksToLocalStorage()});
    }
	}

  moveTaskDown(indexToMove) {
    if (indexToMove < this.state.items.length - 1) {
      const updatedItems = [...this.state.items];
      const temp = updatedItems[indexToMove];
      updatedItems[indexToMove] = updatedItems[indexToMove + 1];
      updatedItems[indexToMove + 1] = temp;
      this.setState({items: updatedItems}, () => { this.saveTasksToLocalStorage()});
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
    const taskList = []
    
    // Si des tâches sont trouvées dans le localStorage, les charger dans l'état du composant
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson); // Désérialiser la chaîne JSON en objets JavaScript
      for (const task in tasks) {
        taskList.push(new Task(tasks[task].title,tasks[task].isChecking,tasks[task].category))
      }
      this.setState({ items: taskList });
    }
  }
  
  render() {

  	// Compter le nombre de tâches done
    const tasksDone = this.state.items.filter(item => item.isChecking).length;
    // Compter le nombre de tâches not done
    const taskNomber = this.state.items.length;
    
    // Filtrer les tâches en fonction de la valeur du filtre
    const filteredTasks = this.state.items.filter(item =>
      item.title.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    
    return (
      <div className='App'>
        <Header totalTasks={taskNomber} tasksDone={tasksDone} />
        <h2>Todo:</h2>
        <ol className='todo-list'>
        {filteredTasks.map((item, index) => (
          <li key={index} className="todo-item">
            <label>
              <input type="checkbox" checked={item.isChecking} onChange={() => this.toggleTask(index)} />
              <span className={item.isChecking ? "done" : ""}>{item.title}</span>
            </label>
            <div className="task-icons">
              {item.category === 'home' && <HomeIcon />} {/* Icône pour la catégorie 'home' */}
              {item.category === 'work' && <WorkIcon />} {/* Icône pour la catégorie 'work' */}
              <button onClick={() => this.removeTask(index)}>Supprimer</button>
              <button onClick={() => this.moveTaskUp(index)} disabled={index === 0}>↑</button>
              <button onClick={() => this.moveTaskDown(index)} disabled={index === this.state.items.length - 1}>↓</button>
            </div>
          </li>
        ))}
        </ol> <br/>
        <Footer filter={this.state.filter} category={this.state.category} handleFilterChange={this.handleFilterChange} addTask={this.addTask}/>
      </div>
    )
  }
}

export default App;