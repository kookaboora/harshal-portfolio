import { useState, useEffect } from 'react'
import { db } from '@/app/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  demo: string
  
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'))
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[]
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading }
}
