import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import map from 'lodash/map';
import { database } from '../../firebase';
import Navbar from '../Navbar/Navbar';
import CurrentItem from '../CurrentItem/CurrentItem';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null,
    };
  }
  componentDidMount() {
    database.ref(`collections`).on('value', (snapshot) => {
      this.setState({ collections: snapshot.val() });
    });
  }
  render() {
    const titleURL = this.props.match.params.title;
    const title = titleURL.slice(0, 1).toUpperCase() + titleURL.slice(1);
    return (
      <div>
        <Navbar />
        <div className='to-main-page'>
          <Button variant='info' onClick={() => this.props.history.push('/')}>
            К коллекциям
          </Button>
        </div>
        <Container className='current-item'>
          {map(this.state.collections, (item, itemName) => {
            return item.title === title ? (
              <CurrentItem
                key={itemName}
                photoURL={item.photoURL}
                title={item.title}
                select={item.select}
                author={item.author}
                description={item.description}
              />
            ) : null;
          })}
        </Container>
      </div>
    );
  }
}

export default ItemDetail;
