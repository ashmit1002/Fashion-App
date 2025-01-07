'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useResults } from '/Users/ashmi/Downloads/Coding/Fahion App/fashion-analyzer/contexts/ResultsContext'

export default function ImageUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const { setResults } = useResults()  // Get the function to update the results

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem('image') as HTMLInputElement;
  
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Please select an image to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
  
    setIsUploading(true);
  
    try {
      // Update the URL to point to Flask backend
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await response.json();
      // Update the global results state with data from backend
      setResults(data);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <Card className="mb-8">
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
