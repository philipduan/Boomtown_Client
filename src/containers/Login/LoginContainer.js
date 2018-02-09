import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from '../firebase/firebase';
import { logInUser } from '../../redux/modules/profiles';
import Login from './Login';

class LoginContainer extends Component {
  static propTypes = {};

  state = {
    username: '',
    password: '',
    error: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => user ? this.props.history.push('/items') : null);
  }
  handleUsername = (username) => {
    this.setState({ username });
  }

  handlePassword = (password) => {
    this.setState({ password });
  }

  login = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(user => {
        console.log(user);
        this.props.dispatch(logInUser(user.email));
        this.props.history.push('/items')

      }).catch(() => this.setState({ error: true }));

  };

  render() {
    return <Login
      username={this.handleUsername}
      password={this.handlePassword}
      login={this.login} location={this.props.location}
      disabled={this.state.username ? this.state.password ? false : true : true}
      error={this.state.error}
    />;
  }
}

export default connect(null, null)(LoginContainer);
