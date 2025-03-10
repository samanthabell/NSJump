import { useState } from 'react';
import { FormData } from '../types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InputFormProps {
  onSubmit: (data: FormData) => void;
}

const InputForm = ({ onSubmit }: InputFormProps) => {
  const [service, setService] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isFocused, setIsFocused] = useState<'service' | 'brand' | 'quantity' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service.trim() && brand.trim() && quantity.trim()) {
      onSubmit({ service, brand, quantity });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-block mb-2 px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-medium animate-slide-down">
          Outreach Assistant
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2 animate-slide-down" style={{ animationDelay: '100ms' }}>
          Generate Targeted Outreach
        </h1>
        <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: '200ms' }}>
          Enter your service or product, brand, and quantity to find perfect contacts and craft personalized emails.
        </p>
      </div>

      <Card className="glass overflow-hidden border shadow-lg p-1">
        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="service" 
              className={`text-sm font-medium transition-all duration-300 ${isFocused === 'service' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Service or Product
            </label>
            <Input
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              onFocus={() => setIsFocused('service')}
              onBlur={() => setIsFocused(null)}
              placeholder="e.g. Web Design Services, Marketing Automation Software"
              className="transition-all duration-300 bg-white/60 border-muted focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label 
              htmlFor="brand" 
              className={`text-sm font-medium transition-all duration-300 ${isFocused === 'brand' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Your Brand or Company
            </label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              onFocus={() => setIsFocused('brand')}
              onBlur={() => setIsFocused(null)}
              placeholder="e.g. Acme Inc., TechSolutions"
              className="transition-all duration-300 bg-white/60 border-muted focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="quantity" 
              className={`text-sm font-medium transition-all duration-300 ${isFocused === 'quantity' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Quantity Required
            </label>
            <Input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onFocus={() => setIsFocused('quantity')}
              onBlur={() => setIsFocused(null)}
              placeholder="e.g. 100 units, 5 licenses, 3 months"
              className="transition-all duration-300 bg-white/60 border-muted focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          <Button 
            type="submit"
            className="w-full py-6 transition-all duration-300 bg-primary hover:bg-primary/90"
          >
            Find Contacts
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default InputForm;
