'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import slides from '@json/slides.json'

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
        Autoplay({ delay: 3000, stopOnInteraction: false }),
    ])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
        (index) => {
            if (emblaApi) emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    const sortedSlides = [...slides].sort((a, b) => a.order - b.order)

    return (
        <div className="sliderContainer relative w-full px-4 sm:px-6 md:px-10 py-8 sm:py-8 md:py-12">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {sortedSlides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] sm:flex-[0_0_60%] md:flex-[0_0_40%] min-w-0 px-2 sm:px-4"
                        >
                            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl shadow-lg overflow-hidden">
                                <Image
                                    loading="lazy"
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,..."
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 60vw, 40vw"
                                />
                                {index === selectedIndex && (
                                    <div className="absolute bottom-0 left-0 right-0  to-transparent p-4 pt-8">
                                        <h3 className="text-xl font-bold drop-shadow-lg">
                                            {slide.title}
                                        </h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-3">
                {sortedSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === selectedIndex ? 'activeDots w-6' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows (Responsive Position) */}
            <button
                onClick={scrollPrev}
                className="hidden md:flex absolute left-4 sm:left-0 md:left-12 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-white p-2 rounded-full shadow-lg z-20 transition-all cursor-pointer items-center justify-center"
                style={{
                    width: '40px',
                    height: '40px',
                }}
            >
                <span className="text-lg md:text-2xl font-bold">&larr;</span>
            </button>

            <button
                onClick={scrollNext}
                className="hidden md:flex absolute right-4 sm:right-10 md:right-12 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-white p-2 rounded-full shadow-lg z-20 transition-all cursor-pointer items-center justify-center"
                style={{
                    width: '40px',
                    height: '40px',
                }}
            >
                <span className="text-lg md:text-2xl font-bold">&rarr;</span>
            </button>

        </div>
    )
}

export default Carousel
