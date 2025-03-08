
export interface FormData {
  service: string;
  brand: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  selected: boolean;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  recipient: Contact | null;
}

export enum AppState {
  INPUT = 'input',
  THINKING_CONTACTS = 'thinking_contacts',
  CONTACTS = 'contacts',
  THINKING_EMAIL = 'thinking_email',
  EMAIL = 'email',
  SENDING = 'sending',
  SENT = 'sent'
}
