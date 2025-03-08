
import { useState } from 'react';
import { Contact } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onBack: () => void;
}

const ContactList = ({ contacts, onSelectContact, onBack }: ContactListProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (contact: Contact) => {
    setSelectedId(contact.id);
    onSelectContact(contact);
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <Card className="glass overflow-hidden border shadow-lg p-6">
        <div className="mb-6">
          <div className="inline-block mb-2 px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-medium">
            Step 2 of 3
          </div>
          <h2 className="text-2xl font-semibold mb-2">Select a Contact</h2>
          <p className="text-muted-foreground">
            Choose the best contact for your outreach from our suggestions below.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {contacts.map((contact, index) => (
            <div 
              key={contact.id}
              className={`relative p-4 rounded-lg border transition-all duration-300 group animate-slide-up cursor-pointer ${
                selectedId === contact.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted bg-white/60 hover:border-primary/30 hover:bg-primary/5'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSelect(contact)}
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.title} at {contact.company}</p>
                  <p className="text-sm text-primary mt-1">{contact.email}</p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedId === contact.id 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Check size={14} className={selectedId === contact.id ? 'opacity-100' : 'opacity-0'} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="flex-1 py-5 transition-all duration-300 border-muted hover:bg-muted/30"
          >
            Back
          </Button>
          <Button 
            onClick={() => {
              const selected = contacts.find(c => c.id === selectedId);
              if (selected) onSelectContact(selected);
            }}
            className="flex-1 py-5 transition-all duration-300 bg-primary hover:bg-primary/90"
            disabled={!selectedId}
          >
            Generate Email
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContactList;
