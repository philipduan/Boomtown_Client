import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { Card, CardTitle } from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import Item from '../Items/item';
import './style.css';
class ProfileCard extends Component {
  render() {
    return (
      <div className="profileCard">
        <div className="profileHead">
          <Card>
            <CardTitle
              title={<h2>{this.props.user.fullname}</h2>}
              subtitle={this.props.user.bio}
            />
            <div className="profileMeta">
              <CardTitle
                className="profileOwned"
                title={this.props.itemsOwned.length}
                subtitle="Items shared"
              />
              <CardTitle
                className="profileBorrowed"
                title={this.props.itemsBorrowed.length}
                subtitle="Items borrowed"
              />
              <Gravatar
                className="profilePicture"
                size={100}
                email={this.props.user.email}
              />
            </div>
          </Card>
        </div>
        <Masonry>
          {this.props.itemsBorrowed.map((item, index) => {
            return <Item key={index} data={item} />;
          })}

          {this.props.itemsOwned.map((item, index) => {
            return <Item key={index} data={item} />;
          })}
        </Masonry>
      </div>
    );
  }
}

export default ProfileCard;
