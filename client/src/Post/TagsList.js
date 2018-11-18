import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Tags = styled.div`
  margin-bottom: 4em;
  font-size: 15px;
  width: 100%;
  float: left;
  background: #fff;

  .heading {
	font-size: 18px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
  }
`;

const ListOfTags = styled.ul`
  padding: 0;
  margin: 0;
  font-weight: 400;

  li {
    padding: 0;
    margin: 0 4px 4px 0;
    float: left;
    display: inline-block;

	a {
	  float: left;
      display: block;
      border-radius: 4px;
      padding: 2px 6px;
      color: gray;
      background: #f2f2f2;
	}
  }
`;

class TagsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
    };
  }

  async componentDidMount() {
    const tags = (await axios.get('http://localhost:3000/api/tags')).data;
    this.setState({
      tags,
    });
  }

  render() {
    const {tags} = this.state;
    if (tags === null) return <p>Loading ...</p>;

    return (
        <Tags>
          <h3 className="heading">Tags</h3>
          <ListOfTags>
            {tags.map(function(tag, index) {
              return <li><a href="#">#{tag.name}</a></li>
            })}
          </ListOfTags>
        </Tags>
    )
  }
}

export default TagsList;
