import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../../index.css';

class Item extends Component {
  render() {
    const partOfDescription = this.props.description.slice(0, 50) + '...';
    return (
      <Card style={{ width: '18rem' }}>
        <div className='card-img'>
          <Card.Img variant='top' src={this.props.photoURL} />
        </div>
        <Card.Body>
          <Card.Title>
            <b>{this.props.title}</b>
          </Card.Title>
          <Card.Text>
            <i>Категория:</i> {this.props.select}
            <br />
            <i>Автор:</i> {this.props.author}
            <br />
            {partOfDescription}
          </Card.Text>
          <Button
            variant='primary'
            props={this.props}
            onClick={() =>
              this.props.history.push(
                `/collections/${this.props.title.toLowerCase()}`,
              )
            }
          >
            Подробнее
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Item);
