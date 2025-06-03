# genesis

A life simulation application or game, potentially focusing on the origins or evolution of life, or a broader life simulation. (Please update this description with specific details about the app's gameplay, scope, and unique features).

## Features
- Life simulation mechanics (e.g., birth, growth, reproduction, death)
- Environmental factors and interactions
- Evolutionary aspects (if applicable)
- Scenarios or sandbox mode
- (Add other relevant features)

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/igor-kan/genesis.git
    cd genesis
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server
To start the development server, run:
```bash
npm run dev
```
This will typically start the server on `http://localhost:5173` (for Vite) or `http://localhost:3000`.

## Technologies Used
- Vite
- React
- TypeScript
- Tailwind CSS
- (Please confirm and add other technologies used, e.g., shadcn-ui)

## Deployment (GitHub Pages)

You can deploy this project to GitHub Pages:

1. **Build the static site:**
   The output directory for Vite is usually `dist`.
    ```bash
    npm run build
    ```
2. **Install `gh-pages`:**
    ```bash
    npm install --save-dev gh-pages
    ```
3. **Update `package.json`:**
    Add `homepage` and `scripts` for deployment. The `deploy` script should point to the `dist` directory.
    ```json
    {
      "homepage": "https://igor-kan.github.io/genesis",
      "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
      }
    }
    ```
4. **Deploy:**
    ```bash
    npm run deploy
    ```

## Custom Domain
You can connect a custom domain to your deployed project. Refer to your hosting provider's documentation for instructions.
