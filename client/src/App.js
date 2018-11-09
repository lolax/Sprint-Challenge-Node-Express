import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { EventEmitter } from './events';
import Projects from './components/Projects';

class App extends Component {
  constructor(props) {
    super(props);
    this.url = 'http://localhost:9000/api/projects'
    this.state = {
      projects: [],
    };
    EventEmitter.subscribe('addProject', (newProject) => this.addProject(newProject));
    EventEmitter.subscribe('deleteProject', (id) => this.deleteProject(id));
  }

  componentDidMount() {
    axios
      .get(this.url)
      .then(res => {
        this.setState({projects: res.data});
      })
      .catch(err => {
        console.error('Error retrieving project', err);
      })
  }

  addProject = newProject => {
    axios
      .post(this.url, newProject)
      .then(res => {
        this.setState({ projects: [...this.state.projects, res.data] });
      })
      .catch(err => {
        console.error('Error adding user', err);
      })
  }

  deleteProject = id => {
    axios
      .delete(`${this.url}/${id}`)
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.error('Error deleting project', err);
      })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={ (props) => <Projects {...props} projects={this.state.projects} /> } />
      </div>
    );
  }
}

export default App;
