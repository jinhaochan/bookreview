import React, { Component } from 'react'
import { Label, Form, Menu, Icon, Dropdown } from 'semantic-ui-react'
import Searchbar from './search';
import UserScreen from './userscreen';
import LoginButton from './login';
import { connect } from "react-redux";


class Navheader extends Component {

  state = {user:false}

  facebookResponse = (response) => { console.log( response ); this.setState( {...this.state, user: response } ) }


  // Function Definitions
  handleItemClick = (e, { name, itemid, categoryid }) => {

    var allitems = this.props.origCat
    // Narrow down by category
    var categoryBooksCollection = allitems.filter( category => {
        return category.id === categoryid;
    });

    var categoryBooks = categoryBooksCollection[0].results;
    // Finding the book in the catergory
    var book = categoryBooks.filter( book => {
        return book.id === itemid;
    });

    this.props.dispatch({ type: 'SELECT_BOOK', activeItem: name, selectedItem: book})

    }

  render() {

    return (
      <Menu stacked >
        <Menu.Item>
          TLDR
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
