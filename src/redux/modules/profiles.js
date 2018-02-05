const GET_ITEMS_AND_USERS = 'GET_ITEMS_AND_USERS';
const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

const getItemsAndUsers = (items, userId) => ({
  //Get all items from the database
  type: GET_ITEMS_AND_USERS,
  payloadItems: items,
  payloadUserId: userId
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

export const fetchItemsAndUsersProfile = userId => dispatch => {
  dispatch(getItemsLoading()); //Litterally just dispatching this action creators into redux
  fetch('https://boomtown-server-phil.herokuapp.com/items')
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch(getItemsAndUsers(data, userId));
    })
    .catch(error => {
      dispatch(getItemsError(error));
    });
};

export default (
  state = {
    itemsData: [{}],
    user: {},
    isLoading: false,
    error: ''
  },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_AND_USERS:
      const user = action.payloadItems.find(
        item => item.itemowner._id === action.payloadUserId
      );
      return {
        ...state,
        itemsData: action.payloadItems,
        user: user.itemowner,
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
    default:
      return { ...state };
  }
};
