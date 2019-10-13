import React, { Component } from 'react'
import {
  Grid,
  Header,
  Image,
  Rail,
  Segment,
  Sticky,
} from 'semantic-ui-react'


export default class Content extends Component {

  constructor(props) {
  super(props);

  this.state = {
    item: [{
      title: "test",
      cover: 0,
      description: "test",
      review: "test",
    }
    ]
  ,
  };

  }

  componentDidUpdate(prevProps) {
  if (this.props.item !== prevProps.item) {
  this.setState({item : this.props.item }, () => {console.log(this.state.item)});

  }
  }

  render() {
    return (
      <Grid centered>

        <Grid.Column>

            <Segment>
              {this.state.item[0].review}

              <Rail position='left'>
                <Sticky>
                  <Header as='h3'>{this.state.item[0].title}</Header>
                  <Image src={this.state.item[0].cover} />
                </Sticky>
              </Rail>
            </Segment>

        </Grid.Column>
      </Grid>
    )
  }
}
