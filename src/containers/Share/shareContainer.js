import React, { Component } from 'react';
import ShareLeft from './shareLeft';
import ShareRight from './shareRight';
import './style.css';

class ShareContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tags: []
    };

    this._handleTitle = this._handleTitle.bind(this);
    this._handleDescription = this._handleDescription.bind(this);
    this._handleTags = this._handleTags.bind(this);
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
        <ShareLeft data={this.state} />
        <ShareRight
          onTitleChange={this._handleTitle}
          onDescriptionChange={this._handleDescription}
          onTagsChange={this._handleTags}
        />
      </div>
    );
  }
}

export default ShareContainer;
