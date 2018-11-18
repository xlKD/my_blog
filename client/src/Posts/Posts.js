import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SidebarBox = styled.div`
    margin-bottom: 4em;
    font-size: 15px;
    width: 100%;
    float: left;
    background: #fff;
`;

const PostEntrySidebar = styled.div`
  padding-top: 30px;

  ul {
	padding: 0;
	margin: 0;
  
	li {
	  list-style: none;
      padding: 0 0 20px 0;
      margin: 0 0 20px 0;

      a {
		display: table;

        .text {
		  display: table-cell;
    	  vertical-align: middle;

		  h4 {
			font-size: 18px;
		  }
		}
      }
	}
  }

  .post-meta {
	font-size: 14px;
    color: #b3b3b3;
  }
`;

const Category = styled.div`
  display: inline-block;
  background: #007bff;
  padding: 2px 8px;
  line-height: 1.5;
  font-size: 12px;
  border-radius: 4px;
  text-transform: uppercase;
  color: #fff !important;
  margin-right: 10px;
`;


class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
    };
  }

  async componentDidMount() {
    const posts = (await axios.get('http://localhost:3000/posts/api')).data;
    this.setState({
      posts,
    });
  }

  render() {
    return (
      <section className="site-section py-sm">
        <div className="container">
          <div className="row blog-entries">
            <div className="col-12 offset-md-2 offset-lg-3">
              <SidebarBox>
				<PostEntrySidebar>
                <ul>
                {this.state.posts === null && <p>Loading posts...</p>}
                {
                  this.state.posts && this.state.posts.map(post => (
                    <li key={post._id}>
                      <Link to={`/post/${post._id}`}>
                        <div className="text">
                          <h4>{post.title}</h4>
                          <div className="post-meta">
							<Category>{post.category}</Category>
                            <span class="mr-2">{post.created_at}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))
                }
                </ul>
				</PostEntrySidebar>
              </SidebarBox>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Posts;
