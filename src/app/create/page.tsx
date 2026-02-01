'use client'

import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { CreatePostModal } from '@/components/CreatePostModal'
import { useState, useEffect } from 'react'

export default function CreatePage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleClose = () => {
    router.push('/feed')
  }

  const handleSubmit = async (content: string, images: File[], location?: string) => {
    // Simulate API call
    console.log('Creating post:', { content, images, location })

    // Redirect to feed
    router.push('/feed')
  }

  return (
    <>
      <Navbar />
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  )
}
