'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/app/lib/firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [project, setProject] = useState({
    title: '',
    description: '',
    tech: '',
    image: '',
    github: '',
    demo: '',
  })

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  // Handle login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      alert(error.message)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth)
  }

  // Handle form input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const techArray = project.tech.split(',').map((t) => t.trim())

      await addDoc(collection(db, 'projects'), {
        ...project,
        tech: techArray,
        createdAt: new Date(),
      })

      alert('Project added!')
      setProject({
        title: '',
        description: '',
        tech: '',
        image: '',
        github: '',
        demo: '',
      })
    } catch (error: any) {
      alert(error.message)
    }
  }

  // Render login form if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="mb-2 px-4 py-2 border rounded w-full max-w-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 px-4 py-2 border rounded w-full max-w-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    )
  }

  // Render admin form if logged in
  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Add New Project</h2>
        <button onClick={handleLogout} className="text-red-600 underline">
          Logout
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          className="w-full px-4 py-2 border rounded"
          value={project.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Project Description"
          className="w-full px-4 py-2 border rounded"
          rows={3}
          value={project.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tech"
          placeholder="Technologies (comma separated)"
          className="w-full px-4 py-2 border rounded"
          value={project.tech}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full px-4 py-2 border rounded"
          value={project.image}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          className="w-full px-4 py-2 border rounded"
          value={project.github}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="demo"
          placeholder="Live Demo Link"
          className="w-full px-4 py-2 border rounded"
          value={project.demo}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Save Project
        </button>
      </div>
    </div>
  )
}
