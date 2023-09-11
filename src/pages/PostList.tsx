import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { deletePost, fetchPosts } from '../api/post'
import AddPost from '../components/AddPost'
import { Post } from '../types/Product'

const PostList = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleDelete = (id: string | undefined) => {
    deletePostMutation.mutate(id)
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Error {(error as any).message}</div>
  ) : (
    <div>
      <h1>Todo App</h1>
      <AddPost />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((post: Post) => (
            <tr key={post.id}>
              <td>
                <h4>{post.id}</h4>
              </td>
              <td>
                <h4 onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h4>
              </td>
              <td>
                <h4>{post.body}</h4>
              </td>
              <td>
                <button onClick={() => navigate(`/post/${post.id}/edit`)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostList
