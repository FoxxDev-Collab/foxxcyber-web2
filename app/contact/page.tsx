import ContactForm from "@/app/contact/form"; // Make sure to update this path based on where you place the form component

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Let&apos;s Secure Your Business Together
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Have questions about our services or need a tailored security solution? 
              Our team of experts is ready to help you protect your digital assets.
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 text-primary/5 dark:text-primary/10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M44,-76.5C58.7,-69.1,73.3,-60.1,81.2,-47C89.1,-33.9,90.2,-16.9,88.7,-0.9C87.2,15.2,83,30.3,75.2,43.2C67.4,56.1,56,66.7,42.5,74.4C28.9,82.1,13.2,86.8,-1.9,89.7C-17,92.6,-34,93.7,-48.4,87.3C-62.8,81,-74.5,67.2,-83.3,51.8C-92.1,36.4,-98,19.2,-97.8,2.2C-97.5,-14.8,-91.1,-29.6,-82.1,-42.3C-73.1,-55,-61.5,-65.6,-47.8,-73.3C-34.1,-81,-17,-85.8,-1,-84.3C15,-82.8,30,-83.9,44,-76.5Z" />
          </svg>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-lg p-6 h-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">Contact Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-primary dark:text-primary/90 mb-2">Email Us</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      <a href="mailto:info@foxxcyber.com" className="hover:underline">jprice@foxxcyber.com</a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-primary dark:text-primary/90 mb-2">Office Location</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Boise, Idaho
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-primary dark:text-primary/90 mb-2">Business Hours</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Monday - Friday: 9:00 AM - 5:00 PM MT
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              Frequently Asked Questions
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-50">How quickly will you respond to my inquiry?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We typically respond to all inquiries within 1 business day. For urgent matters, please indicate this in your message.
                </p>
              </div>
              
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-50">Do you offer remote services?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we provide comprehensive security services remotely to clients across the United States and internationally.
                </p>
              </div>
              
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-50">How do you handle sensitive information?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We take data privacy seriously. All communications and information shared with us are protected using industry-standard encryption and security practices.
                </p>
              </div>
              
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-50">Can you provide customized solutions?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolutely. We tailor our security services to match your specific business needs, industry requirements, and existing infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}