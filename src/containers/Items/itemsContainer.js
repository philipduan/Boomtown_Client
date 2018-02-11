import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import {
  fetchItemsAndUsers,
  patchItemBorrower
} from '../../redux/modules/items';
import firebase from '../firebase/firebase';
import Item from './item';
import './style.css';
class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: '',
    }
    this._handleBorrowSubmit = this._handleBorrowSubmit.bind(this);
  }

  _handleBorrowSubmit(data) {
    this.props.dispatch(patchItemBorrower(data));
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => user ? null : this.props.history.push('/'));
    this.props.dispatch(fetchItemsAndUsers());
  }

  componentWillReceiveProps() {
    this.setState({
      loggedInUserId: sessionStorage.getItem('id')
    })
  }

  render() {
    return (
      <div className="itemsContainer">
        <Masonry>
          {this.props.tags.length === 0
            ? this.props.itemsData.map((item, index) => {
              return (
                <Item
                  key={index}
                  data={item}
                  borrowSubmit={this._handleBorrowSubmit}
                  loggedInUserId={this.state.loggedInUserId}
                />
              );
            })
            : this.props.itemsFiltered.map((item, index) => {
              return (
                <Item
                  key={index}
                  data={item}
                  borrowSubmit={this._handleBorrowSubmit}
                  loggedInUserId={this.state.loggedInUserId}
                />
              );
            })}
        </Masonry>
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  itemsData: state.items.itemsData,
  itemsFiltered: state.items.itemsFiltered,
  tags: state.items.tags,
});

export default connect(mapsStateToProps)(ItemsContainer);
