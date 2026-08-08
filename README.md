# SERASA Website

Landing e dashboard do SERASA (Next.js).

## Desenvolvimento

```bash
npm install
npm run dev
```

## Deploy (Vercel)

Importe este repositório na Vercel e configure:

```env
DISCORD_CLIENT_ID=
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
SERASA_API_URL=https://serasa-api-best.squareweb.app
```

Redirect Discord OAuth: `https://seu-dominio/api/auth/callback`
