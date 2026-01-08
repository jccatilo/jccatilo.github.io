# Deploying to GitHub Pages

This guide will help you deploy your portfolio to GitHub Pages.

## Option 1: Using GitHub Actions (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/jc-portfolio-2026.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Update the base path in `vite.config.js`:**
   - If your repository name is different from `jc-portfolio-2026`, update the `base` property in `vite.config.js`
   - For example, if your repo is `my-portfolio`, change it to: `base: '/my-portfolio/'`
   - If deploying to your user page (username.github.io), set `base: '/'`

4. **Push your changes:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push
   ```

5. **Wait for deployment:**
   - GitHub Actions will automatically build and deploy your site
   - Check the **Actions** tab in your repository to see the deployment progress
   - Your site will be available at: `https://YOUR_USERNAME.github.io/jc-portfolio-2026/`

## Option 2: Using gh-pages (Manual)

1. **Install gh-pages:**
   ```bash
   npm install
   ```

2. **Build and deploy:**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select **gh-pages** branch and **/ (root)** folder
   - Click **Save**

4. **Update base path:**
   - Make sure the `base` in `vite.config.js` matches your repository name
   - For user pages (username.github.io), set `base: '/'`

## Important Notes

- **Repository name matters:** If your repository is named differently, update the `base` in `vite.config.js`
- **User/organization pages:** If deploying to `username.github.io`, set `base: '/'` in `vite.config.js`
- **Project pages:** If deploying to `username.github.io/repo-name`, set `base: '/repo-name/'`

## Troubleshooting

- **404 errors:** Make sure the `base` path in `vite.config.js` matches your repository name
- **Blank page:** Check browser console for errors, ensure all assets are loading correctly
- **Build fails:** Check the Actions tab for error messages
