import React from 'react';

const Repo = (props) => (
  <div>
    Repo Url: {props.info.html_url }
    Repo StarCount: {props.info.stargazers_count}
  </div>
)

export default Repo;
