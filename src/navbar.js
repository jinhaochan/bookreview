import React, { Component } from 'react'
import { Button, Label, Form, Menu, Icon, Dropdown } from 'semantic-ui-react'
import FacebookLoginWithButton from 'react-facebook-login';
import Searchbar from './search';

import { connect } from "react-redux";

const LoginButton = ({facebookResponse}) => (
	    <FacebookLoginWithButton
              appId="992344814485018"
              autoLoad={true}
	      fields="name,email,picture"
	      callback={facebookResponse}
	      size="small"
              icon="fa-facebook"
	      textButton = "Login"
	      />
	      )

const UserScreen = ({user}) => (
	  <>
	    <p>Welcome {user.name}!</p>
	    <img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/>
	  </>
)

class Navheader extends Component {

  state = {user:false}

  facebookResponse = (response) => { console.log( response ); this.setState( {...this.state, user: response } ) }


  // Function Definitions
  handleItemClick = (e, { name, bookid, categoryid }) => {

    var allitems = this.props.origCat
    // Narrow down by category
    var categoryBooksCollection = allitems.filter( category => {
        return category.id === categoryid;
    });

    var categoryBooks = categoryBooksCollection[0].results;
    // Finding the book in the catergory
    var book = categoryBooks.filter( book => {
        return book.id === bookid;
    });

    this.props.dispatch({ type: 'SELECT_BOOK', activeItem: name, selectedItem: book})

    }

  render() {

    return (
      <Menu pointing  secondary >
        <Menu.Item>
          BOOKIE
        </Menu.Item>
          <Menu.Item
            name='browse'
            onClick={this.handleItemClick}
          >
          <Icon name='grid layout' />
            Browse All
          </Menu.Item>

          <Menu.Item>
            <Label pointing='right'>{this.props.selectedCat}</Label>
            <Searchbar cat={this.props.cat}/>
          </Menu.Item>

          <Menu.Item position='right'>
	    { this.state.user ? <UserScreen user={this.state.user}/> :
		              <LoginButton facebookResponse={this.facebookResponse}/>
		            }
          </Menu.Item>

      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCat: state.selectedCat,
  cat : state.origCat,
})

export default connect(mapStateToProps)(Navheader);
