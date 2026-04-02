# Déploiement CreatorVault

## Étapes pour mettre en production

### 1. Préparer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Dans le SQL Editor, exécuter :
   - `supabase/schema.sql`
   - `supabase/subscriptions.sql`
3. Aller dans **Settings → API**
4. Copier :
   - Project URL
   - `projectAnonKey`
   - `service_role` (dans la section "Project API keys")

### 2. Préparer Stripe (pour les paiements)

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Créer 2 produits dans le dashboard Stripe :
   - **Pro** : $9/mois (récurrent)
   - **Premium** : $19/mois (récurrent)
3. Copier les **Price IDs** (commencent par `price_`)
4. Configurer le webhook :
   - URL : `https://ton-domaine.com/api/stripe/webhook`
   - Événements : `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
5. Copier le **Webhook Secret** (commence par `whsec_`)

### 3. Déployer sur Vercel

```bash
cd /root/.openclaw/workspace/creator-vault
npx vercel login
npx vercel deploy --prod
```

Ou via GitHub :
1. Pusher le code sur GitHub
2. Importer dans Vercel
3. Configurer les variables d'environnement

### 4. Variables d'environnement sur Vercel

Ajouter dans **Settings → Environment Variables** :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_BASE_URL=https://ton-domaine.com
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_PREMIUM_PRICE_ID=price_xxx
```

### 5. Configurer le domaine

1. Acheter un domaine (OVH, Namecheap, etc.)
2. L'ajouter dans Vercel
3. Mettre à jour `NEXT_PUBLIC_BASE_URL`

---

## Commandes utiles

```bash
# Développement local
npm run dev

# Build production
npm run build

# Linter
npm run lint
```

---

## Monitoring

- **Vercel** : Dashboard → Deployment
- **Supabase** : Dashboard → Logs
- **Stripe** : Dashboard → Webhooks
