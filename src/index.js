import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import _ from 'lodash'
import faker from 'faker'

const db = require('./queries')

app.get('/users', db.getAllData)

// Function definitions
const getResults = () =>
  _.times(5, () => ({
    id: faker.random.uuid(),
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    cover: faker.image.cats(),
    review: faker.lorem.paragraphs(),
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

const initialState = {
  changeableCatSet: category,
  origCatSet: category,
  changeableCatList: Object.values(category),
  origCatList: Object.values(category),
  selectedItem: [{review:'test', title:'test', cover:'test'}],
  activeItem: [],
  searchValue: '',
  searchisLoading: false,
  searchResults: [],
  selectedCat: 'All Categories'
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SELECT_BOOK':
        return Object.assign({}, state, {
            selectedItem: action.selectedItem,
            activeItem: action.activeItem
          })
    case 'SELECT_SEARCH':
        return Object.assign({}, state, {
            selectedItem: action.selectedItem,
            activeItem: action.activeItem,
            searchValue: action.value
          })
    case 'ENTER_SEARCH':
        return Object.assign({}, state, {
            searchValue: action.value,
            searchisLoading: action.isLoading,
            searchResults: action.results,
          })
    case 'FILTER':
        var catName
        var changeableCatSet
        var changeableCatList
        var filteredCat = {}

        if (action.selectedCat !== "-1") {
            var filteredResults = initialState.origCatList.filter( category => {
                return category.id === action.selectedCat;
            });
            catName = filteredResults[0].name;

	    filteredCat[filteredResults[0].name] = filteredResults[0]

            changeableCatSet = filteredCat
            changeableCatList = Object.values(changeableCatSet)
        } else {
          changeableCatSet = initialState.origCatSet;
          changeableCatList = initialState.origCatList;
          catName = 'All Categories'}

        return Object.assign({}, state, {
              changeableCatList: changeableCatList,
              changeableCatSet: changeableCatSet,
              selectedCat: catName
            })
    default:
        return state;
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
