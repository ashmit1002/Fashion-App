'use client'

import ImageUploader from '/Users/ashmi/Downloads/Coding/Fahion App/fashion-analyzer/components/ui/ImageUploader'
import ResultsDisplay from '/Users/ashmi/Downloads/Coding/Fahion App/fashion-analyzer/components/ui/ResultsDisplay'
import { ResultsProvider } from '/Users/ashmi/Downloads/Coding/Fahion App/fashion-analyzer/contexts/ResultsContext'  // Import the ResultsProvider

export default function Home() {
  return (
    <ResultsProvider>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            OpenFashion
          </h1>
          <ImageUploader />
          <ResultsDisplay />
        </div>
      </main>
    </ResultsProvider>
  )
}
