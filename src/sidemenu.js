import React, { Component } from 'react'
import { Header, Menu, Dropdown, Segment } from 'semantic-ui-react'

export default class MenuExampleText extends Component {
  constructor(props) {
  super(props);

  this.state = {
    cat: Object.values(props.cat),
    origcat: Object.values(props.cat),
    isShow: true,
  };

}
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  filterCat = (e, {name}) => {
    var newlist
    newlist = this.state.origcat

    if (name !== "all") {

      var filtered = newlist.filter(function(category) {
	        return category.name === name;
      });

      newlist = filtered
    }
    this.setState({cat : newlist })

  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
      <Dropdown item text='Categories'>
        <Dropdown.Menu>

        <Dropdown.Item
          name="all"
          onClick={this.filterCat}
        >
          All Categories
        </Dropdown.Item>

          {this.state.origcat.map((item) => (
          <Dropdown.Item
            key={item.id}
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
    )

  }
}
