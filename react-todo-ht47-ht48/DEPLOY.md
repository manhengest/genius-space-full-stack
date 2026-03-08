# Deploying to Render.com

This app is configured for Render with two services: a **Web Service** (API) and a **Static Site** (frontend).

## Option 1: Blueprint (render.yaml)

1. Push this repo to GitHub/GitLab.
2. In [Render Dashboard](https://dashboard.render.com), click **New** → **Blueprint**.
3. Connect your repo and select the branch.
4. Render will detect `render.yaml`. Click **Apply**.
5. **Important:** After the API deploys, copy its URL (e.g. `https://react-todo-api.onrender.com`).
6. In the **react-todo-app** service → **Environment**, add:
   - `VITE_API_URL` = `https://react-todo-api.onrender.com` (your actual API URL)
7. Trigger a **Manual Deploy** on the frontend so it rebuilds with the correct API URL.

## Option 2: Manual setup

### Backend (Web Service)

1. **New** → **Web Service**
2. Connect repo, set:
   - **Root Directory:** `react-todo-ht47-ht48` (required for monorepo)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
3. Deploy and copy the service URL.

### Frontend (Static Site)

1. **New** → **Static Site**
2. Connect the same repo, set:
   - **Root Directory:** `react-todo-ht47-ht48` (required for monorepo)
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variable:** `VITE_API_URL` = your backend URL (e.g. `https://react-todo-api.onrender.com`)
3. Deploy.

## Local development

- **Frontend:** `npm run dev`
- **API:** `npm run server` (runs json-server on port 3030)

No env vars needed locally — defaults to `http://localhost:3030`.
