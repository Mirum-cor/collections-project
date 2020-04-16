import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import map from 'lodash/map';
import { database } from '../../firebase';
import Navbar from '../Navbar/Navbar';
import Item from '../Item/Item';

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null,
    };
  }
/*   oneMoreLike(likesNumber, itemName) {
    likesNumber++;
    database.ref(`collections/${itemName}`).update({
      likesNumber,
    });
  } */
  componentDidMount() {
    database.ref(`collections`).on('value', (snapshot) => {
      this.setState({ collections: snapshot.val() });
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          {map(this.state.collections, (item, itemName) => (
            <Item
              key={itemName}
              // itemName={itemName}
              photoURL={item.photoURL}
              title={item.title}
              select={item.select}
              author={item.author}
              description={item.description}
              likesNumber={item.likesNumber}
              // oneMoreLike={this.oneMoreLike}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default Collections;
