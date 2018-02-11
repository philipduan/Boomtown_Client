import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ShareRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      imageurl: 'https://boomtown-server-phil.herokuapp.com/images/item-placeholder.jpg',
      tags: [],
      itemowner: '',
      created: '',
      available: true,
      stepIndex: 0
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleNext = this._handleNext.bind(this);
    this._handlePrev = this._handlePrev.bind(this);
    this._renderStepActions = this._renderStepActions.bind(this);
  }



  _handleSubmit() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      imageurl: this.state.imageurl,
      tags: this.state.tags,
      itemowner: this.props.loggedInUserId,
      created: moment().format('YYYY-MM-Do h:mm:ss a'),
      available: true
    };
    fetch('https://boomtown-server-phil.herokuapp.com/items', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res)
      .catch(error => {
        console.log('error', error);
      })
      .then(res => {
        console.log('res', res);
        this.props.history.push('/items')
      });
  }
  _menuItems(tags) {
    return tags.map(tag => (
      <MenuItem
        key={tag.value}
        insetChildren={true}
        checked={this.state.tags.indexOf(tag.tag) > -1}
        value={tag.tag}
        primaryText={tag.tag}
      />
    ));
  }

  _handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  }

  _handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  _renderStepActions(step, statement) {
    const { stepIndex } = this.state;
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === 2 ? 'Confirm' : 'Next'}
          disabled={statement}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={stepIndex === 2 ? this._handleSubmit : this._handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this._handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { stepIndex } = this.state;
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
      <div className="shareRight">
        <Stepper activeStep={stepIndex} orientation="vertical">
          {/* <Step>
            <StepLabel>Add an Image</StepLabel>
            <StepContent className="content">
              <p>
                We live in a visual culture. Upload an image of the item you're
                sharing.
              </p>
              {this._renderStepActions(0, false)}
            </StepContent>
          </Step> */}
          <Step>
            <StepLabel>Add a Title {`&`} Description</StepLabel>
            <StepContent className="content">
              <p>
                Folks need to know what you're sharing. Give them a clue by
                adding a title {`&`} description.
              </p>
              <TextField
                hintText="Title"
                onChange={event => {
                  this.setState({ title: event.target.value });
                  this.props.onTitleChange(event.target.value)
                }}
                floatingLabelText="Title"
                floatingLabelFixed={true}
                floatingLabelFocusStyle={{ color: 'white' }}
                value={this.state.title ? this.state.title : null}
              />
              <TextField
                hintText="Description"
                multiLine={true}
                onChange={event => {
                  this.setState({ description: event.target.value });
                  this.props.onDescriptionChange(event.target.value)
                }}
                floatingLabelText="Description"
                floatingLabelFixed={true}
                floatingLabelFocusStyle={{ color: 'white' }}
                value={this.state.description ? this.state.description : null}
              />
              <br />
              {this._renderStepActions(0, this.state.title ? false : true)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Categorize Your item</StepLabel>
            <StepContent className="content">
              <SelectField
                multiple={true}
                hintText="Filter by Tag"
                value={this.state.tags}
                onChange={(event, index, tags) => {
                  this.setState({ tags });
                  this.props.onTagsChange(tags)
                }}
              >
                {this._menuItems(tags)}
              </SelectField>
              {this._renderStepActions(
                1,
                this.state.tags.length !== 0 ? false : true
              )}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirm Things!</StepLabel>
            <StepContent className="content">
              <p>Great! If you're happy with everything, tap the button</p>
              {this._renderStepActions(2, false)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default withRouter(ShareRight);
