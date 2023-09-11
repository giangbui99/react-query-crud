import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPost, updatePost } from '../api/post'
import PostForm from '../components/PostForm'

const EditPost: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const queryClient = useQueryClient()

  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  })

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
    },
  })

  const handleSubmit = (updatedPost: any) => {
    updatePostMutation.mutate({ id, ...updatedPost })
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Error: {(error as any).message}</div>
  ) : (
    <>
      <PostForm onSubmit={handleSubmit} initialValue={post} />
    </>
  )
}

export default EditPost
