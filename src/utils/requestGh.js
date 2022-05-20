const { GraphQLClient } = require('graphql-request');
const debug = require('debug')('reviewly');

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
  }
});

const CACHETIME = 2 * 60 * 1000; // 120s

const query = `
{
  repository(owner: "mycsHQ", name: "mycs-js") {
    name
    description
    diskUsage
    createdAt
    pullRequests(first: 60, states: [OPEN]) {
      edges {
        node {
          id
          headRefName
          title
          url
          createdAt
          bodyHTML
          comments(first: 1) {
            edges {
              node {
                bodyHTML
              }
            }
          }
          author {
            login
            avatarUrl
          }
        }
      }
    }
  }
}
`;

let cache = {
  time: Date.now(),
  content: null
};

module.exports = () => {
  if (cache.content && Date.now() - cache.time < CACHETIME) {
    return Promise.resolve(cache.content);
  }

  return client
    .request(query)
    .then(content => {
      cache = {
        time: Date.now(),
        content
      };

      return content;
    })
    .catch(e => {
      debug('api request error', e);
    });
};
