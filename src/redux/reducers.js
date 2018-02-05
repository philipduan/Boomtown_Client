import { combineReducers } from 'redux';
import itemsReducer from './modules/items.js';
import profileReducer from './modules/profiles.js';

export default combineReducers({
  items: itemsReducer,
  profiles: profileReducer
});
