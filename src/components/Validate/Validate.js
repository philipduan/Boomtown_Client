import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import { blueGrey900 } from 'material-ui/styles/colors';

const styles = {
    fieldStyle: {
        width: '100%'
    },
    errorStyle: {
        color: blueGrey900,
        position: 'absolute',
        bottom: '-0.42rem'
    },
    underlineStyle: {
        borderColor: blueGrey900
    }
};

const LoginField = ({ label, errText, handleUser, handlePassword }) => (
    <TextField
        style={styles.fieldStyle}
        hintText={label}
        floatingLabelText={label}
        errorText={errText}
        errorStyle={styles.errorStyle}
        underlineFocusStyle={styles.underlineStyle}
        onChange={label === 'Email' ? event => handleUser(event.target.value) : event => handlePassword(event.target.value)}
        type={label === 'Email' ? 'text' : 'password'}
    />
);

const BioField = ({ label, errText, handleFullname, handleBio }) => (
    <TextField
        style={styles.fieldStyle}
        hintText={label}
        floatingLabelText={label}
        errorText={errText}
        errorStyle={styles.errorStyle}
        underlineFocusStyle={styles.underlineStyle}
        onChange={label === 'Full Name' ? event => handleFullname(event.target.value) : event => handleBio(event.target.value)}
        type={'text'}
    />
)

LoginField.propTypes = {
    label: PropTypes.string.isRequired
};


export {
    LoginField,
    BioField
}