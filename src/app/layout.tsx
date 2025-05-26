import './globals.css'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Harshal Patel – Fullstack Developer',
  description: 'Portfolio site built with Next.js, Tailwind, and Framer Motion',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-gray-900 dark:bg-gray-900 dark:text-white"}>
        {children}
      </body>
    </html>
  )
}
