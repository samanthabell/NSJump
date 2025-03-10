import { analyzeDepartments } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { companyInfo } = await req.json();
    
    if (!companyInfo) {
      return new Response('Missing company information', { status: 400 });
    }

    const departments = await analyzeDepartments(companyInfo);
    
    return new Response(JSON.stringify({ departments }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error analyzing departments:', error);
    return new Response('Error analyzing departments', { status: 500 });
  }
} 