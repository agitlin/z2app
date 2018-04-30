import React, { Component } from 'react';

import './App.css';
import fire ,{ auth, provider } from './firebase';
class App extends Component {
  constructor() {
    super();
    this.state = {
      appName: '',
      username: '',
      appsters:[],
      user:null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
    }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const itemsRef = fire.database().ref('appsters');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          app: items[item].app,
          user: items[item].user
        });
      }
      this.setState({
        appsters: newState
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const appstersRef = fire.database().ref('appsters');
    const appster = {
      app: this.state.appName,
      user: this.state.user.displayName || this.state.user.email
    }
    appstersRef.push(appster);
    this.setState({
      appName: '',
      username: ''
    });
  }
  removeItem(itemId) {
    const itemRef = fire.database().ref(`/appsters/${itemId}`);
    itemRef.remove();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>Zero to App Meetup</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
            :
              <button onClick={this.login}>Log In</button>              
            }
          </div>
        </header>
    {this.state.user ?
    <div>
      <div className='user-profile'>
        <img src={this.state.user.photoURL} alt="Your face"/>
      </div>
      <div className='container'>
    <section className='add-item'>
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
        <input type="text" name="appName" placeholder="What's your app?" onChange={this.handleChange} value={this.state.appName} />
        <button>Add App</button>
      </form>
    </section>
  </div>
    </div>
    :
    <div className='wrapper'>
      <p>You must be logged in to see users and apps.</p>
    </div>
  }
  <section className='display-item'>
    <div className="wrapper">
      <ul>
        {this.state.appsters.map((appster) => {
          return (
            <li key={appster.id}>
              <h3>{appster.app}</h3>
              <p>app by: {appster.user}
                 {appster.user === this.state.user.displayName || appster.user === this.state.user.email ?
                   <button onClick={() => this.removeItem(appster.id)}>Remove App</button> : null}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  </section>
      </div>
    );
  }
  
}
export default App;