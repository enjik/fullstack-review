const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection Successful!');
});

//define Schema
let repoSchema = mongoose.Schema({
  name: String,
  id: Number,
  owner: String,
  stargazer: Number,
  url: String,
  description: String
});

//compile schema to model
let Repo = mongoose.model('Repo', repoSchema, 'archive');

//save obtained repos into the collection in the db
let save = (reposArray) => {
  reposArray.forEach((repo) => {
    let current = new Repo(
      {name: repo.name,
      id: repo.id,
      owner: repo.owner.login,
      stargazer: repo.stargazer_count,
      url: repo.html_url,
      description: repo.description
      }
    );
    current.save(function (err, curr) {
      if (err) return console.error(err);
      console.log('The ' + curr.name + ' repo was added to the archive!');
    })
  })
}



module.exports.save = save;
