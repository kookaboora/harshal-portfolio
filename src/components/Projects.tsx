'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useProjects } from '@/app/hooks/useProjects'

export default function Projects() {
  const { projects, loading } = useProjects()

  if (loading) return <p className="text-center">Loading...</p>

  return (
    <section id="projects" className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Projects</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">Here’s a selection of my recent fullstack work.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <Image
              src={proj.image}
              alt={proj.title}
              width={800}
              height={400}
              className="w-full h-52 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{proj.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {proj.tech?.map((tech: string, j: number) => (
                  <span
                    key={j}
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <a href={proj.github} target="_blank" className="text-indigo-600 hover:underline flex items-center gap-1">
                  GitHub <ExternalLink size={16} />
                </a>
                <a href={proj.demo} target="_blank" className="text-indigo-600 hover:underline flex items-center gap-1">
                  Live Demo <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
