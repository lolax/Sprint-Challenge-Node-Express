import React, { Component } from 'react';
import { EventEmitter } from '../events';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  addProject = event => {
    event.preventDefault();
    const { name, description } = this.state;
    let newProject = { name, description }
    EventEmitter.dispatch('addProject', newProject);
    this.setState({
      name: '',
      description: ''
    });
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="add-project">
        <form className='add-form' onSubmit={this.addProject}>Add Project:
          <input
            className='input-add'
            onChange={this.handleInputChange}
            placeholder="Name"
            value={this.state.name}
            name="name"
          />
           <input
            className='input-add'
            onChange={this.handleInputChange}
            placeholder="Description"
            value={this.state.description}
            name="description"
          />
          <button className='submit-add' type="submit">Submit Project</button>
        </form>
      </div>
    );
  }
}

export default AddProject;