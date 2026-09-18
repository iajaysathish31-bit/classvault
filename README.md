# ClassVault

A React + Tailwind CSS implementation of the ClassVault design (Landing, Login,
Sign up, Dashboard, Profile) built to match the Figma screens.

## Run it locally in VS Code

1. Unzip this project and open the folder in VS Code (`File > Open Folder`).
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``).
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open the URL shown in the terminal — usually **http://localhost:5173**.

## Pages

| Route        | Page                     |
|--------------|--------------------------|
| `/`          | Landing page             |
| `/login`     | Login                    |
| `/signup`    | Sign up (student/teacher)|
| `/dashboard` | Dashboard                |
| `/profile`   | User profile             |

Logging in or signing up (with any values) navigates to `/dashboard`. The
sidebar's "Log out" link returns to the landing page.

## Tech stack

- React 18 + Vite
- React Router
- Tailwind CSS
- lucide-react icons

## Notes

- All data (classes, uploads, deadlines, profile info) is hardcoded sample
  data matching the design — wire it up to a real backend/API when you're
  ready.
- Colors and fonts (Inter + Lora) are set in `tailwind.config.js` and
  `index.html` to match the ClassVault brand from the screenshots.
