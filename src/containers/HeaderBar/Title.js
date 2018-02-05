import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getTags } from '../../redux/modules/items';
import Logo from '../../images/boomtown-logo.svg';
import './style.css';

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(event, index, values) {
    this.setState({
      values
    });
    this.props.dispatch(getTags(values));
  }

  _menuItems(tags) {
    return tags.map(tag => (
      <MenuItem
        key={tag.value}
        insetChildren={true}
        checked={this.state.values.indexOf(tag.tag) > -1}
        value={tag.tag}
        primaryText={tag.tag}
      />
    ));
  }

  render() {
    const tags = [
      { key: 1, value: 1, tag: 'Electronics' },
      { key: 2, value: 2, tag: 'Household Items' },
      { key: 3, value: 3, tag: 'Musical Instruments' },
      { key: 4, value: 4, tag: 'Physical Media' },
      { key: 5, value: 5, tag: 'Recreational Equipment' },
      { key: 6, value: 6, tag: 'Sporting Goods' },
      { key: 7, value: 7, tag: 'Tools' }
    ];
    return (
      <div className="titleWrapper">
        <img
          src={Logo}
          alt="Boomtown"
          className="HeaderLogo"
          onClick={() => this.props.history.push('/items')}
        />
        {this.props.location.pathname === '/items' ? (
          <SelectField
            multiple={true}
            hintText="Filter by Tag"
            value={this.state.values}
            onChange={this._handleChange}
          >
            {this._menuItems(tags)}
          </SelectField>
        ) : null}
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  tags: state.items.tags
});

export default withRouter(connect(mapsStateToProps)(Title));
