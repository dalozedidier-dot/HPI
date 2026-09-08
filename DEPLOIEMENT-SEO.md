# Déploiement SEO

La V33 est préparée comme version de production : les pages piliers sont en `index,follow`, les pages satellites qui risquent de se cannibaliser restent en `noindex,follow`, le sitemap liste uniquement les pages utiles et les canonicals pointent vers `https://www.hpitalents.com/`.

À faire au moment du basculement du domaine :
- relier le domaine final au nouvel hébergement et vérifier HTTPS ;
- mettre en place les redirections 301 listées dans `REDIRECTIONS-301.md` ;
- ajouter `https://www.hpitalents.com/sitemap.xml` dans Google Search Console ;
- connecter l'outil d'analytics retenu ;
- vérifier que l'ancien site ne reste pas accessible en doublon sans redirection.

Ne pas mettre cette version indexable en production sur `dalozedidier-dot.github.io/HPI/` avant le basculement officiel si l'ancien site doit rester canonique.
