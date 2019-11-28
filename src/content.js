import React, { Component } from 'react'
import {
  Grid,
  Header,
  Image,
  Rail,
  Segment,
  Sticky,
} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Content extends Component {

  render() {
    return (
      <Grid>

        <Grid.Column>

            <Segment>
              <Header as='h3'>{this.props.item.title}</Header>
              <Image src={this.props.item.cover} />
              {this.props.item.review}

            </Segment>

        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  item : state.selectedItem,
})

export default connect(mapStateToProps)(Content);
