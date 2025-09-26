// src/pages/Contact.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');

    // Simulate an API call to a backend service
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('Thank you for your message! We will be in touch soon.');
      // In a real application, you would send data here
    }, 2000);
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-background/50">
      <Card className="w-full max-w-xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2 text-cultural">
            <Mail className="h-6 w-6" />
            Get In Touch
          </CardTitle>
          <p className="text-muted-foreground">We'd love to hear your feedback or answer any questions.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Your Name</label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="Type your message here..." rows={5} required />
            </div>
            
            <Button type="submit" className="w-full bg-cultural hover:bg-cultural/90" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
            {status && <p className="text-center text-sm text-green-600 mt-4">{status}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}