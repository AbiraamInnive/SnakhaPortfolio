'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import slides from './slides.json'

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(2)
    const [dragging, setDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const controls = useAnimation()
    const containerRef = useRef(null)
    const intervalRef = useRef(null)

    // Auto-slide effect with hover pause
    useEffect(() => {
        const startAutoSlide = () => {
            intervalRef.current = setInterval(() => {
                if (!dragging && !isHovering) {
                    nextSlide()
                }
            }, 3000)
        }

        const stopAutoSlide = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

        if (!isHovering) {
            stopAutoSlide()
            startAutoSlide()
        } else {
            stopAutoSlide()
        }

        return () => stopAutoSlide()
    }, [currentIndex, dragging, isHovering])

    const nextSlide = () => {
        setCurrentIndex(prev => {
            const newIndex = prev === slides.length - 1 ? 0 : prev + 1
            // Prepare for smooth transition
            controls.start({
                x: -100,
                transition: { duration: 0 }
            }).then(() => {
                controls.start({
                    x: 0,
                    transition: { duration: 0.5, ease: 'easeInOut' }
                })
            })
            return newIndex
        })
    }

    const prevSlide = () => {
        setCurrentIndex(prev => {
            const newIndex = prev === 0 ? slides.length - 1 : prev - 1
            // Prepare for smooth transition
            controls.start({
                x: 100,
                transition: { duration: 0 }
            }).then(() => {
                controls.start({
                    x: 0,
                    transition: { duration: 0.5, ease: 'easeInOut' }
                })
            })
            return newIndex
        })
    }

    const goToSlide = (index) => {
        const direction = index > currentIndex ? -100 : 100
        controls.start({
            x: direction,
            transition: { duration: 0 }
        }).then(() => {
            setCurrentIndex(index)
            controls.start({
                x: 0,
                transition: { duration: 0.5, ease: 'easeInOut' }
            })
        })
    }

    const handleDragStart = () => {
        setDragging(true)
    }

    const handleDragEnd = (event, info) => {
        setDragging(false)
        if (info.offset.x > 100) {
            prevSlide()
        } else if (info.offset.x < -100) {
            nextSlide()
        }
    }

    // Calculate visible slides (2 before, current, 2 after)
    const getVisibleSlides = () => {
        const visible = []
        for (let i = -2; i <= 2; i++) {
            let index = currentIndex + i
            if (index < 0) index = slides.length + index
            if (index >= slides.length) index = index - slides.length
            visible.push(index)
        }
        return visible
    }

    return (
        <div className="relative w-full px-4 py-8">
            {/* Carousel Container */}
            <motion.div
                ref={containerRef}
                drag="x"
                dragConstraints={containerRef}
                onPointerDown={handleDragStart}
                onDragEnd={handleDragEnd}
                className="flex items-center justify-center w-full select-none"
                style={{ cursor: dragging ? 'grabbing' : 'grab' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {getVisibleSlides().map((slideIndex, i) => {
                    const isCenter = i === 2
                    const slide = slides[slideIndex]

                    return (
                        <motion.div
                            key={slide.id}
                            animate={controls}
                            className={`relative transition-all duration-300 ease-in-out ${isCenter ? 'z-10 scale-110' : 'z-0 scale-90 opacity-80'
                                }`}
                            style={{
                                width: isCenter ? '35%' : '25%',
                                margin: '0 1%',
                                minWidth: isCenter ? '400px' : '300px'
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <div className={`relative ${isCenter ? 'h-96' : 'h-80'
                                } rounded-xl shadow-lg overflow-hidden mx-2`}>
                                <Image
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    className="object-cover select-none"
                                    draggable="false"
                                    sizes={isCenter ? "(max-width: 768px) 100vw, 35vw" : "(max-width: 768px) 100vw, 25vw"}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
                                    <h3 className="text-white text-xl font-bold drop-shadow-lg">
                                        {slide.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-4 rounded-full shadow-lg z-20 transition-all cursor-pointer"
                style={{ width: '50px', height: '50px' }}
            >
                <div className="flex items-center justify-center w-full h-full">
                    &larr;
                </div>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-4 rounded-full shadow-lg z-20 transition-all cursor-pointer"
                style={{ width: '50px', height: '50px' }}
            >
                <div className="flex items-center justify-center w-full h-full">
                    &rarr;
                </div>
            </button>
        </div>
    )
}

export default Carousel