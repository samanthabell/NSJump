# NSJump

A modern email outreach tool that helps you find and verify contacts, and send personalized emails at scale.

## Features

- Smart contact suggestions based on your service/product
- Email verification with multiple validation methods
- Department suggestions using AI
- Modern, responsive UI
- Real-time email validation
- Disposable email detection
- MX record verification

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Axios for API calls
- Email verification services

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/samanthabell/NSJump.git
cd NSJump
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run email verification tests:
```bash
npm run test:email
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
HUNTER_API_KEY=your_hunter_io_api_key # Optional
```

## Deployment

This project is deployed on Vercel. Each push to the main branch triggers an automatic deployment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details
