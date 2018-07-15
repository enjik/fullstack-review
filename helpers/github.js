const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  let cb = (error, response, body) => {
    if (!error) {
      // console.log('in github', response.body)
      let info = response.body;
      callback(info);
    }
  }
  request(options, cb);

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
}

module.exports.getReposByUsername = getReposByUsername;
