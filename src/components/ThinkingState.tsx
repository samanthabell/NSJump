
import { Card } from '@/components/ui/card';

interface ThinkingStateProps {
  type: 'contacts' | 'email';
}

const ThinkingState = ({ type }: ThinkingStateProps) => {
  const title = type === 'contacts' 
    ? 'Finding the perfect contacts for you...' 
    : 'Crafting a personalized email...';
  
  const description = type === 'contacts'
    ? 'We're analyzing your service and brand to identify ideal contacts.'
    : 'We're creating a compelling email tailored to your selected contact.';

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <Card className="glass overflow-hidden border shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-full animate-thinking" />
            </div>
            <div className="gradient-blur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-8 space-y-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-full h-8 bg-muted/50 rounded animate-pulse-soft" 
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ThinkingState;
