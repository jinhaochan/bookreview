import React from "react";
import { connect } from "react-redux";
import { Header, Menu } from 'semantic-ui-react'

const mapStateToProps = state => {
  return { books: state.books };
};

const ConnectedBooks = ({ books }) => (
  <div>
  {books.map((item) => {
  return(
    <div key={item.id}>
      {item.results.map((res) => (
        <Menu.Item
          key={res.id}
          itemid={res.id}
          categoryid={item.id}
          name={res.title}
          active={activeItem === res.title}
          onClick={this.handleItemClick}
         >
           <div className="ui top left attached label">{item.name}</div>
           <Header as='h4'>{res.title}</Header>
           <p>{res.description}</p>
        </Menu.Item>
      ))}
    </div>
    )
  })}
</div>
);

const List = connect(mapStateToProps)(ConnectedBooks);

export default Books;
