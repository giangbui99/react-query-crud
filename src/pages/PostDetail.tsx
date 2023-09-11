import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPost } from '../api/post'

const PostDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  })

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Error {(error as any).message}</div>
  ) : (
    <div>
      <button onClick={() => navigate('/')}>Back To Home</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default PostDetail
