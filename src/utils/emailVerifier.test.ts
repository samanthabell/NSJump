import { verifyEmail } from './emailVerifier';

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