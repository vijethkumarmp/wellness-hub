import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HealthQuestions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    userName: '',
    emailAddress: '',
    questionOrTopic: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const questionData: Partial<HealthQuestions> = {
        _id: crypto.randomUUID(),
        userName: formData.userName,
        emailAddress: formData.emailAddress,
        questionOrTopic: formData.questionOrTopic,
        submissionDate: new Date().toISOString(),
        status: 'pending'
      };

      await BaseCrudService.create('healthquestions', questionData);
      
      setIsSubmitted(true);
      setFormData({
        userName: '',
        emailAddress: '',
        questionOrTopic: ''
      });
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-20">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="font-heading text-5xl lg:text-7xl text-primary-foreground uppercase mb-4">
            GET IN TOUCH
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground max-w-3xl mx-auto">
            Have questions about your health journey? Want to learn more about specific wellness topics? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary p-8 lg:p-12"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-accentmintgreen mx-auto mb-6" />
                <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-4">
                  QUESTION SUBMITTED
                </h2>
                <p className="font-paragraph text-primary-foreground mb-8">
                  Thank you for reaching out! We've received your question and will get back to you soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-accentmintgreen text-primary font-heading text-lg uppercase px-8 py-3 hover:opacity-90 transition-opacity"
                >
                  SUBMIT ANOTHER QUESTION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-6">
                  SUBMIT YOUR QUESTION
                </h2>

                {/* Name Field */}
                <div>
                  <label htmlFor="userName" className="flex items-center gap-2 font-heading text-sm text-primary-foreground uppercase mb-2">
                    <User className="w-4 h-4" />
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary text-primary-foreground font-paragraph px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accentmintgreen"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="emailAddress" className="flex items-center gap-2 font-heading text-sm text-primary-foreground uppercase mb-2">
                    <Mail className="w-4 h-4" />
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary text-primary-foreground font-paragraph px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accentmintgreen"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Question Field */}
                <div>
                  <label htmlFor="questionOrTopic" className="flex items-center gap-2 font-heading text-sm text-primary-foreground uppercase mb-2">
                    <MessageSquare className="w-4 h-4" />
                    YOUR QUESTION OR TOPIC
                  </label>
                  <textarea
                    id="questionOrTopic"
                    name="questionOrTopic"
                    value={formData.questionOrTopic}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-primary text-primary-foreground font-paragraph px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accentmintgreen resize-none"
                    placeholder="What would you like to know about health and wellness?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accentmintgreen text-primary font-heading text-lg uppercase px-8 py-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'SUBMITTING...'
                  ) : (
                    <>
                      SUBMIT QUESTION
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Why Contact Us */}
            <div className="bg-secondary p-8">
              <h2 className="font-heading text-2xl text-primary-foreground uppercase mb-4">
                WHY REACH OUT?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accentmintgreen rounded-full mt-2 flex-shrink-0" />
                  <p className="font-paragraph text-primary-foreground">
                    Get personalized guidance on your health journey
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accentmintgreen rounded-full mt-2 flex-shrink-0" />
                  <p className="font-paragraph text-primary-foreground">
                    Request articles on specific wellness topics
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accentmintgreen rounded-full mt-2 flex-shrink-0" />
                  <p className="font-paragraph text-primary-foreground">
                    Share feedback to help us improve our platform
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accentmintgreen rounded-full mt-2 flex-shrink-0" />
                  <p className="font-paragraph text-primary-foreground">
                    Connect with our health intelligence community
                  </p>
                </li>
              </ul>
            </div>

            {/* Response Time */}
            <div className="bg-primary border-2 border-accentmintgreen p-8">
              <h3 className="font-heading text-xl text-accentmintgreen uppercase mb-3">
                RESPONSE TIME
              </h3>
              <p className="font-paragraph text-primary-foreground">
                We typically respond to questions within 24-48 hours. Complex health topics may require additional research time to provide you with accurate, evidence-based information.
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-secondary p-8">
              <h3 className="font-heading text-xl text-primary-foreground uppercase mb-3">
                YOUR PRIVACY MATTERS
              </h3>
              <p className="font-paragraph text-primary-foreground">
                All questions are treated confidentially. Your personal information is never shared with third parties and is used solely to provide you with the best possible health guidance.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-secondary p-8 lg:p-12 text-center"
        >
          <h2 className="font-heading text-3xl lg:text-5xl text-primary-foreground uppercase mb-4">
            EXPLORE OUR RESOURCES
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
            While you wait for a response, browse our extensive library of health articles and wellness resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/articles"
              className="inline-block bg-accentmintgreen text-primary font-heading text-lg uppercase px-10 py-4 hover:opacity-90 transition-opacity"
            >
              READ ARTICLES
            </a>
            <a
              href="/resources"
              className="inline-block border-2 border-accentmintgreen text-accentmintgreen font-heading text-lg uppercase px-10 py-4 hover:bg-accentmintgreen hover:text-primary transition-all"
            >
              VIEW RESOURCES
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
