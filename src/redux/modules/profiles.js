const GET_ITEMS_AND_USERS = 'GET_ITEMS_AND_USERS';
const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
const SIGN_IN_USER = 'SIGN_IN_USER';

const getItemsAndUsers = (user) => ({
  //Get all items from the database
  type: GET_ITEMS_AND_USERS,
  payload: user
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

const signInUser = userId => ({
  type: SIGN_IN_USER,
  payload: userId
})

export const fetchItemsAndUsersProfile = userId => dispatch => {
  dispatch(getItemsLoading()); //Litterally just dispatching this action creators into redux
  fetch(`https://boomtown-server-phil.herokuapp.com/users/${userId}`)
    .then(response => {
      return response.json();
    })
    .then(user => {
      console.log(user);
      dispatch(getItemsAndUsers(user))

    })
    .catch(error => {
      console.log(error);
    });
};

export const logInUser = userEmail => dispatch => {
  let data = {
    email: userEmail
  };
  sessionStorage.setItem('email', userEmail);
  fetch('https://boomtown-server-phil.herokuapp.com/email', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(id => {
      dispatch(signInUser(id));
      sessionStorage.setItem('id', id);
    })
    .catch(error => {
      console.log('error', error);
    })
}

export const patchItemBorrower = (data, userId) => dispatch => {
  fetch('https://boomtown-server-phil.herokuapp.com/items', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => { return res.json() })
    .then(res => {
      dispatch(fetchItemsAndUsersProfile(res[1]['_id']));
    })
    .catch(error => {
      console.log('error', error);
    });
};

export const deleteItemOwned = (data, userId) => dispatch => {
  fetch('https://boomtown-server-phil.herokuapp.com/items', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => { return res.json() })
    .then(() => {
      dispatch(fetchItemsAndUsersProfile(userId));
    })
    .catch(error => {
      console.log('error', error);
    })

};

export default (
  state = {
    itemsOwned: [{}],
    itemsBorrowed: [{}],
    loggedInUserId: '',
    user: {},
    isLoading: false,
    error: ''
  },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_AND_USERS:
      return {
        ...state,
        itemsOwned: action.payload.itemsOwned,
        itemsBorrowed: action.payload.itemsBorrowed,
        user: action.payload,
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
    case SIGN_IN_USER:
      return {
        ...state,
        loggedInUserId: action.payload
      }
    default:
      return { ...state };
  }
};
