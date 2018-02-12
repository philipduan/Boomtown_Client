import React, { Component } from 'react';
import ShareLeft from './shareLeft';
import ShareRight from './shareRight';
import firebase from '../firebase/firebase';
import './style.css';

class ShareContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tags: [],
      loggedInUserId: '',
      email: ''
    };

    this._handleTitle = this._handleTitle.bind(this);
    this._handleDescription = this._handleDescription.bind(this);
    this._handleTags = this._handleTags.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => user ? null : this.props.history.push('/'));
    this.setState({
      loggedInUserId: sessionStorage.getItem('id'),
      email: sessionStorage.getItem('email')
    })
  }
  _handleTitle(title) {
    this.setState({
      title
    });
  }

  _handleDescription(description) {
    this.setState({ description });
  }

  _handleTags(tags) {
    this.setState({ tags });
  }

  render() {
    return (
      <div className="shareComponent">
        <ShareLeft data={this.state} loggedInUserId={this.state.loggedInUserId} email={this.state.email} />
        <ShareRight
          onTitleChange={this._handleTitle}
          onDescriptionChange={this._handleDescription}
          onTagsChange={this._handleTags}
          loggedInUserId={this.state.loggedInUserId}
        />
      </div>
    );
  }
}

export default ShareContainer;
