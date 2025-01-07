'use client'

import { useResults } from '/Users/ashmi/Downloads/Coding/Fahion App/fashion-analyzer/contexts/ResultsContext'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export default function ResultsDisplay() {
  const { results } = useResults()  // Get the results from the global state

  if (!results) {
    return null
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold mb-4">Analyzed Outfit</h2>
          <Image
            src={`data:image/jpeg;base64,${results.annotated_image_base64}`}
            alt="Annotated Image"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.components.map((component, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{component.name}</h3>
              <p className="text-gray-600 mb-2">Color: {component.dominant_color}</p>
              {component.clothing_items[0] && (
                <div className="flex items-start space-x-4">
                  <Image
                    src={component.clothing_items[0].thumbnail}
                    alt={component.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-medium">{component.clothing_items[0].price}</p>
                    <a
                      href={component.clothing_items[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
