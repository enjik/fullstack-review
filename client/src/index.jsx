import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    $.ajax({
      method: "POST",
      url: "/repos",
      data: {results: term},
      dataType: "json",
      success: function(results) {
        //results should be the repo content to be rendered
      },
      error: function(obj, err) {
        console.log(err);
      }
    })
    console.log(`${term} was searched`);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
