'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import OfferCardWithSave from '@/components/offers/OfferCardWithSave'
import { OfferWithVendor } from '@/lib/types'

interface OfferCarouselProps {
  offers: OfferWithVendor[]
  savedOfferIds: string[]
}

export function OfferCarousel({ offers, savedOfferIds }: OfferCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-6">
        {offers.map((offer) => (
          <CarouselItem
            key={offer.id}
            className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <OfferCardWithSave
              offer={offer}
              initialSaved={savedOfferIds.includes(offer.id)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4" />
      <CarouselNext className="hidden md:flex -right-4" />
    </Carousel>
  )
}
