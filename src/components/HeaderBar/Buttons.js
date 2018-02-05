import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import './style.css';

class Buttons extends Component {
  render() {
    return (
      <div className="headerButtonWrapper">
        <FlatButton
          label="MY PROFILE"
          backgroundColor="rgb(72,198,239)"
          onClick={() => this.props.history.push('/profile')}
        />
        <FlatButton
          label="LOGIN"
          backgroundColor="black"
          style={{ color: 'white', marginLeft: '1rem' }}
        />
      </div>
    );
  }
}

export default withRouter(Buttons);
