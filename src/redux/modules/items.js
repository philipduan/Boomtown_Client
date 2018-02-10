import _ from 'underscore';
//Action Creators
const GET_ITEMS = 'GET_ITEMS';
const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
const GET_TAGS_AND_FILTER = 'GET_TAGS_AND_FILTER';

const getItems = items => ({
  //Get all items from the database
  type: GET_ITEMS,
  payload: items
});

const getItemsLoading = () => ({
  //??
  type: GET_ITEMS_LOADING
});

const getItemsError = error => ({
  //Cath error from fetch
  type: GET_ITEMS_ERROR,
  payload: error
});

const getTagsAndFilter = tags => ({
  //Save tags from select fields in Title.js and filter to display selected tags
  type: GET_TAGS_AND_FILTER,
  payload: tags
});

export const fetchItemsAndUsers = () => dispatch => {
  dispatch(getItemsLoading()); //Litterally just dispatching this action creators into redux
  fetch('https://boomtown-server-phil.herokuapp.com/items')
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch(getItems(data));
    })
    .catch(error => {
      dispatch(getItemsError(error));
    });
};

export const getTags = tags => dispatch => {
  dispatch(getTagsAndFilter(tags));
};

export const patchItemBorrower = data => dispatch => {
  fetch('https://boomtown-server-phil.herokuapp.com/items', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res)
    .catch(error => {
      console.log('error', error);
    })
    .then(() => {
      fetch('https://boomtown-server-phil.herokuapp.com/items')
        .then(response => {
          return response.json();
        })
        .then(data => {
          dispatch(getItems(data));
        })
        .catch(error => {
          dispatch(getItemsError(error));
        });
    });
};
//Reducers

export default (
  state = {
    itemsData: [],
    usersData: [],
    isLoading: false,
    itemsFiltered: [],
    tags: [],
    error: ''
  },
  action
) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        itemsData: action.payload,
        isLoading: false
      };
    case GET_ITEMS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_TAGS_AND_FILTER:
      const itemsFiltered = state.itemsData.filter(item => {
        return _.intersection(action.payload, item.tags).length > 0;
      });
      return {
        ...state,
        itemsFiltered,
        tags: action.payload
      };
    default:
      return { ...state };
  }
};
