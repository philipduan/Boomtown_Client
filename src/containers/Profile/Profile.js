import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItemsAndUsersProfile, patchItemBorrower } from '../../redux/modules/profiles';
import ProfileCard from './ProfileCard';
import firebase from '../firebase/firebase';
import './style.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      itemsBorrowed: [],
      itemsOwned: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => user ? null : this.props.history.push('/'))
    this.props.dispatch(fetchItemsAndUsersProfile(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && this.props.itemsData) {
      if (
        this.props.user !== nextProps.user ||
        this.props.itemsData.length !== nextProps.itemsData.length ||
        this.state.itemsOwned.length === 0
      ) {
        this.setState({
          user: nextProps.user,
          itemsBorrowed: this.getItemsBorrowed(nextProps.itemsData),
          itemsOwned: this.getItemsOwned(nextProps.itemsData)
        });
      }
    }
  }

  getItemsBorrowed = items => {
    return items.filter(item => item.borrower === this.props.match.params.id);
  };

  getItemsOwned = items => {
    return items.filter(item => {
      return item.itemowner._id === this.props.match.params.id;
    });
  };

  _handleReturn = data => {
    this.props.dispatch(patchItemBorrower(data, this.props.match.params.id));
  }

  render() {
    if (this.state.user) {
      return (
        <ProfileCard
          user={this.state.user}
          itemsBorrowed={this.state.itemsBorrowed}
          itemsOwned={this.state.itemsOwned}
          loggedInUserId={this.props.match.params.id}
          handleReturn={this._handleReturn}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  itemsData: state.profiles.itemsData,
  user: state.profiles.user
});
export default connect(mapStateToProps)(Profile);
