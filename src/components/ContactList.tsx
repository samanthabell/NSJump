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

  const getVerificationColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
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

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                selectedId === contact.id
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
              onClick={() => handleSelect(contact)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.title}</p>
                  <p className="text-sm text-muted-foreground">{contact.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{contact.email}</p>
                  {contact.verificationScore !== undefined && (
                    <div className="mt-1 text-sm">
                      <span className={`font-medium ${getVerificationColor(contact.verificationScore)}`}>
                        Email Score: {contact.verificationScore}%
                      </span>
                      {contact.verificationMessage && (
                        <span className="text-muted-foreground ml-2">
                          ({contact.verificationMessage})
                        </span>
                      )}
                    </div>
                  )}
                  {contact.suggestedDepartments && (
                    <div className="mt-2 text-sm">
                      <p className="font-medium text-primary">Suggested Departments:</p>
                      <p className="text-muted-foreground">{contact.suggestedDepartments}</p>
                    </div>
                  )}
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    selectedId === contact.id
                      ? 'border-primary bg-primary'
                      : 'border-muted'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
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
