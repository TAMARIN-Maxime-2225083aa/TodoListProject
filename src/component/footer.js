import React from 'react';

class Footer extends React.Component {

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
        <button onClick={this.props.addTask}>Ajouter une tâche</button>
      </div>
    );
  }
}

export default Footer;
