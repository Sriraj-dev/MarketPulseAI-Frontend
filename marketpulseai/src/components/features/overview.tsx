"use client"

import React, { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  title: string
  content: string
}

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: "Welcome to the documentation! This is the introduction section where we give you an overview of what this project is about. You’ll find general information and basic guidelines for getting started with our tool.This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti? This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?"
  },
  {
    id: "getting-started",
    title: "Getting Started",
    content: "To get started, simply follow the installation guide. First, clone the repository, then install the necessary dependencies. After that, you can run the app locally or set it up in your production environment. Detailed steps are provided here.This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?"
  },
  {
    id: "basic-features",
    title: "Basic Features",
    content: "This section outlines the key features of the app, including user authentication, data input forms, and basic analytics. These features provide a simple yet powerful experience to get you up and running quickly.This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?"
  },
  {
    id: "advanced-features",
    title: "Advanced Features",
    content: "Here we cover the more complex functionalities such as API integrations, advanced data manipulation, and user role management. These features are designed to enhance your workflow and provide more flexibility. This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?"
  },
  {
    id: "api-reference",
    title: "API Reference",
    content: "This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti? This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?This is the API reference section where we detail all available endpoints, parameters, and expected responses. It's important for developers who want to interact with the backend or integrate external systems. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, in, dolorum aliquid illum consequuntur esse unde architecto voluptas fugiat voluptates earum eos corrupti?"
  },
]

const Overview = () => {
  const [activeSection, setActiveSection] = useState("")
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" })
  }

  return (
<div className="flex flex-col md:flex-row lg:border-r border-[#EFF8F3]">
      <nav className="w-full md:block  h-fit hidden md:w-64 p-4  sticky top-0">
        <ScrollArea className="h-full">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-300"></div>
            <ul className="space-y-6 pl-8">
              {sections.map((section) => (
                <li key={section.id} className="relative">
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute -left-[23px] top-2 w-4 h-4 rounded-full border-2 transition-colors",
                      activeSection === section.id ? "bg-primary border-primary" : "bg-white border-gray-300",
                    )}
                  ></div>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded transition-colors",
                      activeSection === section.id ? "text-primary font-bold" : "hover:text-gray-500",
                    )}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </nav>
      <main className="flex-1 p-4 overflow-auto">
        <ScrollArea className="h-full">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => {
                sectionRefs.current[section.id] = el as HTMLDivElement | null
              }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </ScrollArea>
      </main>
    </div>
  )
}

export default Overview
