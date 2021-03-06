import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export const rest = reduxApi({
  getEvents: {
    url: '/events',
    options: {
      method: 'GET'
    }
  },

  getSingleEvent: {
    url: '/events/:id',
    options: {
      method: 'GET'
    }
  },

  createEvent: {
    url: '/events',
    options: {
      method: 'POST'
    }
  }
});

rest
  .use('fetch', adapterFetch(fetch))
  .use('rootUrl', 'http://localhost:3002')
  .use('options', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
