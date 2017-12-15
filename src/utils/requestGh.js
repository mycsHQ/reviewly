const { GraphQLClient } = require('graphql-request');
const debug = require('debug')('reviewly');

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: 'Bearer ' + process.env.GITHUB_TOKEN
  }
});

const query = `
{
  repository(owner: "mycsHQ", name: "configurator-frontend") {
    name
    description
    diskUsage
    createdAt
    pullRequests(first: 20, states: [OPEN]) {
      edges {
        node {
          id
          headRefName
          title
          url
          createdAt
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

module.exports = client.request(query).catch(e => {
  debug('api request error', e);
});
