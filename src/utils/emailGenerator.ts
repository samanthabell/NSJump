import { Contact, FormData, GeneratedEmail } from '../types';
import { verifyEmail } from './emailVerifier';

// Define potential contacts with different roles
const contactPool = [
  {
    id: '1',
    name: 'Alex Morgan',
    title: 'Marketing Director',
    company: 'InnovateHub',
    email: 'alex.morgan@innovatehub.com',
    categories: ['marketing', 'digital', 'software', 'advertising']
  },
  {
    id: '2',
    name: 'Jamie Chen',
    title: 'Chief Technology Officer',
    company: 'TechForward',
    email: 'jamie.chen@techforward.com',
    categories: ['software', 'hardware', 'technology', 'IT']
  },
  {
    id: '3',
    name: 'Taylor Reed',
    title: 'Operations Manager',
    company: 'GrowthMetrics',
    email: 'taylor.reed@growthmetrics.com',
    categories: ['operations', 'logistics', 'supply chain']
  },
  {
    id: '4',
    name: 'Sarah Williams',
    title: 'Procurement Director',
    company: 'GlobalTech Solutions',
    email: 'sarah.williams@globaltech.com',
    categories: ['procurement', 'supply chain', 'hardware', 'equipment']
  },
  {
    id: '5',
    name: 'Michael Zhang',
    title: 'Innovation Lead',
    company: 'FutureWave',
    email: 'michael.zhang@futurewave.com',
    categories: ['innovation', 'technology', 'software', 'digital']
  },
  {
    id: '6',
    name: 'Rachel Kumar',
    title: 'Head of Partnerships',
    company: 'VentureScale',
    email: 'rachel.kumar@venturescale.com',
    categories: ['partnerships', 'business development', 'strategy']
  },
  {
    id: '7',
    name: 'David Park',
    title: 'Supply Chain Director',
    company: 'LogisticsPro',
    email: 'david.park@logisticspro.com',
    categories: ['logistics', 'supply chain', 'operations']
  },
  {
    id: '8',
    name: 'Emma Thompson',
    title: 'Digital Transformation Lead',
    company: 'InnovateCorp',
    email: 'emma.thompson@innovatecorp.com',
    categories: ['digital', 'technology', 'software', 'innovation']
  }
];

// Mock implementation - in a real app this would call an API
export const generateContacts = async (formData: FormData): Promise<Contact[]> => {
  try {
    // First, get department suggestions from OpenAI
    const response = await fetch('/api/analyze-departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyInfo: `${formData.brand} offers ${formData.service}`
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get department suggestions');
    }

    const { departments } = await response.json();

    // Convert service to lowercase for matching
    const serviceWords = formData.service.toLowerCase().split(' ');

    // Score each contact based on their relevance to the service
    const scoredContacts = await Promise.all(contactPool.map(async contact => {
      let score = 0;
      
      // Score based on category matches
      contact.categories.forEach(category => {
        if (serviceWords.some(word => category.includes(word) || word.includes(category))) {
          score += 2;
        }
      });

      // Score based on title relevance
      if (serviceWords.some(word => contact.title.toLowerCase().includes(word))) {
        score += 1;
      }

      // Verify email and adjust score based on verification
      const verification = await verifyEmail(contact.email);
      if (!verification.isValid) {
        score = 0; // Invalid emails get zero score
      } else {
        // Add verification score (normalized to our scoring scale)
        score += (verification.score / 100) * 3;
      }

      return { 
        ...contact, 
        score,
        emailVerification: verification
      };
    }));

    // Sort by score and take top 3 valid emails
    const selectedContacts = scoredContacts
      .filter(contact => contact.emailVerification.isValid)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ id, name, title, company, email, emailVerification }) => ({
        id,
        name,
        title,
        company,
        email,
        selected: false,
        suggestedDepartments: departments,
        verificationScore: emailVerification.score,
        verificationMessage: emailVerification.message
      }));

    return selectedContacts;
  } catch (error) {
    console.error('Error generating contacts:', error);
    // Fallback to original mock data if API fails
    return contactPool.slice(0, 3).map(({ id, name, title, company, email }) => ({
      id,
      name,
      title,
      company,
      email,
      selected: false
    }));
  }
};

// Mock implementation - in a real app this would call an API
export const generateEmail = (formData: FormData, contact: Contact): Promise<GeneratedEmail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create personalized subject line
      const subject = `Partnership Opportunity with Network School`;
      
      // Generate email body with multiple paragraphs
      const paragraphs = [
        `Hi ${contact.name},`,
        `Network School is bringing together international and local tech trailblazers—those who start and shape new markets—to exchange ideas, build new business models, and accelerate the creation of stronger systems, organizations, and markets.`,
        `Our first location, an island near Singapore, is hosting a world-class lineup of international speakers, local experts, and selected attendees (see more at ns.com). They'll learn, burn, and earn in an immersive environment designed to fast-track smart ideas into reality.`,
        `We're aligning with founding brands that enable startups to launch and scale faster. ${formData.brand}'s ${formData.service} aligns perfectly by helping startups and businesses streamline their operations and accelerate growth.`,
        `Network School is expanding internationally, growing from hundreds to tens of thousands of highly influential participants. This is an opportunity to position ${formData.brand} in front of a new, non-traditional audience of innovators, business leaders, and decision-makers.`,
        `We are after ${formData.quantity} of your ${formData.service} to be delivered to\nAddress: Forest City Marina Hotel, Jalan Forest City 1, Pulau Satu\nState: Johor, City: Gelang Patah, Postcode: 81550`,
        `Your attention and action in support of impressive new tech and businesses is appreciated.`,
        `Best,\n[Your Name]`
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
