import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PostsList = styled.div`
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

const PostEntrySidebar = styled.div`
  ul {
	padding: 0;
    margin: 0;

	li {
	  list-style: none;
      padding: 0 0 20px 0;
      margin: 0 0 20px 0;

	  a {
		display: table;
	  }
	}
  }
`;

class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  async componentDidMount() {
    //const { match: { params } } = this.props;
    //const post = (await axios.get(`http://localhost:3000/posts/api/${params.postId}`)).data;
    //this.setState({
    //  post,
    //});
  }

  render() {
    //const {post} = this.state;
    //if (post === null) return <p>Loading ...</p>;

    return (
        <PostsList>
          <h3 className="heading">Recent Posts</h3>
          <PostEntrySidebar>
            <ul>
              <li>
                <a href="">
                  <div className="text">
                    <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                    <div className="post-meta">
                      <span className="mr-2">March 15, 2018 </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </PostEntrySidebar>
        </PostsList>
    )
  }
}

export default RecentPosts;
