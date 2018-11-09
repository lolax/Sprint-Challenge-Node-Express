import React, { Component } from 'react';
import { EventEmitter } from '../events';

class Project extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, name, description } = this.props.project;
        return (
            <div className='project'>
                <div className='name'>{name}
                    <div className='delete-btn' onClick={() => EventEmitter.dispatch('deleteProject', id)}>X</div>
                </div>
                <div className='description'>{description}</div>
            </div>
        );
    }
}

export default Project;