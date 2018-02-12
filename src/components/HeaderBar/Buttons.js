import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import firebase from '../../containers/firebase/firebase';
import './style.css';

class Buttons extends Component {

  handleLogOut = () => {
    sessionStorage.clear();
    firebase.auth().signOut();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="headerButtonWrapper">
        {this.props.location.pathname !== `/profile/${sessionStorage.getItem('id')}` ?
          <FlatButton
            label="MY PROFILE"
            backgroundColor="rgb(72,198,239)"
            onClick={() => this.props.history.push(`/profile/${sessionStorage.getItem('id')}`)}
          /> : null}

        <FlatButton
          label="LOGOUT"
          backgroundColor="black"
          style={{ color: 'white', marginLeft: '1rem' }}
          onClick={this.handleLogOut}
        />
      </div>
    );
  }
}



export default withRouter(Buttons);
