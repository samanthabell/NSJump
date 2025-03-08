
import { Contact, FormData, GeneratedEmail } from '../types';

// Mock implementation - in a real app this would call an API
export const generateContacts = (formData: FormData): Promise<Contact[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock generated contacts based on input data
      const contacts = [
        {
          id: '1',
          name: 'Alex Morgan',
          title: 'Marketing Director',
          company: 'InnovateHub',
          email: 'alex.morgan@innovatehub.com',
          selected: false
        },
        {
          id: '2',
          name: 'Jamie Chen',
          title: 'Chief Technology Officer',
          company: 'TechForward',
          email: 'jamie.chen@techforward.com',
          selected: false
        },
        {
          id: '3',
          name: 'Taylor Reed',
          title: 'Operations Manager',
          company: 'GrowthMetrics',
          email: 'taylor.reed@growthmetrics.com',
          selected: false
        }
      ];
      resolve(contacts);
    }, 2000); // Simulate API delay
  });
};

// Mock implementation - in a real app this would call an API
export const generateEmail = (formData: FormData, contact: Contact): Promise<GeneratedEmail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create personalized subject line
      const subject = `${formData.brand} ${formData.service} - Opportunity for ${contact.company}`;
      
      // Generate email body with multiple paragraphs
      const paragraphs = [
        `Dear ${contact.name},`,
        `I hope this email finds you well. I'm reaching out because I noticed ${contact.company} has been making impressive strides in your industry, and I wanted to introduce ${formData.brand} and our ${formData.service}.`,
        `We've helped companies similar to ${contact.company} achieve significant improvements in their operations through our specialized solutions. Our approach focuses on delivering measurable results while ensuring a seamless integration with your existing workflows.`,
        `I'd love to schedule a brief call to discuss how ${formData.brand}'s ${formData.service} could specifically benefit ${contact.company}. Would you be available for a 15-minute conversation next week?`,
        `Thank you for your time and consideration.`,
        `Best regards,\n[Your Name]\n${formData.brand}`
      ];
      
      // Join paragraphs with double line breaks
      const body = paragraphs.join('\n\n');
      
      resolve({
        subject,
        body,
        recipient: contact
      });
    }, 2000); // Simulate API delay
  });
};

// Simulate sending email - in a real app this would call an API
export const sendEmail = (email: GeneratedEmail): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful email sending
      console.log('Email sent:', email);
      resolve(true);
    }, 2000); // Simulate API delay
  });
};
