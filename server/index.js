const express = require('express');
let app = express();
const db = require('../database/index.js');
const git = require('../helpers/github.js');
const bodyparser = require('body-parser');

//serve up static assets
app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  console.log(req.method, res.path);
  next();
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.post('/repos', function (req, res) {
  console.log('Search submit worked from ther server!')
  const username = req.body.results;
  console.log('req body: ' + req.body);
  console.log('c\'est username: ' + username);
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //result of successful repo retrieval from Git API
  //const reposArray;
  git.getReposByUsername(username,  (results) => {
    console.log('results' + results);
    db.save(results);
    res.send({result: results});
  });
});

app.get('/repos', function (req, res) {
  console.log('get request reaching server!');
  db.Repo.find().sort({"stargazers_count": -1}).limit(25).exec( (err, results) => {
    console.log('GET RESULTS: ' + results.toArray());
    res.send({result: results.toArray()});
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
