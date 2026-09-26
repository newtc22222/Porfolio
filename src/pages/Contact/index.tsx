import { useEffect, useRef, useState } from 'react';
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

// The form shown inside the floating contact bubble. Lazy-loaded by
// ContactBubble so EmailJS stays in its own chunk.
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <Input name="name" label="Name" placeholder="John Doe" autoFocus />

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
          rows={4}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-strong dark:bg-brand-2 dark:text-background-dark focus-visible:ring-brand/40 flex-1 rounded-md px-3 py-2 font-semibold text-white transition-opacity duration-200 hover:cursor-pointer hover:opacity-90 focus-visible:ring-4 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => methods.reset(DEFAULT_VALUES)}
            className="border-primary-light/20 text-secondary-light hover:bg-primary-light/5 dark:border-primary-dark/20 dark:text-secondary-dark dark:hover:bg-primary-dark/5 rounded-md border px-3 py-2 font-medium transition-colors duration-200 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-gray-400/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>
        </div>

        {submitStatus && (
          <motion.div
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-md p-3 text-sm ${
              submitStatus === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-200'
            }`}
          >
            {submitStatus === 'success'
              ? 'Message sent. I will get back to you soon.'
              : `Message not sent. Try again, or email ${EMAIL} directly.`}
          </motion.div>
        )}
      </form>
    </FormProvider>
  );
};

export default Contact;
