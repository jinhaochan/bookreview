import React from 'react';
import './App.css';
import Navheader from './navbar';
import SideMenu from './sidemenu';
import _ from 'lodash'
import faker from 'faker'

const getResults = () =>
  _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }))

const category = _.range(0, 3).reduce((memo) => {
  const name = faker.hacker.noun()

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
  }

  return memo
}, {})


function App() {
  return (
    <div className="App">

    <React.Fragment>
    <Navheader cat={category}/>
    <SideMenu cat={category}/>
    </React.Fragment>

    </div>
  );
}

export default App;
