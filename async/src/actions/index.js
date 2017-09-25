export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit,
});

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit,
});

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit,
});

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now(),
});

const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit));
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)));
};

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit));
  }
};
