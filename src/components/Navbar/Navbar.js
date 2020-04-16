import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import '../../index.css';

class Navbar extends Component {
  state = {
    lastSelectedTheme: localStorage.getItem('app_theme') || 'light',
    themes: {
      light: {
        '--body-bg-1': '#cadeeb',
        '--body-bg-2': '#4a7796',
        '--reg-form-bg': 'rgba(167, 200, 223, 0.5)',
        '--log-form-bg': 'rgba(227, 242, 253, 0.5)',
        '--nav-bg': '#e3f2fd',
        '--about-person-bg': 'rgba(227, 242, 253, 0.65)',
        '--box-shadow': '#14142e',
        '--text-color': '#110952',
        '--primary': '#007bff',
        '--primary-hover': '#0069d9',
        '--success': '#28a745',
        '--success-hover': '#218838',
        '--info': '#17a2b8',
        '--info-hover': '#138496',
        '--warning': '#ffc107',
        '--warning-hover': '#e0a800',
        '--btn-text-first': '#ffffff',
        '--btn-text-second': '#000000',
        '--input-focus-border': '#80bdff',
        '--input-box-shadow': '0 0 0 0.2rem rgba(35, 39, 44, 0.25)',
      },
      dark: {
        '--body-bg-1': '#410c3c',
        '--body-bg-2': '#000000',

        '--reg-form-bg': 'rgba(171, 143, 187, 0.7)',
        '--log-form-bg': 'rgba(182, 146, 181, 0.7)',

        '--nav-bg': '#805d72',
        '--about-person-bg': 'rgba(128, 93, 114, 0.5)',
        '--box-shadow': '#ffece2',
        '--text-color': '#c0aca1',
        '--primary': '#3b1241',
        '--primary-hover': '#2a0c2e',
        '--success': '#4b216e',
        '--success-hover': '#2c1241',
        '--info': '#805d72',
        '--info-hover': '#5f4655',
        '--warning': '#9c7fb8',
        '--warning-hover': '#78638b',
        '--btn-text-first': '#bea497',
        '--btn-text-second': '#2b0e30',
        '--input-focus-border': '#faefe9',
        '--input-box-shadow': '0 0 0 0.2rem rgba(255, 247, 242, 0.3)',
      },
    },
  };
  onThemeSelectHandler(event) {
    const themeSelect = document.getElementById('themeSelect');
    const selectedTheme = themeSelect.value;
    this.setTheme(selectedTheme);
    localStorage.setItem('app_theme', selectedTheme);
  }
  setTheme(name) {
    const selectedThemeObj = this.state.themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
  componentDidMount() {
    this.setTheme(this.state.lastSelectedTheme);
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.addEventListener(
      'change',
      this.onThemeSelectHandler.bind(this),
    );
  }
  render() {
    return (
      <div className='navigation'>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <NavLink className='navbar-brand' to='/' exact>
            Коллекции
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                {!auth.currentUser  && (
                  <NavLink className='nav-link' to='/login'>
                    Войти
                  </NavLink>
                )}
              </li>
              <li className='nav-item'>
                {!auth.currentUser && (
                  <NavLink className='nav-link' to='/registration'>
                    Зарегистрироваться
                  </NavLink>
                )}
              </li>
              <li className='nav-item'>
                {auth.currentUser && (
                  <NavLink className='nav-link' to='/mypage'>
                    Моя страница
                  </NavLink>
                )}
              </li>
            </ul>
            <form className='form-inline my-2 my-lg-0'>
              <div className='form-group'>
                <label htmlFor='themeSelect' />
                <select
                  className='form-control'
                  id='themeSelect'
                  defaultValue={this.state.lastSelectedTheme}
                >
                  <option value='light'>Светлое оформление</option>
                  <option value='dark'>Тёмное оформление</option>
                </select>
              </div>
              {/* <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Что Вы хотите найти?'
                aria-label='Search'
              />
              <button
                className='btn btn-outline-primary my-2 my-sm-0'
                type='submit'
                onClick={(event) => event.preventDefault()}
              >
                Искать
              </button> */}
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
