import { useState } from 'react'

type Props = {
  onSubmit: (post: Post) => void
  initialValue: {
    title: string
    body: string
  }
}

type Post = {
  title: string
  body: string
}

const PostForm = ({ onSubmit, initialValue }: Props) => {
  const [post, setPost] = useState<Post>({
    title: initialValue.title || '',
    body: initialValue.body || '',
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const InputField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <label>{label}</label>
      <input onChange={handleChangeInput} type='text' name={label.toLowerCase()} value={value} />
    </div>
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(post)
    setPost({
      title: '',
      body: '',
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField label='Title' value={post.title} />
      <InputField label='Body' value={post.body} />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default PostForm
