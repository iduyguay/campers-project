# Campers Project

Desktop camper rental frontend based on the supplied TravelTrucks design. This repository is currently at stage 2 and is not a completed application.

## Current stage

- Vite and React project setup.
- Desktop home banner and shared navigation.
- GitHub and LinkedIn profile links.
- React Router routes for Home and Catalog.
- Camper catalog connected to the assignment API.
- Redux state for listings, filters and favorites.
- Server-side location, vehicle and equipment filters.
- Load more pagination, loading, retry and empty states.
- Favorites saved across page reloads.
- Detail links open a temporary development page in a new tab.

## Next stages

Camper details, photo gallery, vehicle information, reviews, booking form and deployment will be completed in stage 3.

The assignment API is `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`. Filtering and pagination are performed through API requests.

## Run locally

Use Node.js 20.19+ or a current supported LTS release.

```sh
npm ci
npm run dev
```

```sh
npm run verify
npm run lint
npm run build
npm run preview
```

## Links

- Repository: [iduyguay/campers-project](https://github.com/iduyguay/campers-project)
- Live website: not deployed yet.
- [GitHub profile](https://github.com/iduyguay)
- [LinkedIn](https://www.linkedin.com/in/ipekduyguay/)

## Author and credits

Adaptation: **İpek Duygu Aykaş**.

Adapted from [neoversity-woolf/travel-trucks-app](https://github.com/neoversity-woolf/travel-trucks-app). Original author: yaroslav.kosytsia (2024). The original MIT license is preserved in `LICENSE`.
