'use client'
import Image from 'next/image'
import slides from '@json/slides.json'

const Projects = () => {
    return (
        <div id="projects" className="projectContainer px-30 py-12">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                PROJECTS
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {slides.map((slide) => (
                    <div key={slide.id} className="flex flex-col gap-5 items-center">
                        {/* Card Container with actual image dimensions */}
                        <div className="relative w-[400px] h-[225px]">
                            {/* Image Card */}
                            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-[0_25px_45px_-20px_rgba(0,0,0,0.3)]">
                                <Image
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                />
                            </div>

                            {/* Bottom Elliptical Shadow */}
                            <div className="absolute bottom-[-13px] left-1/2 -translate-x-1/2 w-[400px] h-[26px] bg-[linear-gradient(to_right,_rgba(0,0,0,0.2),_transparent_30%,_transparent_70%,_rgba(0,0,0,0.2))] rounded-full z-[-1]" />
                        </div>

                        {/* Title Below Image */}
                        <h3 className="mt-4 text-sm tracking-[0.15em] text-center uppercase">
                            {slide.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects
