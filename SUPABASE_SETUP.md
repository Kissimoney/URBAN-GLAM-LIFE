# Supabase Integration  

The project is integrated with Supabase for leads collection.  

## Configuration  

The following environment variables are required in `.env.local`:  

```env
VITE_SUPABASE_URL=https://itoiensbndrjnkxmwxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_VSocLXSo4NWTWJw_8NVCMg_LctI2ek2
```

## Database Schema  

### `leads` Table  
Stores submissions from the Newsletter and VIP Access forms.  

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | bigint | Primary Key (Identity) |
| `email` | text | User's email address |
| `source` | text | 'newsletter' or 'vip_access' |
| `preferences` | jsonb | Content preferences (for newsletter) |
| `created_at` | timestamptz | Timestamp of creation (default `now()`) |

### RLS Policies  

Row Level Security is enabled on the `leads` table.  
- **Insert**: Allowed for `anon` role (public submissions).  
- **Select**: Detailed policies should be added if public read access is needed (currently restricted).  

## Usage  

The Supabase client is initialized in `src/utils/supabaseClient.ts`.  

### Example Usage  
```typescript
import { supabase } from '../utils/supabaseClient';

await supabase.from('leads').insert([{ email: 'test@example.com', source: 'newsletter' }]);
```
