import React from 'react';

class Header extends React.Component {
  render() {
    const { totalTasks, tasksDone } = this.props; // Props passées depuis App.js

    return (
      <div>
        <h2>Progression des tâches :</h2>
        <p>Tâches faites : {tasksDone}</p>
        <p>Tâches restantes : {totalTasks - tasksDone}</p>
      </div>
    );
  }
}

export default Header;