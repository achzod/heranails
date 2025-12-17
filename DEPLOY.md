# 🚀 Guide de déploiement sur Render

## Étape 1 : Créer un repo GitHub

1. Va sur [github.com](https://github.com) et crée un nouveau repository
2. Nomme-le `nailsby-hera` (ou autre nom)
3. **Ne coche PAS** "Initialize with README" (on a déjà tout)
4. Clique sur "Create repository"

## Étape 2 : Pousser le code sur GitHub

Dans ton terminal, exécute ces commandes :

```bash
cd /Users/achzod/Desktop/hera

# Remplace USERNAME par ton username GitHub
git remote add origin https://github.com/USERNAME/nailsby-hera.git
git branch -M main
git push -u origin main
```

## Étape 3 : Déployer sur Render

1. Va sur [render.com](https://render.com) et connecte-toi (ou crée un compte gratuit)
2. Clique sur **"New +"** → **"Blueprint"**
3. Connecte ton compte GitHub si ce n'est pas déjà fait
4. Sélectionne le repo `nailsby-hera`
5. Render va détecter automatiquement le fichier `render.yaml`
6. Clique sur **"Apply"**

Render va automatiquement :
- ✅ Créer un service web
- ✅ Créer un disque persistant pour les données (bookings/slots)
- ✅ Configurer les variables d'environnement
- ✅ Builder et déployer le site

## Étape 4 : Attendre le déploiement

- Le build prend environ 3-5 minutes
- Tu recevras une URL du type : `https://nailsby-hera.onrender.com`
- Le site sera en ligne ! 🎉

## 🔑 Accès Admin

Une fois déployé :
- URL admin : `https://ton-url.onrender.com/admin`
- Mot de passe : `hera2024` (à changer dans `app/admin/page.tsx` si besoin)

## 📝 Notes importantes

- Le disque persistant (`/var/data`) stocke les bookings et slots
- Les images Instagram sont déjà dans `public/instagram/` (elles seront servies automatiquement)
- Le site est prêt pour la production !

## 🆘 En cas de problème

Si le build échoue :
1. Vérifie les logs dans le dashboard Render
2. Assure-toi que `package.json` a bien les scripts `build` et `start`
3. Vérifie que `render.yaml` est bien à la racine du projet

---

**C'est tout ! Ton site sera en ligne en quelques minutes.** 🚀

