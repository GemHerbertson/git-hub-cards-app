import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios').default;
import './App.css';

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card {...profile}/>)}
  </div>
);

class Card extends Component {
  render () {
    const profile = this.props;
    return (
        <div className="github-profile" style={{margin: '1rem'}}>
          <img src={profile.avatar_url}/>
          <div className="info" style={{diplay: 'inline-block', marginLeft: 10}}>
            <div className="name" style={{fontSize: '125%'}}>{profile.name}</div>
            <div className="company">{profile.company}</div>
          </div>
        </div>
    );
  }
};

class Form extends Component {
  state = {userName:""}
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
  };

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.userName} onChange={event => this.setState({userName:event.target.value})} placeholder="GitHub Username" /*ref={this.userNameInput}*/ required/>
        <button>Add Card</button>
      </form>
    )
  }
}
class App extends Component {
  state = {                
    profiles: [],   
  };
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
  };
  render () {
    return ( 
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }
};

ReactDOM.render(
  <App title="The GitHub Cards App" />, 
  document.getElementById('root')
);