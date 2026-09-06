# DOS CLASSIC GAMES — Retro DOS Web Platform

「1990～2000 年代 DOS 經典遊戲 Web 平台」— Phase 1(網站架構)。

> The platform is designed for legally obtained classic DOS software and games.

## Phase 1(本版)
- `index.html` — Retro DOS 首頁(Header / DOS Emulator Container / Available Games / Footer)
- `style.css` — Windows 95/98 + MS-DOS 風格(bevel 框、深藍標題列、CRT 輕量 scanline)
- `js/i18n.js` + `js/main.js` — 三語切換(繁體中文 / English / Español)
- `games/games.json` — 遊戲清單設定(資料驅動,未來新增遊戲只需加此檔 + `/games/<id>/` 檔案)
- `robots.txt`、`sitemap.xml`、SEO/OG meta

## 開發階段(依規格)
1. ✅ 網站骨架 + Game List + games.json
2. ⏳ 整合 Browser DOS Emulator(js-dos / DOSBox WASM 擇一,本版未整合)
3. ⏳ 讓「楚漢相爭」以原版 DOS 檔啟動(檔案須具合法授權)
4. ⏳ Fullscreen / Sound / Reset / Pause / CRT Effect
5. ⏳ Chrome / Edge / Firefox 測試、Responsive、效能

## 遊戲檔案原則
- 遊戲維持原始 DOS 程式,不重寫、不轉 HTML5、不反編譯。
- 本 repo 目前**不含**任何遊戲 EXE/資料檔;加入前需確認合法使用權。

## 本地執行
```
cd D:\VS CODE\PROJECT\weboldgame
python -m http.server 8000
```
開啟 http://127.0.0.1:8000/
