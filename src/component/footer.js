import React from 'react';
import Modal from './Modal'
import './Footer.css';


class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          showErrorModal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleErrorModal = this.toggleErrorModal.bind(this);
        this.newTask = this.newTask.bind(this);
      }
    
      toggleModal() {
        this.setState({ showModal: !this.state.showModal });
      }

      toggleErrorModal() {
        this.setState({ showErrorModal: !this.state.showErrorModal });
      }

      newTask() {
        const taskName = document.getElementById("taskName").value;
        const taskCategory = document.getElementById("category").value;

        if (taskName !== '') {
            this.props.addTask(taskName,taskCategory);
            this.toggleModal();
        } else {
            this.toggleErrorModal();
        }
      }

  render() {
    const{filtre} = this.props;
    const{category} = this.props;

    return (
      <div className='footer-container'>
        <input className='add-task-input'
          type="text"
          placeholder="Recherche rapide"
          value={filtre}
          onChange={this.props.handleFilterChange}
        />

        <button onClick={this.toggleModal} className='add-task-button'>Ajouter une tâche</button>
      
        <Modal show={this.state.showModal}>
          {/* Contenu du modal */}
          <h1>Ajouter une Tâches</h1>
          <input className='add-task-input'
          id='taskName'
          type="text"
          placeholder="nom tâche"
        />

        <select id='category' className="add-task-input">
        {category.map((item,index) => (
            <option key={index} value={item.name}>
                {item.name}
            </option>
        ))}
        </select> <br/>
          <button onClick={this.toggleModal} className='add-task-button'>Fermer</button>
          <button onClick={this.newTask} className='add-task-button'>Valider</button>
        </Modal>

        {/* Popup affiché si pas de nom de tache renseigné */}
        <Modal show={this.state.showErrorModal}>
            <h1>impossible d'avoir une tache sans titre</h1>
            <button onClick={this.toggleErrorModal}>Fermer</button>
        </Modal>
      </div>
    );
  }
}

export default Footer;
