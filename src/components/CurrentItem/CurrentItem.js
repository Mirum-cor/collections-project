import React, { Component } from 'react';
import '../../index.css';

class CurrentItem extends Component {
  render() {
    const { title, author, select, description, photoURL } = this.props;
    return (
      <div>
        <img className='current-item-photo' src={photoURL} alt='предмет' />
        <h1>
          <b>{title}</b>
        </h1>
        <h3>
          <i>Категория: </i>
          {select}
        </h3>
        <h5>
          <i>Автор: </i>
          {author}
        </h5>
        <p>{description}</p>
      </div>
    );
  }
}

export default CurrentItem;
