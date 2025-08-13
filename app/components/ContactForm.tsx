'use client'

import { useState } from 'react'
import { Github, Linkedin } from 'lucide-react'
import emailjs from 'emailjs-com'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    
    // Send email using EmailJS
    try {
      // Replace with your actual EmailJS user ID
      const userID = '7e0STKFisqwxBY29E'; 

      // Pass the form element instead of FormData
      const response = await emailjs.sendForm(
        'service_6vj3djo', // Replace with your service ID
        'template_bymvhmd', // Replace with your template ID
        form, // Pass the form element here
        userID // Replace with your user ID from EmailJS
      )

      console.log('Email sent successfully:', response)
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error sending email:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 bg-black text-white p-8 pt-0 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold">Get in touch</h3>
      {isSubmitted ? (
        <p className="text-green-500">Thank you for your message. I&apos;ll get back to you soon!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-gray-900 text-white font-bold rounded-md hover:bg-gray-700 focus:outline-none"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
      <div className="flex space-x-4">
        <a href="https://www.linkedin.com/in/prabesh-shrestha-996bb8271/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://github.com/Shrestha-Prabesh" target="_blank" rel="noopener noreferrer">
          <Github className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
        </a>
      </div>
    </div>
  )
}
