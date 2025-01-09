'use client'

import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

interface ClothingItem {
  title: string
  thumbnail: string
  price: string
  link: string
}

interface Component {
  name: string
  dominant_color: string
  clothing_items: ClothingItem[]
}

interface ComponentTabsProps {
  components: Component[]
}

export default function ComponentTabs({ components }: ComponentTabsProps) {
  const uniqueComponents = useMemo(() => {
    const uniqueNames = new Set<string>();
    return components.filter(component => {
      if (uniqueNames.has(component.name)) {
        return false;
      }
      uniqueNames.add(component.name);
      return true;
    });
  }, [components]);

  const [activeTab, setActiveTab] = useState(uniqueComponents[0]?.name || '');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
      <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-auto min-h-[48px]">
        {uniqueComponents.map((component) => (
          <TabsTrigger
            key={component.name}
            value={component.name}
            className="px-4 py-2 text-sm font-medium"
          >
            {component.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {uniqueComponents.map((component) => (
        <TabsContent key={component.name} value={component.name}>
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle>{component.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {components
                  .filter(comp => comp.name === component.name)
                  .flatMap((comp, compIndex) => 
                    comp.clothing_items.map((item, itemIndex) => (
                      <Card key={`${compIndex}-${itemIndex}-${item.title}`} className="overflow-hidden flex flex-col">
                        <div className="aspect-square relative flex-shrink-0">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <CardContent className="p-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm mb-1 truncate" title={item.title}>
                              {item.title}
                            </h4>
                            <p className="text-sm font-bold text-gray-900 mb-2">{item.price}</p>
                          </div>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                          >
                            View Details
                          </a>
                        </CardContent>
                      </Card>
                    ))
                  )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}

