"use client"

import { FadeInOnScroll } from "../scroll-effects/FadeInOnScroll"

export function NewsletterSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <FadeInOnScroll direction="right">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6">Stay Connected</h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Subscribe to our newsletter to receive updates on our latest research, upcoming events, and
                opportunities to get involved.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll direction="left" delay={0.2}>
            <div className="bg-gray-800/80 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl relative group overflow-hidden border border-gray-700">
              <form className="space-y-4 sm:space-y-5 relative z-10">
                <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="sr-only">
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      placeholder="First name"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 focus:ring-offset-gray-800 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="sr-only">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      placeholder="Last name"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 focus:ring-offset-gray-800 transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 focus:ring-offset-gray-800 transition-colors duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 focus:ring-offset-gray-800 relative group overflow-hidden"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  )
}

