import React, { Component } from 'react'
import { Header, Menu, Dropdown } from 'semantic-ui-react'

export default class MenuExampleText extends Component {
  constructor(props) {
  super(props);

  this.cat = Object.values(props.cat);

  console.log(this.cat)

  this.state = {
    isShow: true,
  };
}
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
      <Dropdown item text='Categories'>
        <Dropdown.Menu>
          {this.cat.map((item, index) => (
          <Dropdown.Item>{item.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {this.cat.map((item, index) => {
        return(
          <div>
        {item.results.map((res, index) => (
        <Menu.Item
          name={res.title}
          active={activeItem === res.title}
          onClick={this.handleItemClick}
        >
        <div class="ui top left attached label">{item.name}</div>
          <Header as='h4'>{res.title}</Header>
          <p>{res.description}</p>
        </Menu.Item>
        ))}
        </div>
      )
    })}


      </Menu>
    )

  }
}
