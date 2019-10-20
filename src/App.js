import React from 'react';
import { Grid } from 'semantic-ui-react'
import './App.css';

import Navheader from './navbar';
import SideMenu from './sidemenu';
import Content from './content';

function App() {
  return (
    <div className="App">

    <Navheader />
    <Grid columns={2} padded='vertically'>
    <Grid.Column>
    <SideMenu />
    </Grid.Column>
    <Grid.Column>
      <Content />
    </Grid.Column>
    </Grid>

    </div>
  );
}

export default App;
