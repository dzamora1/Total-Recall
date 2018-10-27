import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Items extends Component {
  state = {
    items: [],
    keyword: "",
    title: "",
    image: ""
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    API.getItems()
      .then(res =>
        this.setState({ items: res.data, keyword: "", title: "", image: "" })
      )
      .catch(err => console.log(err));
  };

  deleteItem = id => {
    API.deleteItem(id)
      .then(res => this.loadItems())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.keyword && this.state.title) {
      API.saveItem({
        keyword: this.state.keyword,
        title: this.state.title,
        image: this.state.image
      })
        .then(res => this.loadItems())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Customize an Item</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.keyword}
                onChange={this.handleInputChange}
                name="keyword"
                placeholder="Keyword (required)"
              />
               <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                type= "file"
                value={this.state.image}
                onChange={this.handleInputChange}
                name="file"
              />
              <FormBtn 
                disabled={!(this.state.keyword && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Create Item
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Customized Items</h1>
            </Jumbotron>
            {this.state.items.length ? (
              <List>
                {this.state.items.map(item => (
                  <ListItem key={item._id}>
                    <Link to={"/items/" + item._id}>
                      <strong>
                        {item.keyword} : {item.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteItem(item._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Items;
