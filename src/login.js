import React from 'react'
import FacebookLoginWithButton from 'react-facebook-login';

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

export default LoginButton
