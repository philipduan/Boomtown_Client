import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import defaultItemPicture from '../../images/item-placeholder.jpg';
class ShareLeft extends Component {

  render() {
    return (
      <div className="shareLeft">
        <Card style={{ height: '100%' }}>
          <CardMedia>
            <img src={defaultItemPicture} alt="" />
          </CardMedia>
          <CardHeader
            avatar={
              <Gravatar
                className="profilePicture"
                size={50}
                email={`mandi@redacademy.com`}
                onClick={() => {
                  this.props.history.push('/profile/5a6b7ad6504b9712482b495b');
                }}
              />
            }
          />
          <CardTitle
            title={
              this.props.data.title
                ? this.props.data.title
                : 'Amazing Item Title'
            }
            subtitle={
              this.props.data.tags.length > 0
                ? this.props.data.tags.toString(', ')
                : null
            }
          />

          <CardText>
            {' '}
            {this.props.data.description
              ? this.props.data.description
              : 'Profound Item Description'}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default withRouter(ShareLeft);
