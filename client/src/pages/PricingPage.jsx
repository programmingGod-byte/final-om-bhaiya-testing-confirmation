function PricingPage() {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">Pricing Plans</h1>
            <p className="mt-5 text-xl text-gray-500">
              Choose the perfect plan for your needs. Always know what you'll pay. No hidden fees.
            </p>
          </div>
  
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Basic Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-medium text-gray-900">Basic</h3>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                ₹0
                  <span className="ml-1 text-2xl font-medium text-gray-500">/month</span>
                </div>
                <p className="mt-5 text-lg text-gray-500">Perfect for individuals just getting started.</p>
              </div>
              <div className="px-6 py-8 bg-gray-50">
                <ul className="space-y-4">
                  {["Blog","Forum"].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >


                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}



{["Research Paper","5 workspace", "Limited module"].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">


                      <svg
  width={16}
  height={16}
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <line
    x1="2"
    y1="2"
    x2="14"
    y2="14"
    stroke="#FF4141"
    strokeWidth={2}
    strokeLinecap="round"
  />
  <line
    x1="14"
    y1="2"
    x2="2"
    y2="14"
    stroke="#FF4141"
    strokeWidth={2}
    strokeLinecap="round"
  />
</svg>

                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}





                </ul>
                <div className="mt-8">
                  <a
                    href="#"
                    className="block w-full bg-purple-600 border border-transparent rounded-md py-3 px-5 text-center font-medium text-white hover:bg-purple-700"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
  
            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-purple-500 relative">
              <div className="absolute top-0 inset-x-0">
                <div className="bg-purple-500 text-white text-center text-sm font-semibold py-1">Most Popular</div>
              </div>
              <div className="px-6 py-8 pt-10">
                <h3 className="text-2xl font-medium text-gray-900">Pro</h3>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                ₹99
                  <span className="ml-1 text-2xl font-medium text-gray-500">/module</span>
                </div>
                <p className="mt-5 text-lg text-gray-500">Perfect for learning Hardware Fundamentals</p>
              </div>
              <div className="px-6 py-8 bg-gray-50">
                <ul className="space-y-4">
               
                {[ "Blog","Forum"].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >


                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}



{["Research Paper","Unlimited workspace", "Access to all module"].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                      <svg
                          className="h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >


                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>

                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}





               
               
                </ul>
                <div className="mt-8">
                  <a
                    href="#"
                    className="block w-full bg-purple-600 border border-transparent rounded-md py-3 px-5 text-center font-medium text-white hover:bg-purple-700"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
  
            {/* Enterprise Plan */}
          </div>
  
          <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Need a custom plan?</h2>
                <p className="mt-2 text-lg text-gray-500">
                  Contact our sales team to find a solution that works for your specific requirements.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="#"
                  className="inline-flex items-center justify-center bg-purple-600 border border-transparent rounded-md py-3 px-5 text-base font-medium text-white hover:bg-purple-700"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
  
          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Frequently Asked Questions</h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {[
                {
                  question: "Can I change plans later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
                },
                {
                  question: "How does billing work?",
                  answer:
                    "We offer monthly and annual billing options. Annual plans come with a 20% discount compared to monthly billing.",
                },
                {
                  question: "Do you offer a free trial?",
                  answer: "Yes, all plans come with a 14-day free trial. No credit card required to start.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-base text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default PricingPage
  