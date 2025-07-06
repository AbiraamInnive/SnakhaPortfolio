import Image from 'next/image'
import { FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer id='aboutMe' className="aboutMeContainer">
            <div className="max-w-8xl px-30 py-10 flex flex-col md:flex-row justify-between items-start gap-10">

                {/* Profile image + name */}
                <div className='flex gap-10'>
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md">
                            <Image
                                src="/elements/profile.jpg"
                                alt="Snakha Ranjan"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="text-center">
                            <p className="font-semibold text-lg">Snakha Ranjan</p>
                            <p className="text-sm ">B.Arch</p>
                        </div>

                    </div>
                    {/* About Me */}

                    <div className="max-w-md mt-5">
                        <h3 className="text-xl font-semibold mb-2">About Me</h3>
                        <p className="text-sm leading-relaxed">
                            I'm a passionate architect and visual storyteller, blending creativity and functionality to design immersive spaces. From concept to reality, I turn visions into tangible designs.
                        </p>
                    </div>
                </div>


                {/* Social Links */}
                <div className="flex flex-col space-y-3 mt-5">
                    <h3 className="text-xl font-semibold mb-1">Connect with me</h3>
                    <div className="flex items-center space-x-3 hover:text-[#d15747] transition">
                        <FaEnvelope size={20} />
                        <a
                            href="mailto:snakharanjan@gmail.com"
                            className="text-sm"
                        >
                            snakharanjan@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center space-x-3 hover:text-blue-600 transition">
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

                    <div className="flex items-center space-x-3 hover:text-pink-500 transition">
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
