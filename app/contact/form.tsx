'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Building2, User, Phone, Briefcase, MapPin, MessageSquare, CheckCircle, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    companyName: '',
    phone: '',
    location: '',
    serviceInterest: '',
    message: '',
    howHeard: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    { value: "", label: "Select a service" },
    { value: "soaas", label: "Security Officer as a Service" },
    { value: "ato", label: "ATO as a Service" },
    { value: "risk", label: "Security Risk Assessment" },
    { value: "consulting", label: "Security Consulting" },
    { value: "other", label: "Other" }
  ];

  const howHeardOptions = [
    { value: "", label: "Select an option" },
    { value: "search", label: "Search Engine" },
    { value: "social", label: "Social Media" },
    { value: "referral", label: "Referral" },
    { value: "blog", label: "Blog or Article" },
    { value: "event", label: "Event or Conference" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen to show after form submission
  const renderSuccessScreen = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Thank You!</h3>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Your message has been received. Our team will contact you within 1 business day.
      </p>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              jobTitle: '',
              companyName: '',
              phone: '',
              location: '',
              serviceInterest: '',
              message: '',
              howHeard: ''
            });
          }}
          className="px-6"
        >
          Send Another Message
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur shadow-lg">
      <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10 dark:border-primary/20">
        <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50">
          Get in Touch
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {submitted ? (
          renderSuccessScreen()
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-primary" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-primary" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
                placeholder="you@company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="CTO, IT Director, etc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Building2 className="w-4 h-4 text-primary" />
                  Company
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="Your Organization"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Shield className="w-4 h-4 text-primary" />
                I&apos;m Interested In
              </label>
              <select
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
              >
                {serviceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MessageSquare className="w-4 h-4 text-primary" />
                How Can We Help?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:bg-slate-700 dark:text-white"
                placeholder="Tell us about your security needs..."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
                How Did You Hear About Us?
              </label>
              <select
                name="howHeard"
                value={formData.howHeard}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:text-white"
              >
                {howHeardOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full py-3 text-lg"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;