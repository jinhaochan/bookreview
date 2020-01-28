import React, { Component } from 'react'
import AddItem from './addItem'
import { Button, Icon, Label, Image } from 'semantic-ui-react'


const UserScreen = ({user}) => (
	          <>
	     <Label size='large'>
	      <Image avatar spaced='right' src={user.picture.data.url} />
	{user.name}
	    </Label>

        <AddItem/>

	          </>
)

export default UserScreen
