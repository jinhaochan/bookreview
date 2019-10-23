import React, { Component } from 'react'
import { Header, Menu, Dropdown, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SideMenu extends Component {

  // Function Definitions
  handleItemClick = (e, { name, bookid, categoryid }) => {

    var allitems = this.props.origCatList
    // Narrow down by category
    var categoryBooksCollection = allitems.filter( category => {
        return category.id === categoryid;
    });

    var categoryBooks = categoryBooksCollection[0].results;
    // Finding the book in the catergory
    var book = categoryBooks.filter( book => {
        return book.id === bookid;
    });

    this.props.dispatch({ type: 'SELECT_BOOK', activeItem: name, selectedItem: book[0]})

    }

  filterCat = (e, {name, categoryid}) => {

    this.props.dispatch({ type: 'FILTER', selectedCat: categoryid})
  }

  // Renderer
  render() {

    return (

              <Menu vertical>
              <Dropdown item text='Categories'>
                <Dropdown.Menu>

                <Dropdown.Item
                  name="all"
                  categoryid="-1"
                  onClick={this.filterCat}
                >
                  All Categories
                </Dropdown.Item>

                  {this.props.origCatList.map((item) => (
                  <Dropdown.Item
                    key={item.id}
                    categoryid={item.id}
                    name={item.name}
                    onClick={this.filterCat}
                  >
                    {item.name}

                  </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Segment.Group style={{overflow: 'auto', maxHeight: 1000 }}>
                {this.props.changeableCatList.map((item) => {
                return(
                  <div key={item.id}>
                    {item.results.map((res) => (
                      <Menu.Item
                        key={res.id}
                        bookid={res.id}
                        categoryid={item.id}
                        name={res.title}
                        active={this.props.activeItem === res.title}
                        onClick={this.handleItemClick}
                       >
                         <div className="ui top left attached label">{item.name}</div>
                         <Header as='h4'>{res.title}</Header>
                         <p>{res.description}</p>
                      </Menu.Item>
                    ))}
                  </div>
                  )
                })}
              </Segment.Group>

              </Menu>

    )

  }
}

const mapStateToProps = (state) => ({
  origCatList : state.origCatList,
  changeableCatList : state.changeableCatList,
  activeItem: state.activeItem
})

export default connect(mapStateToProps)(SideMenu);
