import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { auth } from './firebase';
import './index.css';
import Login from './components/Login/Login';
import Registration from './components/Registation/Registrations';
import MyPage from './components/MyPage/MyPage';
import Collections from './components/Collections/Collections';
import ItemDetail from './components/ItemDetail/ItemDetail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({ currentUser });
    });
  }
  render() {
    return (
      <div className='App'>
        <Route path='/' exact component={Collections} />
        <Route path='/login' exact component={Login} />
        <Route path='/registration' exact component={Registration} />
        <Route path='/mypage' exact component={MyPage} />
        <Route path='/collections/:title' exact component={ItemDetail} />
      </div>
    );
  }
}

export default App;
