import Image from 'next/image'
import { FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer id="aboutMe" className="aboutMeContainer py-10">
            <div className="mx-auto px-4 sm:px-6 md:px-24 flex flex-col md:flex-row justify-between items-start md:gap-x-20">

                {/* Profile image + About */}
                <div className="flex flex-col sm:flex-row  gap-x-10 w-full md:w-[70%]">
                    {/* Profile image */}
                    <div className="flex md:flex-col sm:flex-row space-x-5 sm:space-x-5 md:items-center space-y-3">
                        <div className="relative  w-32 h-32 sm:w-26 sm:h-26 rounded-lg overflow-hidden shadow-md">
                            <Image
                                src="/elements/profile.jpg"
                                alt="Snakha Ranjan"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center sm:w-1/2 md:w-full">
                            <p className="font-semibold text-lg md:text-nowrap">Snakha Ranjan</p>
                            <p className="text-sm">B.Arch</p>
                        </div>
                    </div>

                    {/* About Me Text */}
                    <div className="mt-3 md:w-3/4 sm:mt-0">
                        <h3 className="text-xl font-semibold mb-2">About Me</h3>
                        <p className="text-sm leading-relaxed">
                            I'm a passionate architect and visual storyteller, blending creativity and functionality to design immersive spaces. From concept to reality, I turn visions into tangible designs.
                        </p>
                    </div>
                </div>

                {/* Social Links */}
                <div className="w-full md:w-[20%] mt-6 md:mt-0">
                    <h3 className="text-xl font-semibold mb-4 text-nowrap">Connect with me</h3>

                    <div className="flex items-center gap-3 hover:text-[#d15747] transition mb-3 flex-shrink-0">
                        <span className="flex-none">
                            <FaEnvelope className="min-w-[18px] min-h-[18px]" />
                        </span>
                        <a
                            href="mailto:snakharanjan@gmail.com"
                            className="text-sm text-nowrap"
                        >
                            Email
                        </a>
                    </div>

                    <div className="flex items-center space-x-3 hover:text-blue-600 transition mb-3">
                        <FaLinkedin size={20} />
                        <a
                            href="https://www.linkedin.com/in/ar-snakha-ranjan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm"
                        >
                            LinkedIn
                        </a>
                    </div>

                    <div className="flex items-center space-x-3 hover:text-pink-500 transition mb-3">
                        <FaInstagram size={20} />
                        <a
                            href="https://www.instagram.com/ar_snakha_ranjan?igsh=MWtkeDA3bmN6a2xwdw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm"
                        >
                            Instagram
                        </a>
                    </div>

                    <div className="flex items-center space-x-3 hover:text-green-600 transition">
                        <FaWhatsapp size={20} />
                        <a
                            href="https://wa.me/your-number"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
