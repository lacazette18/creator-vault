# CreatorVault - Micro-SaaS MVP

Dashboard de revenus pour créateurs de contenu (OnlyFans, Fansly, etc.)

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (Auth + Database)
- Recharts (graphiques)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

## Configuration Supabase

### 1. Créer un projet Supabase

Aller sur https://supabase.com et créer un nouveau projet.

### 2. Configurer la base de données

Dans le SQL Editor de Supabase, exécuter le contenu de `supabase/schema.sql`.

### 3. Variables d'environnement

Créer `.env.local` :

```bash
# Supabase (Frontend)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase (Backend - Service Role pour les API routes)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Pour trouver ces clés :
- **URL** : Settings → API → Project URL
- **Anon Key** : Settings → API → `projectAnonKey`
- **Service Role Key** : Settings → API → `service_role` (attention : ne jamais exposer côté client)

## Structure du projet

```
creator-vault/
├── app/
│   ├── api/
│   │   └── revenues/
│   │       └── route.ts      # API CRUD revenus
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Dashboard principal
├── components/
│   ├── RevenueInput.tsx      # Formulaire ajout revenus
│   ├── RevenueChart.tsx      # Graphique revenus
│   └── Sidebar.tsx
├── lib/
│   ├── supabase.ts           # Client Supabase
│   └── utils.ts              # Helpers
├── supabase/
│   └── schema.sql            # Schéma DB
└── package.json
```

## Schéma de la base de données

### Table `revenues`

| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Clé primaire |
| user_id | UUID | Référence utilisateur |
| platform | VARCHAR | Plateforme (onlyfans, fansly...) |
| amount | DECIMAL | Montant en USD |
| note | TEXT | Note optionnelle |
| date | DATE | Date du revenu |
| created_at | TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | Date de mise à jour |

### Table `subscriptions`

Pour la monétisation future (Stripe).

## API

### POST /api/revenues

Ajouter un revenu.

```json
{
  "platform": "onlyfans",
  "amount": 150.00,
  "note": "Tip d'un fan",
  "userId": "uuid-utilisateur"
}
```

### GET /api/revenues?userId=xxx&startDate=2024-01-01&endDate=2024-12-31

Récupérer les revenus d'un utilisateur.

## Prochaines étapes

- [x] Ajouter l'authentification (Supabase Auth)
- [x] Implémenter le dashboard avec vraies données
- [x] Ajouter les graphiques dynamiques
- [x] Système de souscriptions (Stripe)
- [x] Export PDF pour les taxes
