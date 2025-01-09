'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface AnalysisResult {
  annotated_image_base64: string
  components: Array<{
    name: string
    dominant_color: string
    clothing_items: Array<{
      title: string
      thumbnail: string
      price: string
      link: string
    }>
  }>
}

interface ImageUploaderProps {
  onAnalysisComplete: (result: AnalysisResult) => void
}

export default function ImageUploader({ onAnalysisComplete }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const fileInput = form.elements.namedItem('image') as HTMLInputElement

    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Please select an image to upload')
      return
    }

    const formData = new FormData()
    formData.append('image', fileInput.files[0])

    setIsUploading(true)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data: AnalysisResult = await response.json()
      onAnalysisComplete(data)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="file"
              name="image"
              accept="image/*"
              className="flex-grow"
              disabled={isUploading}
            />
            <Button type="submit" disabled={isUploading}>
              {isUploading ? (
                'Uploading...'
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

