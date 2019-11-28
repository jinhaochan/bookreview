import React, { Component } from 'react'
import { Label, Form, Menu, Icon, Dropdown } from 'semantic-ui-react'
import Searchbar from './search';

import { connect } from "react-redux";

class Navheader extends Component {

  state = {}

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
      <Menu stackable>
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

          <Menu.Menu position='right'>
          <Dropdown item text='Login'>
            <Dropdown.Menu>
              <Dropdown.Item>Facebook</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>

      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCat: state.selectedCat,
  cat : state.origCat,
})

export default connect(mapStateToProps)(Navheader);
