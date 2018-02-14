import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './style.css';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Gravatar from 'react-gravatar';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this._handleClose = this._handleClose.bind(this);
    this._handleOpen = this._handleOpen.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleOpen() {
    this.setState({ open: true });
  }

  _handleClose() {
    this.setState({ open: false });
  }

  _handleSubmit() {
    this.setState({ open: false });
    let data = {
      id: this.props.data._id,
      available: false,
      borrower: this.props.loggedInUserId
    };
    this.props.borrowSubmit(data);
  }

  _handleReturn = () => {
    let data = {
      id: this.props.data._id,
      available: true,
      borrower: this.props.loggedInUserId
    };
    this.props.handleReturn(data);
  }

  _handleRemove = () => {
    let data = {
      id: this.props.data._id,
    };
    this.props.handleRemove(data);
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this._handleClose} />,
      <FlatButton
        backgroundColor="black"
        label="BORROW"
        primary={true}
        onClick={this._handleSubmit}
        style={{ color: 'white' }}
      />
    ];
    return (
      <div className="items">
        <Card>
          <CardMedia
            overlay={
              this.props.data.available ? null : (
                <CardTitle subtitle="UNAVAILABLE" />
              )
            }
          >
            <img
              src={this.props.data.imageurl}
              alt={`${this.props.data.title}`}
            />
          </CardMedia>
          <CardHeader
            onClick={() =>
              this.props.history.push(
                `/profile/${this.props.data.itemowner._id}`
              )
            }
            title={this.props.data.itemowner.fullname}
            subtitle={moment(
              this.props.data.created,
              'YYYY-MM-Do h:mm:ss a'
            ).fromNow()}
            avatar={<Gravatar email={this.props.data.itemowner.email} />}
          />
          <CardTitle
            title={this.props.data.title}
            subtitle={this.props.data.tags.join(', ')}
          />
          <CardText>{this.props.data.description}</CardText>
          <CardActions>
            {this.props.data.available && this.props.data.itemowner._id !== this.props.loggedInUserId ? (

              <div>
                <FlatButton
                  backgroundColor="black"
                  label="BORROW"
                  style={{ color: 'white' }}
                  onClick={this._handleOpen}
                />
                <Dialog
                  title="Borrow Item"
                  actions={actions}
                  modal={true}
                  open={this.state.open}
                >
                  {`Do you want to request to borrow the "${
                    this.props.data.title
                    }" from ${this.props.data.itemowner.fullname} ?`}
                </Dialog>
              </div>
            ) : this.props.location.pathname.includes(`/profile/${sessionStorage.getItem('id')}`) && this.props.data.itemowner._id !== this.props.loggedInUserId ?
                <FlatButton
                  backgroundColor="black"
                  label="RETURN"
                  style={{ color: 'white' }}
                  onClick={this._handleReturn}
                /> :
                this.props.data.available && this.props.data.itemowner._id === this.props.loggedInUserId && this.props.location.pathname.includes(`/profile/${sessionStorage.getItem('id')}`) ?
                  <FlatButton
                    backgroundColor="black"
                    label="Remove"
                    style={{ color: 'white' }}
                    onClick={this._handleRemove}
                  /> : null
            }
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withRouter(Item);
