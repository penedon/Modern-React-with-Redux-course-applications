import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSinglePost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    // if(!thos.props.post)
    const { id } = this.props.match.params; // get /posts/:id
    this.props.fetchSinglePost(id);
  }
  onDeleteClick(){
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    //posts[this.props.match.params.id]; //the post we want to show
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  //return { posts };
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchSinglePost, deletePost })(PostsShow);
