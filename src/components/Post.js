import "../Post.css";
import Avatar from "@material-ui/core/Avatar";
const Post = ({posts}) => {
  return posts.map((post) => (
    // console.log(post.data),
    <div className="post" key={post.id}>
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={post.data.username}
          src="https://instagram.fsgn3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/141143778_929950924210403_4960203482421689151_n.jpg?tp=1&_nc_ht=instagram.fsgn3-1.fna.fbcdn.net&_nc_ohc=7xua_2KpLF8AX9QcwYE&ccb=7-4&oh=cda7c068ea290cdaaa4ee9830a3562f6&oe=60880C1A&_nc_sid=7bff83"
        ></Avatar>
        <h3>{post.data.username}</h3>
      </div>

      <img src={post.data.imageUrl} alt="" className="post_image" />

      <h4 className="post_text">
        <strong>{post.data.username}</strong> {post.data.caption}
      </h4>
    </div>
  ));
};

export default Post;
