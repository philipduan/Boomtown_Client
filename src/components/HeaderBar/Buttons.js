import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import firebase from '../../containers/firebase/firebase';
import './style.css';

class Buttons extends Component {
  constructor(props) {
    super(props);
  }
  handleLogOut = () => {
    firebase.auth().signOut();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="headerButtonWrapper">
        <FlatButton
          label="MY PROFILE"
          backgroundColor="rgb(72,198,239)"
          onClick={() => this.props.history.push(`/profile/${this.props.loggedInUserId}`)}
        />
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

const mapsStateToProps = state => ({
  loggedInUserId: state.profiles.loggedInUserId
});

export default connect(mapsStateToProps)(withRouter(Buttons));
