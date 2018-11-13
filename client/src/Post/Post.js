import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PostContent = styled.p`
  white-space:pre-wrap;
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

const Bio = styled.div`
  padding: 15px;
  background: #fff;
  border: 1px solid #e6e6e6;
  font-weight: 400;
`;

const SidebarBox = styled.div`
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

const Tags = styled.ul`
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
			  <div className="col-12 main-content">
				<h1 className="mb-4">{post.title}</h1>
				<div className="post-meta">
							<Category>Food</Category>
							<span className="mr-2">March 15, 2018 </span>
						  </div>
				<div className="post-content-body">
					<PostContent>{post.content}</PostContent>
				</div>
				
				<div className="pt-5">
				  <p>Categories:  <a href="#">Food</a>, <a href="#">Travel</a>  Tags: <a href="#">#manila</a>, <a href="#">#asia</a></p>
				</div>

			  </div>

			  <div className="col-12 sidebar">
				<SidebarBox>
				  <Bio className="text-center">
					<img src="/images/person_1.jpg" alt="Image Placeholder" className="img-fluid" />
					<div className="bio-body">
					  <h2>NGUYEN QUOC HUNG</h2>
					  <p>Husband, Web developer, Figure Collector, Noodle Lover</p>
					  <p><a href="#" className="btn btn-primary btn-sm">Read my bio</a></p>
					  <p className="social">
						<a href="#" className="p-2"><span className="fa fa-facebook"></span></a>
						<a href="#" className="p-2"><span className="fa fa-twitter"></span></a>
						<a href="#" className="p-2"><span className="fa fa-instagram"></span></a>
						<a href="#" className="p-2"><span className="fa fa-youtube-play"></span></a>
					  </p>
					</div>
				  </Bio>
				</SidebarBox>

				<SidebarBox>
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
				</SidebarBox>

				<SidebarBox>
				  <h3 className="heading">Tags</h3>
				  <Tags>
					<li><a href="#">Travel</a></li>
					<li><a href="#">Adventure</a></li>
					<li><a href="#">Food</a></li>
					<li><a href="#">Lifestyle</a></li>
					<li><a href="#">Business</a></li>
					<li><a href="#">Freelancing</a></li>
					<li><a href="#">Travel</a></li>
					<li><a href="#">Adventure</a></li>
					<li><a href="#">Food</a></li>
					<li><a href="#">Lifestyle</a></li>
					<li><a href="#">Business</a></li>
					<li><a href="#">Freelancing</a></li>
				  </Tags>
				</SidebarBox>
			  </div>

			</div>
		  </div>
		</section>
	  </div>
    )
  }
}

export default Post;
