# Construction Digital Hub

A mobile-first static GitHub Pages prototype for a construction project digital hub.

## UX concept

The hub is deliberately simple:

1. **IT Helpdesk** — raise a ticket when something is not working.
2. **Apps & Systems** — find and open the digital tools used on the project.
3. **Training** — learn how to use those digital tools.

There is **no hub login**. Authentication is introduced only after a user selects a system or starts a training course.

Each system also has a contextual **“How to use [system]”** link, so users do not have to understand where training is stored.

## Files

- `index.html` — page shell
- `styles.css` — responsive visual design
- `app.js` — screens, navigation and prototype interactions
- `assets/` — optional project assets

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Open the generated GitHub Pages URL.

## Before production

Replace the demo actions with real services:

- IT Helpdesk → your ticketing system/API
- Apps & Systems → real application URLs / SSO
- Training → real training platform URLs / SSO
- Replace demo sign-in modal with the organisation's approved authentication flow
- Add project-specific systems and training
- Generate a QR code pointing to the final GitHub Pages/custom-domain URL

## Branding

The visual system lightly uses the Bouygues Travaux Publics / Murphy palette visible in the supplied reference: dark green, warm orange, cream and restrained supporting colours. It intentionally avoids making the interface feel like a corporate brochure.
