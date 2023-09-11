import React from 'react'
import PostForm from './PostForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../api/post'
import { v4 as uuidv4 } from 'uuid'

const AddPost: React.FC = () => {
  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      console.log('Success')
    },
  })

  const handleAddPost = (post: { title: string; body: string }) => {
    createPostMutation.mutate({
      id: uuidv4(),
      ...post,
    })
  }

  return (
    <div>
      <h2>Add Post</h2>
      <PostForm onSubmit={handleAddPost} initialValue={{ title: '', body: '' }} />
    </div>
  )
}

export default AddPost
