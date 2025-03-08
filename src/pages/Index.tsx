
import { useState } from 'react';
import { AppState, Contact, FormData, GeneratedEmail } from '@/types';
import InputForm from '@/components/InputForm';
import ThinkingState from '@/components/ThinkingState';
import ContactList from '@/components/ContactList';
import EmailPreview from '@/components/EmailPreview';
import { generateContacts, generateEmail, sendEmail } from '@/utils/emailGenerator';
import { useToast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setAppState(AppState.THINKING_CONTACTS);
    
    try {
      const generatedContacts = await generateContacts(data);
      setContacts(generatedContacts);
      setAppState(AppState.CONTACTS);
    } catch (error) {
      console.error('Error generating contacts:', error);
      toast({
        title: "Error",
        description: "Failed to generate contacts. Please try again.",
        variant: "destructive",
      });
      setAppState(AppState.INPUT);
    }
  };

  const handleSelectContact = async (contact: Contact) => {
    setSelectedContact(contact);
    setAppState(AppState.THINKING_EMAIL);
    
    try {
      if (formData) {
        const email = await generateEmail(formData, contact);
        setGeneratedEmail(email);
        setAppState(AppState.EMAIL);
      }
    } catch (error) {
      console.error('Error generating email:', error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
        variant: "destructive",
      });
      setAppState(AppState.CONTACTS);
    }
  };

  const handleSendEmail = async () => {
    if (!generatedEmail) return;
    
    setAppState(AppState.SENDING);
    
    try {
      await sendEmail(generatedEmail);
      setAppState(AppState.SENT);
      toast({
        title: "Success!",
        description: "Your email has been sent successfully.",
        duration: 5000,
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setAppState(AppState.INPUT);
        setFormData(null);
        setContacts([]);
        setSelectedContact(null);
        setGeneratedEmail(null);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
      setAppState(AppState.EMAIL);
    }
  };

  const handleBackToInput = () => {
    setAppState(AppState.INPUT);
  };

  const handleBackToContacts = () => {
    setAppState(AppState.CONTACTS);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="gradient-blur top-1/4 left-1/4 opacity-30" />
      <div className="gradient-blur bottom-1/4 right-1/4 opacity-30" />
      
      {/* App logo and title */}
      <div className="mb-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <div className="w-6 h-6 bg-primary rounded-lg" />
        </div>
        <h1 className="text-2xl font-semibold">Outreach Assistant</h1>
      </div>
      
      {/* Main content */}
      {appState === AppState.INPUT && (
        <InputForm onSubmit={handleFormSubmit} />
      )}
      
      {appState === AppState.THINKING_CONTACTS && (
        <ThinkingState type="contacts" />
      )}
      
      {appState === AppState.CONTACTS && (
        <ContactList 
          contacts={contacts} 
          onSelectContact={handleSelectContact} 
          onBack={handleBackToInput} 
        />
      )}
      
      {appState === AppState.THINKING_EMAIL && (
        <ThinkingState type="email" />
      )}
      
      {appState === AppState.EMAIL && generatedEmail && (
        <EmailPreview 
          email={generatedEmail} 
          onSend={handleSendEmail} 
          onBack={handleBackToContacts}
          sending={false}
        />
      )}
      
      {appState === AppState.SENDING && generatedEmail && (
        <EmailPreview 
          email={generatedEmail} 
          onSend={handleSendEmail} 
          onBack={handleBackToContacts}
          sending={true}
        />
      )}
      
      {appState === AppState.SENT && (
        <div className="w-full max-w-lg mx-auto animate-fade-in">
          <div className="glass overflow-hidden border shadow-lg p-8 text-center rounded-lg">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={32} className="text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Email Sent Successfully!</h3>
            <p className="text-muted-foreground">
              Your message is on its way to the recipient.
            </p>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-auto pt-8 text-center text-sm text-muted-foreground">
        Designed with precision and simplicity in mind.
      </div>
    </div>
  );
};

export default Index;
