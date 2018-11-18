import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RecentPosts from './RecentPosts';
import TagsList from './TagsList';
import Bio from '../Middle/Bio';

const MainContent = styled.div`
  padding-top: 5em;
  padding-bottom: 5em;
`;

const Category = styled.span`
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

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const post = (await axios.get(`http://localhost:3000/posts/api/${params.postId}`)).data;
    this.setState({
      post,
    });
  }

  render() {
    const {post} = this.state;
    if (post === null) return <p>Loading ...</p>;

    return (
	  <div>
		<section className="site-section py-lg">
		  <div className="container">
			
			<div className="row blog-entries">
			  <MainContent className="col-12 main-content">
				<h1 className="mb-4">{post.title}</h1>
				<div className="post-meta">
				  <Category>{post.category}</Category>
				  <span className="mr-2">{post.created_at}</span>
				</div>
				<div dangerouslySetInnerHTML={{__html: post.content}} />
				
				<div className="pt-5">
				  <p>
                    Categories:  <a href="#">{post.category}</a> Tags:  {post.tags.map(function(tag, index) {
                      return <a href="#">#{tag}</a>
                    })}
                  </p>
				</div>
			  </MainContent>

			  <div className="col-12 sidebar">
                <Bio />

                <RecentPosts />

                <TagsList />

			  </div>
			</div>
		  </div>
		</section>
	  </div>
    )
  }
}

export default Post;
