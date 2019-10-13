import React from 'react';
import './App.css';

import Navheader from './navbar';
import SideMenu from './sidemenu';
import _ from 'lodash'
import faker from 'faker'

// Function definitions
const getResults = () =>
  _.times(5, () => ({
    id: faker.random.uuid(),
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    cover: faker.image.cats(),
    review: faker.lorem.paragraphs(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }))

const category = _.range(0, 3).reduce((memo) => {
  const name = faker.hacker.noun()
  const id = faker.random.number()
  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    id,
    name,
    results: getResults(),
  }
  return memo
}, {})


function App() {
  return (
    <div className="App">

    <Navheader cat={category}/>
    <SideMenu cat={category}/>

    </div>
  );
}

export default App;
