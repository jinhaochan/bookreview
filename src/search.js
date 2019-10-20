import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Label } from 'semantic-ui-react'
import { connect } from "react-redux";

const initialState = { isLoading: false, results: [] }

class SearchBar extends Component {

  state = initialState

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })

    this.props.dispatch({ type: 'SELECT_SEARCH', activeItem: result.title, selectedItem: result, value: result.title})

    }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      const filteredResults = _.reduce(
        this.props.cat,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch)
          if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign

          return memo
        },
        {},
      )

  this.props.dispatch({ type: 'ENTER_SEARCH', isLoading: false, results: filteredResults})

    }, 300)
  }

  render() {

    return (
      <Grid>
        <Grid.Column width={16}>
          <Search
            category
            loading={this.props.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={this.props.results}
            value={this.state.value}
          />
          <br/>
          <Label horizontal>{this.props.selectedCat}</Label>

        </Grid.Column>

      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  value : state.searchValue,
  isLoading: state.searchisLoading,
  results: state.searchResults,
  cat: state.changeableCatSet,
  selectedCat: state.selectedCat
})

export default connect(mapStateToProps)(SearchBar);
