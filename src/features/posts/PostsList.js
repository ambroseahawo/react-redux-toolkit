import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from "./postsSlice"
import PostsExcerpt from "./PostsExcerpt"

const PostsList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content

  if (postsStatus === 'loading') {
    content = <p>"Loading..."</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
  }

  // const renderedPosts = orderedPosts.map(post => (
  //   <article key={post.id}>
  //     <h3>{post.title}</h3>
  //     <p>{post.content.substring(0, 100)}</p>
  //     <p className="postCredit">
  //       <PostAuthor userId={post.userId} />
  //       <TimeAgo timestamp={post.date} />
  //     </p>
  //     <ReactionButtons post={post} />
  //   </article>
  // ))

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList