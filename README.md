# IDT - Société Ivoirienne de Télédiffusion

Site web officiel de la Société Ivoirienne de Télédiffusion (IDT) construit avec Next.js 14.

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte Vercel
- Repository GitHub connecté à Vercel

### Étapes de déploiement

1. **Connectez votre repository à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub

2. **Configuration automatique**
   - Vercel détectera automatiquement Next.js
   - Le fichier `vercel.json` est déjà configuré

3. **Variables d'environnement**
   Créez un fichier `.env.local` avec :
   ```env
   # Configuration Email
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_TO=contact@idt.ci
   
   # Configuration Next.js
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Déploiement**
   - Vercel déploiera automatiquement à chaque push
   - Le build utilise `npm install --legacy-peer-deps`

## 🛠️ Développement local

### Installation
```bash
npm install --legacy-peer-deps
```

### Démarrage
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 🔧 Corrections apportées

### Problèmes résolus
- ✅ Compatibilité Next.js 15 → 14.2.5
- ✅ Configuration Tailwind CSS manquante
- ✅ Polices Google Fonts non disponibles
- ✅ Import `motion/react` → `framer-motion`
- ✅ Conflits de dépendances React 18/19
- ✅ Configuration PostCSS
- ✅ Types TypeScript

### Fichiers modifiés
- `package.json` - Versions compatibles
- `tailwind.config.js` - Configuration Tailwind
- `app/globals.css` - Variables CSS et Tailwind
- `app/layout.tsx` - Polices disponibles
- `app/composants/Hero.tsx` - Import framer-motion
- `app/actualite/page.tsx` - Propriété readTime
- `next.config.js` - Configuration Next.js
- `postcss.config.mjs` - Configuration PostCSS
- `tsconfig.json` - Configuration TypeScript
- `eslint.config.mjs` - Configuration ESLint
- `vercel.json` - Configuration Vercel

## 📁 Structure du projet

```
idt/
├── app/                    # App Router Next.js 14
├── components/            # Composants UI
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires
├── public/                # Assets statiques
└── config/                # Configuration
```

## 🌐 Technologies utilisées

- **Framework**: Next.js 14.2.5
- **React**: 18.3.1
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Maps**: React Leaflet
- **TypeScript**: 5.x

## 📝 Notes importantes

- Le projet utilise `--legacy-peer-deps` pour résoudre les conflits de dépendances
- Les polices Google Fonts sont configurées pour être robustes
- L'API externe peut avoir des timeouts pendant le build (non bloquant)
- Configuration optimisée pour Vercel avec headers de sécurité

## 🚨 Dépannage

### Erreur de build
```bash
npm run build
```

### Conflits de dépendances
```bash
npm install --legacy-peer-deps
```

### Problèmes de types
```bash
npm run lint
```

## 📞 Support

Pour toute question concernant le déploiement ou la configuration, consultez la documentation Vercel ou contactez l'équipe de développement.
