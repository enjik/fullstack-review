import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repo from './components/Repo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }
  componentDidMount() {
    var that = this;
    $.ajax({
      method: "GET",
      url: "/repos",
      dataType: 'json',
      success: function(data) {
        that.setState({"repos": data.result});
      },
      error: function(data, err) {
        console.log('error in retrieving repos: ' + err);
      }
    })
  }

  search(term) {
    var that = this;
    $.ajax({
      method: "POST",
      url: "/repos",
      data: {results: term},
      dataType: 'json',
      success: function(data) {
        that.setState({"repos": data.result});
      },
      error: function(obj, err) {
        console.log(err);
      }
    })
    console.log(`${term} was searched`);
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
