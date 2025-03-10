import axios from 'axios';

export interface VerificationResult {
  isValid: boolean;
  score: number;
  message: string;
}

export async function verifyEmail(email: string): Promise<VerificationResult> {
  try {
    // Basic format verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        score: 0,
        message: 'Invalid email format'
      };
    }

    // Extract domain for MX record check
    const domain = email.split('@')[1];

    // Verify domain MX records
    try {
      const mxResponse = await axios.get(`https://dns.google/resolve?name=${domain}&type=MX`);
      const hasMX = mxResponse.data.Answer && mxResponse.data.Answer.length > 0;
      if (!hasMX) {
        return {
          isValid: false,
          score: 0,
          message: 'Domain has no MX records'
        };
      }
    } catch (error) {
      console.error('MX record check failed:', error);
    }

    // If Hunter.io API key is available, use their service
    if (process.env.HUNTER_API_KEY) {
      try {
        const hunterResponse = await axios.get(
          `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.HUNTER_API_KEY}`
        );
        
        const { data } = hunterResponse.data;
        return {
          isValid: data.status === 'valid',
          score: data.score,
          message: `Hunter.io verification: ${data.status}`
        };
      } catch (error) {
        console.error('Hunter.io verification failed:', error);
      }
    }

    // Disposable email check
    const disposableDomains = [
      'tempmail.com',
      'throwawaymail.com',
      'mailinator.com',
      // Add more disposable email domains as needed
    ];
    
    if (disposableDomains.some(d => domain.includes(d))) {
      return {
        isValid: false,
        score: 0,
        message: 'Disposable email detected'
      };
    }

    // If we've made it this far and haven't returned a definitive result,
    // return a moderate confidence score
    return {
      isValid: true,
      score: 70,
      message: 'Basic verification passed'
    };
  } catch (error) {
    console.error('Email verification failed:', error);
    return {
      isValid: false,
      score: 0,
      message: 'Verification failed'
    };
  }
} 