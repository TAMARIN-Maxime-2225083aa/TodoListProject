import React from 'react';
import Modal from './Modal'

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

        if (taskName !== '') {
            this.props.addTask(taskName);
            this.toggleModal();
        } else {
            this.toggleErrorModal();
        }
      }

  render() {
    const{filtre} = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Recherche rapide"
          value={filtre}
          onChange={this.props.handleFilterChange}
        />

        <button onClick={this.toggleModal}>Ajouter une tâche</button>
      
        <Modal show={this.state.showModal}>
          {/* Contenu du modal */}
          <h1>Ajouter une Tâches</h1>
          <input
          id='taskName'
          type="text"
          placeholder="nom tâche"
        />
          {/* Bouton pour fermer le modal */}
          <button onClick={this.toggleModal}>Fermer</button>
          <button onClick={this.newTask}>Valider</button>
        </Modal>
        <Modal show={this.state.showErrorModal}>
            <h1>impossible d'avoir une tache sans titre</h1>
            <button onClick={this.toggleErrorModal}>Fermer</button>
        </Modal>
      </div>
    );
  }
}

export default Footer;
