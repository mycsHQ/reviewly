const { GraphQLClient } = require('graphql-request');

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: 'Bearer 32af527c94a3c39854ed95164281cd1cd35bb32a'
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
  console.error('api request error', e);
});
