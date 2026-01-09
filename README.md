# Envelope Multi-Page Demo

Demo single-page app demonstrating the requested flow: login -> envelope animation -> photo capture/upload -> flip cards.

How to run
- Open `d:/Compilot/index.html` in a modern browser (Chrome, Edge, or Firefox). For camera access, use a secure context (localhost or HTTPS). To run a quick local static server you can use the included npm script or any static server.

Notes & assumptions
- Demo PIN: `1234` (change in `app.js` at `DEMO_PWD`).
- Camera uses `getUserMedia` and will be unavailable on older browsers or without permissions; file upload is available as fallback.
- When 6 photos are taken, the app auto-navigates to the flip page with 3 allowed cards. If the user has 4–5 photos and clicks "Hoàn tất", they go to the flip page with 1 allowed card.

Files
- `index.html` — main UI
- `styles.css` — styles and phone frame
- `app.js` — page logic

Features added
- Numeric PIN keypad for login (0–9, C = clear, ← = delete 1 char).
- Centered UI within a phone frame.
- Flip page always shows 3 cards. You can assign any captured photo to any card by clicking a thumbnail below the card. Only the allowed number of cards (1 or 3) can be flipped; locked cards show a small shake when clicked.

Deploy to GitHub Pages
1. Create a GitHub repository and push this folder's contents.
2. In the repo Settings → Pages, choose branch `main` (or the branch you pushed) and root `/` as the folder, then Save.
3. GitHub will host the static site; the entry point is `index.html`.

Quick local run (requires Node/npm)
```powershell
npm install --global http-server  # optional
npm run start
# open http://localhost:8080 in your browser
```

If you want, tôi có thể:
- Lưu ảnh vào localStorage để không mất khi bấm "Quay lại".
- Thêm nút gán nhanh (auto-assign) để gán ảnh theo thứ tự cho các thẻ.
- Giữ ảnh khi bấm "Quay lại" thay vì xóa.
