'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const techIcons = [
  { src: '/icons/react.svg', top: '10%', left: '5%' },
  { src: '/icons/next.svg', top: '20%', right: '5%' },
  { src: '/icons/typescript.svg', bottom: '10%', left: '10%' },
  { src: '/icons/tailwind.svg', bottom: '20%', right: '10%' },
  { src: '/icons/nestjs.svg', top: '40%', left: '0%' },
  { src: '/icons/pg.svg', bottom: '30%', right: '0%' },
]

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {techIcons.map(({ src, ...position }, i) => (
         <motion.img
         key={i}
         src={src}
         alt="tech"
         className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md shadow-xl shadow-indigo-500/50"
         style={{ position: 'absolute', ...position }}
         animate={{ y: [0, -8, 0] }}
         transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
/>

        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left: Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg"
        >
          <Image
            src="/me.webp"
            alt="Harshal"
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Who am I?
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 max-w-xl">
            I'm Harshal Patel, a Fullstack Developer with 3 years of experience crafting interactive, scalable, and visually compelling web apps. I love blending modern frontend design with robust backend logic — and lately, I have been diving into AI to supercharge user experiences.
          </p>
          <p className="mt-4 text-md text-indigo-400 font-medium">
            My goal? Build interfaces that feel like magic — and systems that scale like machines.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
