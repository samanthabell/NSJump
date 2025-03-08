
import { useState } from 'react';
import { GeneratedEmail, Contact } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Check, Copy, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmailPreviewProps {
  email: GeneratedEmail;
  onSend: () => void;
  onBack: () => void;
  sending: boolean;
}

const EmailPreview = ({ email, onSend, onBack, sending }: EmailPreviewProps) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState(email.subject);
  const [body, setBody] = useState(email.body);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullEmail = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Email content has been copied to your clipboard."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <Card className="glass overflow-hidden border shadow-lg p-6">
        <div className="mb-6">
          <div className="inline-block mb-2 px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-medium">
            Step 3 of 3
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your Personalized Email</h2>
          <p className="text-muted-foreground">
            Review and edit the email before sending it to{' '}
            <span className="text-foreground font-medium">{email.recipient?.name}</span>.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">
              Subject Line
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="transition-all duration-300 bg-white/60 border-muted focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium text-muted-foreground">
              Email Body
            </label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[260px] transition-all duration-300 bg-white/60 border-muted focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="py-5 transition-all duration-300 border-muted hover:bg-muted/30"
            disabled={sending}
          >
            Back
          </Button>
          <Button 
            onClick={handleCopy}
            variant="outline" 
            className="py-5 transition-all duration-300 border-muted hover:bg-muted/30"
            disabled={sending}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="ml-2">{copied ? 'Copied' : 'Copy'}</span>
          </Button>
          <Button 
            onClick={onSend}
            className="flex-1 py-5 transition-all duration-300 bg-primary hover:bg-primary/90 active:scale-[0.98]"
            disabled={sending}
          >
            {sending ? 'Sending...' : (
              <>
                <Send size={18} />
                <span className="ml-2">Send Email</span>
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmailPreview;
