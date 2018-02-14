import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItemsAndUsersProfile, patchItemBorrower, deleteItemOwned } from '../../redux/modules/profiles';
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
  componentWillUpdate(nextProps) {
    console.log('will update ');
    if (this.props.match.params.id != nextProps.match.params.id) {
      console.log('inside if will update');
      this.props.dispatch(fetchItemsAndUsersProfile(nextProps.match.params.id));
    }
  }
  componentDidMount() {
    console.log('did mount');
    firebase.auth().onAuthStateChanged(user => user ? null : this.props.history.push('/'))
    this.props.dispatch(fetchItemsAndUsersProfile(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receivev');
    console.log('this', this.props)
    console.log('next', nextProps);
    if (this.props.user && this.props.itemsBorrowed && this.props.itemsOwned) {
      if (
        this.props.user !== nextProps.user ||
        this.props.itemsBorrowed.length !== nextProps.itemsBorrowed.length ||
        this.props.itemsOwned.length === nextProps.itemsOwned.length
      ) {
        this.setState({
          user: nextProps.user,
          itemsBorrowed: nextProps.itemsBorrowed,
          itemsOwned: nextProps.itemsOwned
        });
      }
    }
  }

  // getItemsBorrowed = items => {
  //   return items.filter(item => item.borrower === this.props.match.params.id);
  // };

  // getItemsOwned = items => {
  //   return items.filter(item => {
  //     return item.itemowner._id === this.props.match.params.id;
  //   });
  // };

  _handleReturn = data => {
    this.props.dispatch(patchItemBorrower(data, this.props.match.params.id));
  }

  _handleRemove = data => {
    this.props.dispatch(deleteItemOwned(data, this.props.match.params.id));
  }

  // updateDB = () => {
  //   console.log('id', this.state.user._id);
  //   let itemsOwned = [];
  //   let itemsBorrowed = [];
  //   for (let i of this.state.itemsOwned) {
  //     itemsOwned.push(i._id);
  //   }

  //   for (let i of this.state.itemsBorrowed) {
  //     itemsBorrowed.push(i._id);
  //   }
  //   const data = {
  //     id: this.state.user._id,
  //     itemsOwned: itemsOwned,
  //     itemsBorrowed: itemsBorrowed
  //   }
  //   fetch('https://boomtown-server-phil.herokuapp.com/update', {
  //     method: 'PATCH',
  //     body: JSON.stringify(data),
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(error => {
  //       console.log('error', error);
  //     })
  // }

  render() {
    if (this.state.user) {
      return (
        // <div>
        //   <button onClick={this.updateDB}>Click Me </button>
        <ProfileCard
          user={this.state.user}
          itemsBorrowed={this.state.itemsBorrowed}
          itemsOwned={this.state.itemsOwned}
          loggedInUserId={sessionStorage.getItem('id')}
          handleReturn={this._handleReturn}
          handleRemove={this._handleRemove}
        />
        //       </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  itemsOwned: state.profiles.itemsOwned,
  itemsBorrowed: state.profiles.itemsBorrowed,
  user: state.profiles.user
});
export default connect(mapStateToProps)(Profile);
