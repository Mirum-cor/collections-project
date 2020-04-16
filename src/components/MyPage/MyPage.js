import React, { Component } from 'react';
import { Form, Col, Row, Button, Container } from 'react-bootstrap';
import map from 'lodash/map';
import { auth, database, storage } from '../../firebase';
import '../../index.css';
import Navbar from '../Navbar/Navbar';
import Item from '../Item/Item';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null,
      isFormValid: false,
      formControls: {
        title: {
          controlId: 'formHorizontalTitle',
          label: 'Название',
          value: '',
          type: 'text',
          placeholder: 'Предмет коллекции',
        },
        description: {
          controlId: 'formHorizontalDescription',
          label: 'Описание',
          value: '',
          type: 'textarea',
          placeholder: 'Введите описание предмета',
        },
        select: {
          controlId: 'exampleForm.ControlSelect2',
          label: 'Выберите категорию',
          value: 'Разное',
          type: 'select',
        },
        photo: {
          controlId: 'exampleForm.ControlSelect2',
          label: 'Загрузите фото',
          value: '',
          type: 'file',
          src: '',
          file: {},
        },
      },
    };
  }
  logoutHandler(event) {
    event.preventDefault();
    auth.signOut();
    localStorage.setItem('currentUser', null);
    this.props.history.push('/');
    window.location.reload();
  }
  getRegDate() {
    let users = {};
    let user = {};
    let regDate = '';
    database.ref('users/').on('value', (snapshot) => {
      users = snapshot.val();
      Object.keys(users).map((uid) => {
        user = users[uid];
        if (user.uid === auth.currentUser.uid) {
          regDate = user.firstVisit;
        }
        return true;
      });
    });
    return regDate;
  }
  async createNewItem(event) {
    event.preventDefault();
    const titleValue = this.state.formControls.title.value;
    const descriptionValue = this.state.formControls.description.value;
    const selectValue = this.state.formControls.select.value;
    const photo = this.state.formControls.photo;
    const photoRef = storage.ref(
      `collections/${selectValue}/${titleValue}/${titleValue}${photo.file.name}`,
    );
    await photoRef.put(photo.file);
    const photoSrc = await photoRef.getDownloadURL();
    const currentUserName = auth.currentUser.displayName;
    const currentUserUid = auth.currentUser.uid;
    await database.ref(`collections/${titleValue}${currentUserUid}`).set({
      title: titleValue,
      description: descriptionValue,
      select: selectValue,
      author: currentUserName,
      uid: currentUserUid,
      photoURL: photoSrc,
      likesNumber: 0,
      liked: '',
    });
    document.forms.newItemForm.reset();
    this.props.history.push('/');
  }
  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    formControls[controlName] = control;
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].value && isFormValid;
    });
    this.setState({ formControls, isFormValid });
  };
  onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const formControls = this.state.formControls;
    let isFormValid = this.state.isFormValid;
    reader.onload = (e) => {
      formControls.photo.src = reader.result;
      formControls.photo.file = file;
      isFormValid = true;
      this.setState({ formControls, isFormValid });
    };
    reader.readAsDataURL(file);
  };
  triggerUpload = (event) => {
    event.preventDefault();
    this.refs.fileInput.click();
  };
  renderNewItemForm() {
    const title = this.state.formControls.title;
    const description = this.state.formControls.description;
    const select = this.state.formControls.select;
    const photo = this.state.formControls.photo;
    return (
      <Form name='newItemForm'>
        <Form.Group as={Row} controlId={title.controlId}>
          <Form.Label column sm={2}>
            {title.label}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type={title.type}
              placeholder={title.placeholder}
              required
              value={title.value}
              onChange={(event) => this.onChangeHandler(event, 'title')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId={description.controlId}>
          <Form.Label column sm={2}>
            {description.label}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              rows='10'
              as={description.type}
              placeholder={description.placeholder}
              required
              value={description.value}
              onChange={(event) => this.onChangeHandler(event, 'description')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId={select.controlId}>
          <Form.Label column sm={2}>
            {select.label}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as={select.type}
              required
              value={select.value}
              onChange={(event) => this.onChangeHandler(event, 'select')}
            >
              <option>Алкоголь</option>
              <option>Значки</option>
              <option>Игрушки</option>
              <option>Камни</option>
              <option>Книги</option>
              <option>Марки</option>
              <option>Монеты</option>
              <option>Открытки</option>
              <option>Разное</option>
              <option>Украшения</option>
              <option>Цветы</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId={photo.controlId}>
          <Form.Label column sm={2}>
            {photo.label}
          </Form.Label>
          <Col sm={10}>
            <Form.File id='formcheck-api-regular'>
              <Button
                className='upload-picture'
                onClick={(event) => this.triggerUpload(event)}
                variant='warning'
              >
                Загрузить фото
              </Button>
              <Form.File.Input
                ref='fileInput'
                style={{ display: 'none' }}
                required
                value={photo.value}
                onChange={(event) => this.onFileChange(event)}
              />
            </Form.File>
            {this.state.formControls.photo.src ? (
              <img
                src={this.state.formControls.photo.src}
                className='item-picture'
                alt='предмет'
              />
            ) : null}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type='submit'
              variant='success'
              onClick={this.createNewItem.bind(this)}
              disabled={!this.state.isFormValid}
            >
              Опубликовать
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
  componentDidMount() {
    database.ref(`collections`).on('value', (snapshot) => {
      this.setState({ collections: snapshot.val() });
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className='my-page'>
          <div className='about-person'>
            <h1>
              Имя: {auth.currentUser.displayName || auth.currentUser.email}
            </h1>
            <h5>
              Дата регистрации:{' '}
              {localStorage.getItem('firstVisit') || this.getRegDate()}
            </h5>
            <h3>E-mail: {auth.currentUser.email}</h3>
            {auth.currentUser.photoURL ? (
              <img src={auth.currentUser.photoURL} alt='user' />
            ) : (
              <i>Нет фото</i>
            )}
            <hr />
            <button
              className='btn btn-info my-2 my-sm-0'
              type='submit'
              onClick={this.logoutHandler.bind(this)}
            >
              Выйти из профиля
            </button>
          </div>
          <div className='new-item'>{this.renderNewItemForm()}</div>
        </div>
        <Container>
          {map(this.state.collections, (item, itemName) =>
            item.author === auth.currentUser.displayName ? (
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
            ) : null,
          )}
        </Container>
      </div>
    );
  }
}

export default MyPage;
