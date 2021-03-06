import React, { PropTypes } from 'react';
import Router, { Route, Link } from 'react-router';
import components from '../component/index';

const App = React.createClass({
  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object,
  },

  renderList() {
    const items = Object.keys(components).map(key => {
      const group = components[key];
      const list = Object.keys(group).map(c => {
        const entry = group[c];

        return (
          <li key={'component-' + c}>
            <Link to="/" query={{ page: c, group: key }}>{c}</Link>
          </li>
        );
      });

      return (
        <div key={'group-' + key} className="component-list-container">
          <p className="group-name">{key}</p>
          <ul className="component-list">
            {list}
          </ul>
        </div>
      );
    });

    return (
      <div className="component-list-wrapper">
        <p className="title">components</p>
        {items}
      </div>
    );
  },

  renderPageDetail() {
    const { params, location } = this.props;
    const { query } = location;
    const { group, page } = query;

    return (
      <div className="component-wrapper">
        <p className="back"><Link to="/" params={{}}>Back to homepage</Link></p>
        <p className="title">{page}</p>
        {components[group] && components[group][page] ? React.createElement(components[group][page]) : null}
      </div>
    );
  },

  render() {
    const { location, params } = this.props;

    if (!location.query || !location.query.page) {
      return this.renderList();
    }

    return this.renderPageDetail();
  },
});

export default App;
