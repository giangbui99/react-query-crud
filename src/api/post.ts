import { Post } from '../types/Product'

export async function fetchPosts() {
  const res = await fetch('https://64fee9e8f8b9eeca9e29454a.mockapi.io/Post')
  return res.json()
}

export async function fetchPost(id: string | undefined) {
  const res = await fetch(`https://64fee9e8f8b9eeca9e29454a.mockapi.io/Post/${id}`)
  return res.json()
}

export async function createPost(newPost: Post) {
  const res = await fetch('https://64fee9e8f8b9eeca9e29454a.mockapi.io/Post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })
  return res.json()
}

export async function updatePost(updatedPost: Post) {
  const res = await fetch(`https://64fee9e8f8b9eeca9e29454a.mockapi.io/Post/${updatedPost.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPost),
  })
  return res.json()
}

export async function deletePost(id: string | undefined) {
  const res = await fetch(`https://64fee9e8f8b9eeca9e29454a.mockapi.io/Post/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}
