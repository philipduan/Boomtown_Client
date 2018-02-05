import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import {
  fetchItemsAndUsers,
  patchItemBorrower
} from '../../redux/modules/items';
//import { fetchItemsAndUsersProfile } from '../../redux/modules/profiles';
import Item from './item';
import './style.css';
class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this._handleBorrowSubmit = this._handleBorrowSubmit.bind(this);
  }

  _handleBorrowSubmit(data) {
    this.props.dispatch(patchItemBorrower(data));
  }

  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers());
    //this.props.dispatch(fetchItemsAndUsersProfile());
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
                  />
                );
              })
            : this.props.itemsFiltered.map(item => {
                return (
                  <Item
                    key={item.id}
                    data={item}
                    borrowSubmit={this._handleBorrowSubmit}
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
  isLoading: state.items.isLoading,
  itemsFiltered: state.items.itemsFiltered,
  tags: state.items.tags
});

export default connect(mapsStateToProps)(ItemsContainer);
