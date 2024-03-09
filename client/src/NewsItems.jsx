import React, { Component } from 'react';

export class NewsItems extends Component {
  render() {
    const { title, description, imageurl, newsurl } = this.props;
    return (
      <div className='flex justify-center'>
        <div className="card w-80 md:mt-28" >
          <img src={imageurl} className="card-img-top h-72" alt="..."/>
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
