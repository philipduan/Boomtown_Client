import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from '../firebase/firebase';
import { logInUser } from '../../redux/modules/profiles';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { LoginField, BioField } from '../../components/Validate';

import './styles.css';
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';
class Login extends Component {

  state = {
    fullname: '',
    bio: '',
    username: '',
    password: '',
    error: false,
    open: false,
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

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFullname = (fullname) => {
    this.setState({ fullname })
  }

  handleBio = (bio) => {
    this.setState({ bio })
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

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="page login">
        <div className="logo">
          <img src={logo} alt="Boomtown Logo" />
        </div>
        <div className="topRight">
          <img src={topRight} alt="Sky" />
        </div>
        <div className="bottomLeft">
          <img src={bottomLeft} alt="City" />
        </div>
        <div className="cardContainer">
          <Paper zDepth={5}>
            <div className="formContainer">
              {this.state.error ? <p class="error">'Invalid Email or Password'</p> : null}
              <form onSubmit={this.login} autoComplete="off">
                <div>
                  <LoginField label="Email" handleUser={this.handleUsername} />
                </div>
                <div>
                  <LoginField label="Password" handlePassword={this.handlePassword} />
                </div>
                <RaisedButton
                  className="enterButton"
                  primary
                  fullWidth
                  type="submit"
                  disabled={this.state.username ? this.state.password ? false : true : true}
                >
                  Sign In
                </RaisedButton>
                <RaisedButton
                  className="enterButton"
                  primary
                  fullWidth
                  onClick={this.handleOpen}
                >
                  Sign Up
                </RaisedButton>
                <div>
                  <Dialog
                    title="Welcome To Boomtown"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                    <BioField label="Full Name" handleFullname={this.handleFullname} />
                    <BioField label="Tell us about yourself" handleFullname={this.handleBio} />
                    <LoginField label="Email" handleUser={this.handleUsername} />
                    <LoginField label="Password" handlePassword={this.handlePassword} />
                  </Dialog>
                </div>
              </form>

            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Login);
