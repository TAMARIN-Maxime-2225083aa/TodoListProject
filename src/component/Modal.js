// Modal.js

import React from 'react';
import './Modal.css'; // Importez un fichier CSS pour les styles du modal

class Modal extends React.Component {
  render() {
    // Condition pour afficher ou masquer le modal
    const modalDisplay = this.props.show ? "block" : "none";

    return (
      <div className="modal" style={{ display: modalDisplay }}>
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
