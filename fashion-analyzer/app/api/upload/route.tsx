import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get('image') as File

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 })
  }

  try {
    // Create a new FormData to send the image to the backend
    const backendFormData = new FormData()
    backendFormData.append('image', image)

    // Send the image to the backend for processing (replace with your backend URL)
    const response = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: backendFormData,
    })

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to process the image')
    }

    const data = await response.json()

    // Return the processed data from the backend
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json({ error: 'Error processing image' }, { status: 500 })
  }
}
