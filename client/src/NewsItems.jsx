import React, { Component } from 'react';

export class NewsItems extends Component {
  render() {
    const { title, description, imageurl, newsurl } = this.props;
    return (
      <div className='flex'>
        <div className="card mt-24" style={{ width: "18rem" }}>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-2xl">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsurl} className="btn btn-primary">See Profile</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
