import React, { Component } from 'react'
import { Menu, Icon, Dropdown } from 'semantic-ui-react'
import Searchbar from './search';

export default class MenuExampleStackable extends Component {
  constructor(props) {
    super(props);

    this.cat = props.cat;

    this.state = {
      isShow: true,
    };
  }

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          BOOKIE
        </Menu.Item>
          <Menu.Item
            name='browse'
            active={activeItem === 'browse'}
            onClick={this.handleItemClick}
          >
          <Icon name='grid layout' />
            Browse All
          </Menu.Item>

          <Menu.Item>
            <Searchbar cat={this.cat}/>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
          <Dropdown item text='Login'>
            <Dropdown.Menu>
              <Dropdown.Item>Facebook</Dropdown.Item>
              <Dropdown.Item>Google</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        </Menu.Menu>
      </Menu>
    )
  }
}
