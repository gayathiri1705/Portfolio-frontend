import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import api from '@/lib/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // The backend expects name, email, message. We'll combine subject into the message for now
      // or just send it as part of the payload.
      await api.post('/messages', {
        name: formData.name,
        email: formData.email,
        message: `[Subject: ${formData.subject}]\n${formData.message}`
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
        <p className="text-xl text-muted-foreground">Let's discuss your next project</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">balalatha660@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted-foreground">+91 8072818585</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground">Pudukkottai, TamilNadu</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Your Email" required />
          </div>
          <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
          <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={6} required />

          <Button type="submit" disabled={status === 'loading'} className={`w-full group ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : ''}`}>
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
            {status === 'idle' && <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          </Button>
          {status === 'error' && <p className="text-red-500 text-sm text-center">Failed to send message. Please try again.</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
