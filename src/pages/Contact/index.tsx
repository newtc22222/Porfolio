import { useEffect, useRef, useState } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';

import { Input } from './Input';
import { EMAIL } from '../../constants/self-information';
import { EMAILJS_CONFIG } from '../../constants/config';

// Define form validation schema
const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup
      .string()
      .required('Message is required')
      .min(20, 'Message must be at least 20 characters'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const DEFAULT_VALUES: FormData = { name: '', email: '', message: '' };

const STATUS_TIMEOUT_MS = 5000;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
          to_email: EMAIL,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setSubmitStatus('success');
      methods.reset(DEFAULT_VALUES);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      statusTimerRef.current = setTimeout(() => {
        setSubmitStatus(null);
        statusTimerRef.current = null;
      }, STATUS_TIMEOUT_MS);
    }
  };

  return (
    <Element name="#contact">
      <section
        id="contact"
        className="from-background-light/90 to-background-light/70 dark:from-background-dark/90 dark:to-background-dark/70 bg-gradient-to-b py-20 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-primary-light dark:text-primary-dark mb-4 text-4xl font-bold">
              Get in Touch
            </h2>
            <p className="text-secondary-light dark:text-secondary-dark mb-2">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <p className="text-primary-light dark:text-primary-dark font-medium">
              {EMAIL}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-800/50"
          >
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <Input name="name" label="Name" placeholder="John Doe" />

                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                />

                <Input
                  name="message"
                  label="Message"
                  placeholder="Your message here..."
                  multiline
                  rows={5}
                />

                <div className="flex flex-col gap-4 md:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="focus:ring-primary-light/20 dark:focus:ring-primary-dark/20 focus:border-primary-light dark:focus:border-primary-dark w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-medium text-gray-900 transition-all duration-200 hover:cursor-pointer hover:bg-gray-50 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => methods.reset(DEFAULT_VALUES)}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 font-medium text-gray-600 transition-all duration-200 hover:cursor-pointer hover:bg-gray-200 focus:ring-2 focus:ring-gray-400/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-500/20"
                  >
                    Reset Form
                  </button>
                </div>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-md p-4 ${
                      submitStatus === 'success'
                        ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-200'
                        : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-200'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? 'Message sent successfully!'
                      : 'Failed to send message. Please try again.'}
                  </motion.div>
                )}
              </form>
            </FormProvider>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
