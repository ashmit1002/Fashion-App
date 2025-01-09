'use client'

import Image from 'next/image'
import { Card, CardContent } from '/Users/ashmi/Downloads/Coding/Fahion App/fashion-analyzer/components/ui/card'

interface AnalyzedImageProps {
  imageData: string
}

export default function AnalyzedImage({ imageData }: AnalyzedImageProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold mb-4">Analyzed Outfit</h2>
        <div className="relative aspect-square w-full">
          <Image
            src={`data:image/jpeg;base64,${imageData}`}
            alt="Analyzed Image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}

