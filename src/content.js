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
      <Grid centered>

        <Grid.Column>

            <Segment>
              {this.props.item.review}

              <Rail position='left'>
                <Sticky>
                  <Header as='h3'>{this.props.item.title}</Header>
                  <Image src={this.props.item.cover} />
                </Sticky>
              </Rail>
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
