import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { auth, database, googleAuthProvider, githubAuthProvider } from '../../firebase';
import '../../index.css';
import Navbar from '../Navbar/Navbar';

class Login extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        controlId: 'formBasicEmail',
        label: 'E-mail',
        value: '',
        type: 'email',
        placeholder: 'Введите Ваш e-mail',
        feedback: 'Введите корректный e-mail',
        invalid: false,
        valid: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        controlId: 'formBasicPassword',
        label: 'Пароль',
        value: '',
        type: 'password',
        placeholder: 'Введите пароль',
        feedback: 'Пароль должен содержать минимум 6 символов',
        invalid: false,
        valid: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };
  isEmail(value) {
    let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
    return value.match(regexp) ? true : false;
  }
  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = this.isEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }
  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.invalid = !this.validateControl(control.value, control.validation);
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    this.setState({
      formControls,
      isFormValid,
    });
  };
  renderFormGroups() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Form.Group controlId={control.controlId} key={control + index}>
          <Form.Label>{control.label}</Form.Label>
          <Form.Control
            required
            type={control.type}
            placeholder={control.placeholder}
            isInvalid={control.invalid}
            isValid={control.valid}
            value={control.value}
            onChange={(event) => this.onChangeHandler(event, controlName)}
          />
          <Form.Control.Feedback type='invalid'>
            {control.feedback}
          </Form.Control.Feedback>
        </Form.Group>
      );
    });
  }
  getFullDate() {
    const regDate = new Date();
    let regDay = regDate.getDate();
    let regMounth = regDate.getMonth();
    const regYear = regDate.getFullYear();
    regDay = regDay < 10 ? '0' + regDay : regDay;
    regMounth = regMounth < 10 ? '0' + (regMounth + 1) : regMounth + 1;
    return `${regDay}.${regMounth}.${regYear}`;
  }
  loginEmailHandler = (event) => {
    event.preventDefault();
    const email = this.state.formControls.email.value;
    const password = this.state.formControls.password.value;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        database.ref('users/').on('value', (snapshot) => {
          this.props.history.push('/mypage');
        });
      })
      .catch((error) => {
        alert(String(error));
      });
  };
  loginGoogleHandler(event) {
    event.preventDefault();
    auth.signInWithPopup(googleAuthProvider).then(() => {
      const firstVisit = this.getFullDate();
      database.ref('users/' + auth.currentUser.uid).set({
        email: auth.currentUser.email,
        firstVisit,
        isAdmin: false,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        status: 'активен',
        uid: auth.currentUser.uid,
      });
      this.props.history.push('/mypage');
    });
  }
  loginGitHubHandler(event) {
    event.preventDefault();
    auth.signInWithPopup(githubAuthProvider).then(() => {
      const firstVisit = this.getFullDate();
      database.ref('users/' + auth.currentUser.uid).set({
        email: auth.currentUser.email,
        firstVisit,
        isAdmin: false,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        status: 'активен',
        uid: auth.currentUser.uid,
      });
      this.props.history.push('/mypage');
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Form className='login-form' validated={this.state.isFormValid}>
            {this.renderFormGroups()}
            <Button
              variant='primary'
              type='submit'
              onClick={this.loginEmailHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <hr />
            <div className='other-accounts'>
              <Button
                variant='info'
                type='submit'
                onClick={this.loginGoogleHandler.bind(this)}
              >
                Google-аккаунт
              </Button>
              <Button
                variant='info'
                type='submit'
                disabled
                onClick={this.loginGitHubHandler.bind(this)}
              >
                GitHub-аккаунт
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
