import axios from 'axios';

async function verifyEmail(email) {
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

    // Disposable email check
    const disposableDomains = [
      'tempmail.com',
      'throwawaymail.com',
      'mailinator.com'
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

const testEmails = [
  {
    email: 'test@example.com',
    description: 'Basic valid email format'
  },
  {
    email: 'invalid-email',
    description: 'Invalid email format'
  },
  {
    email: 'test@gmail.com',
    description: 'Valid email with major provider'
  },
  {
    email: 'test@tempmail.com',
    description: 'Disposable email domain'
  },
  {
    email: 'test@nonexistentdomain123456.com',
    description: 'Domain likely without MX records'
  }
];

async function runTests() {
  console.log('Starting email verification tests...\n');

  for (const { email, description } of testEmails) {
    console.log(`Testing: ${email} (${description})`);
    try {
      const result = await verifyEmail(email);
      console.log('Result:', {
        isValid: result.isValid,
        score: result.score,
        message: result.message
      });
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('---\n');
  }
}

// Run the tests
runTests().then(() => console.log('Tests completed!')); 