import React, { Component } from 'react'
import { Header, Menu, Dropdown, Segment, Grid } from 'semantic-ui-react'

import Content from './content';

export default class SideMenu extends Component {
  // Constructor
  constructor(props) {
  super(props);

  this.state = {
    cat: Object.values(props.cat),
    origcat: Object.values(props.cat),
    isShow: true,
    selectedItem: [],
  };
  console.log(this.state.cat)
  }

  // Function Definitions
  handleItemClick = (e, { name, bookid, categoryid }) => {

    var allitems = this.state.origcat
    // Narrow down by category
    var categoryBooksCollection = allitems.filter( category => {
        return category.id === categoryid;
    });

    var categoryBooks = categoryBooksCollection[0].results;
    // Finding the book in the catergory
    var book = categoryBooks.filter( book => {
        return book.id === bookid;
    });

    console.log(book)
    this.setState({ activeItem: name, selectedItem: book })
    }

  filterCat = (e, {name, categoryid}) => {
    var allitems = this.state.origcat

    if (categoryid !== "-1") {
      var filtered = allitems.filter(function(category) {
	        return category.id === categoryid;
      });
      allitems = filtered
    }
    this.setState({cat : allitems })
  }

  // Renderer
  render() {
    const { activeItem } = this.state

    return (
      <Grid columns={2} padded='vertically'>

              <Grid.Column>
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

                  {this.state.origcat.map((item) => (
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
                {this.state.cat.map((item) => {
                return(
                  <div key={item.id}>
                    {item.results.map((res) => (
                      <Menu.Item
                        key={res.id}
                        bookid={res.id}
                        categoryid={item.id}
                        name={res.title}
                        active={activeItem === res.title}
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
              </Grid.Column>
              <Grid.Column>
                <Content item={this.state.selectedItem}/>
              </Grid.Column>
          </Grid>


    )

  }
}
