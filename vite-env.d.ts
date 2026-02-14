// Type definitions for environment variables
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_VIP_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_CONTACT_TEMPLATE_ID?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}


interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'lucide-react';
declare module "*.json" {
  const value: any;
  export default value;
}
