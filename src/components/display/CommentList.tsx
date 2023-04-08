import React, { useEffect, useState } from 'react'
import { CommentType } from '../../types/commentTypes'
import axios from 'axios'
import { env_api_url } from '../../services/getEnvVar'

function CommentList(postId: number) {
  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${env_api_url}/api/posts/${postId}/`)
      } catch (error) {
        
      }
    }
  })
  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-2">
          <div className="flex-shrink-0">
            <img
              src={comment.author.avatarUrl}
              alt={comment.author.name}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="bg-gray-100 p-2 rounded-md">
              <div className="font-semibold text-gray-800">{comment.author.name}</div>
              <div className="text-gray-700">{comment.text}</div>
            </div>
            <div className="text-gray-500 text-sm">{comment.createdAt}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList