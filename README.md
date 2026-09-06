# weboldgame — 楚漢之爭 老遊戲網站(1990–2000 風格)

三語網站骨架:繁體中文 / English / Español。

## 頁面
- `index.html` 首頁(標題/導覽/遊戲分類/簡介/網站資訊/Footer)
- `categories.html` 遊戲分類(8 類,皆 0 款,顯示「尚未加入遊戲」)
- `about.html` 關於本站

## 三語切換
`i18n.js`(字典)+ `main.js`(套用 + localStorage 記憶)。點擊頁面右上語系即可切換。

## 風格
依提示詞:1990–2000 早期網站感(固定寬度 800px、table 排版、細框線、小字、
文字密集、深底 tile 背景、文字超連結),不使用現代 UI(Card/Hero/Rounded/Gradient)。

## 架構規劃
- 第一階段(本版):網站骨架 + 三語,未放任何遊戲。
- 後續:每款遊戲於對應分類加入介紹頁,再視需要提供執行說明。

## 執行
```
cd D:\VS CODE\PROJECT\weboldgame
python -m http.server 8000
```
開啟 http://127.0.0.1:8000/
