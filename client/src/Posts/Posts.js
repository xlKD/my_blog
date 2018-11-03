import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
      <div className="container">
        <div className="row">
          {this.state.posts === null && <p>Loading posts...</p>}
          {
            this.state.posts && this.state.posts.map(post => (
              <div key={post._id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/post/${post._id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Answers: {post.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{post.title}</h4>
                      <p className="card-text">{post.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Posts;
