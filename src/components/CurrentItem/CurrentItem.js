import React, { Component } from 'react';
import '../../index.css';

class CurrentItem extends Component {
  render() {
    const { title, author, select, description, photoURL, likesNumber } = this.props;
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
        {/* <img src="https://firebasestorage.googleapis.com/v0/b/collections-project.appspot.com/o/collections%2Flike.png?alt=media&token=690c33bb-6d3e-48e9-ad4b-8a31409083ae" alt="like"/> {likesNumber} */}
        <p>{description}</p>
      </div>
    );
  }
}

export default CurrentItem;
