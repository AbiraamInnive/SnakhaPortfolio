'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import slides from './slides.json'

const Carousel = () => {
    const [[currentIndex, direction], setCurrentIndex] = useState([2, 0])
    const [dragging, setDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
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
        setCurrentIndex([currentIndex === slides.length - 1 ? 0 : currentIndex + 1, 1])
    }

    const prevSlide = () => {
        setCurrentIndex([currentIndex === 0 ? slides.length - 1 : currentIndex - 1, -1])
    }

    const goToSlide = (index) => {
        setCurrentIndex([index, index > currentIndex ? 1 : -1])
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

    // Animation variants
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0.8,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1]
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0.8,
            scale: 0.9,
            transition: {
                duration: 0.5
            }
        })
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
                <AnimatePresence custom={direction} initial={false}>
                    {[-2, -1, 0, 1, 2].map((offset) => {
                        const slideIndex = (currentIndex + offset + slides.length) % slides.length
                        const slide = slides[slideIndex]
                        const isCenter = offset === 0

                        return (
                            <motion.div
                                key={slideIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={`absolute ${isCenter ? 'z-10' : 'z-0'}`}
                                style={{
                                    width: isCenter ? '35%' : '25%',
                                    margin: '0 1%',
                                    minWidth: isCenter ? '400px' : '300px'
                                }}
                            >
                                <div className={`relative ${isCenter ? 'h-96' : 'h-80'
                                    } rounded-xl shadow-lg overflow-hidden mx-2`}>
                                    <Image
                                        src={slide.imageUrl}
                                        alt={slide.title}
                                        fill
                                        className="object-cover select-none"
                                        draggable="false"
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,..."
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
                </AnimatePresence>
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