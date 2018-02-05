import React from 'react';
import AppBar from 'material-ui/AppBar';
import Title from '../../containers/HeaderBar/';
import Buttons from './Buttons';
import './style.css';

const HeaderBar = () => {
  return (
    <AppBar
      title={<Title />}
      titleStyle={{ flex: '1 1 100%', marginBottom: '10px' }}
      iconElementRight={<Buttons />}
      iconStyleRight={{ width: '100%', margin: '0 1rem' }}
      iconStyleLeft={{ display: 'none' }}
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexWrap: 'wrap'
      }}
    />
  );
};

export default HeaderBar;
