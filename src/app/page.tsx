"use client";

import Link from 'next/link';
import { useState } from 'react';
import projectData from './data/projectData.json';

export default function Home() {
  const data = projectData;
  const [activeTab, setActiveTab] = useState('tech');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* NavBar */}
      <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 dark:text-blue-400 text-2xl">🧠</span>
          <span className="font-bold text-xl text-slate-900 dark:text-white">CyberJabin</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Features</a>
          <a href="#technology" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Technology</a>
          <a href="#prospects" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Prospects</a>
          <a href="#challenges" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Challenges</a>
        </div>
        <Link 
          href="/chat" 
          className="px-4 py-2 text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Start Chat
        </Link>
      </div>
    </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 z-0"></div>
        <div className="absolute -right-64 -top-64 w-96 h-96 bg-blue-200 dark:bg-blue-700 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -left-64 top-32 w-96 h-96 bg-indigo-200 dark:bg-indigo-700 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-1">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {data.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {data.introduction}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/chat" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <span className="mr-2">💬</span> Start Chat
            </Link>
            <a 
              href="#features" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <span className="mr-2">🔍</span> Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-white dark:bg-slate-800 z-0"></div>
        <div className="container mx-auto px-4 relative z-1">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            {data.technology.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Discover the powerful capabilities that make CyberJabin your ideal personal AI companion
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.technology.features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-600"
              >
                <div className="text-4xl mb-6 text-blue-600 dark:text-blue-400">{feature.name.split(' ')[0]}</div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                  {feature.name.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture Section */}
      <section id="technology" className="py-20 relative">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-0"></div>
        <div className="container mx-auto px-4 relative z-1">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-slate-900 dark:text-white">
              Technology & Architecture
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Explore the powerful technologies and innovative architecture behind CyberJabin
            </p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button 
                  onClick={() => setActiveTab('tech')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'tech' 
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Tech Stack
                </button>
                <button 
                  onClick={() => setActiveTab('architecture')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'architecture' 
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Architecture
                </button>
              </div>
            </div>
            
            {/* Tech Stack Content */}
            {activeTab === 'tech' && (
              <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
                  {data.technology.techStack.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  {data.technology.techStack.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.technology.techStack.details.map((detail, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg text-center">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Architecture Content */}
            {activeTab === 'architecture' && (
              <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-700">
                <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
                  {data.technology.architecture.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  {data.technology.architecture.description}
                </p>
                
                <div className="space-y-6">
                  {data.technology.architecture.components.map((component, index) => (
                    <div key={index} className="flex items-start bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                      <div className="h-12 w-12 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 dark:text-blue-300 text-lg font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          {component.name}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300">
                          {component.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700 rounded-r-lg">
                  <p className="text-slate-700 dark:text-slate-300">
                    {data.technology.architecture.benefits}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Prospect Section */}
      <section id="prospects" className="py-20 relative">
        <div className="absolute inset-0 bg-white dark:bg-slate-800 z-0"></div>
        <div className="container mx-auto px-4 relative z-1">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              {data.projectProspect.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Explore the potential applications and future development of CyberJabin
            </p>
            
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-8 rounded-xl shadow-md">
              <p className="text-slate-600 dark:text-slate-300 mb-10">
                {data.projectProspect.description}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {data.projectProspect.applications.map((application, index) => (
                  <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                      <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{application}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-slate-600 dark:text-slate-400 italic">
                  {data.projectProspect.trend}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="py-20 relative">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-0"></div>
        <div className="container mx-auto px-4 relative z-1">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              {data.challenges.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Technical challenges we're exploring to enhance CyberJabin
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {data.challenges.list.map((challenge, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500 dark:border-orange-600"
                >
                  <p className="text-slate-700 dark:text-slate-300">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] z-1"></div>
        
        <div className="container mx-auto px-4 text-center relative z-2">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to explore CyberJabin?
            </h2>
            <p className="text-blue-100 mb-10 text-lg">
              Start your journey with an AI companion that truly understands and remembers you.
            </p>
            
            <Link 
              href="/chat" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">💬</span> Start Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-slate-800 dark:bg-slate-950 text-slate-400">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-blue-500 text-2xl">🧠</span>
            <span className="font-bold text-xl text-white">CyberJabin</span>
          </div>
          <p>Personal AI Memory and Growth Companion</p>
          <div className="mt-6">
            <p className="text-sm">© {new Date().getFullYear()} CyberJabin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}