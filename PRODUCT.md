# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
主要：對自己或親友號碼好奇、隨手測著玩的人。
其次：要辦新門號、比較幾組候選號碼吉凶的人；想快速排盤跟別人解說的命理同好或老師；把它當作者作品集來看的面試官與同行。
手機與桌機都是主要使用情境。

## Product Purpose
「易經數字能量」用數字易經規則解讀號碼。手機號碼拆成八星（伏位、天醫、生氣、延年、絕命、五鬼、六煞、禍害），附吉凶與能量等級；身分證字號換算成流年，顯示每顆星管哪個年齡區間（虛歲）。
成功的樣子：打完號碼立刻看懂結果，點星名就能看它的意思。

## Positioning
邊打邊算，不用按送出。0 的處理各派說法不同，讓使用者自己選流派（`zeroRule`：standard／keepDouble／skipMiddle），不偷偷替他決定。流年依每組在號碼中的原始位置計算，走完一輪後從頭再排一次（預設收合）。

## Operating Context
兩個頁面：算手機能量（`/PhoneNumber`）、算流年（`/IDNumber`）。部署在 GitHub Pages 的 `/yijinnumber/` 底下。介面為繁體中文（zh-Hant）。

## Capabilities and Constraints
- Vue 3 + Vite，模板用 pug、樣式用 stylus。計算邏輯在 `src/yijing.js` 並有測試；設計調整不能改變計算結果。
- 八星說明 `src/starInfo.js` 是作者整理的常見說法，不是權威出處。
- 使用者決定不加準確度免責聲明。
- 輸入：手機最多 10 碼；身分證為 1 個英文字母＋9 碼數字（字母 A=01 … Z=26）。

## Brand Commitments
名稱「易經數字能量」。除此之外沒有視覺上的承諾，現有外觀可以整個換掉。
使用者明確不要：太像算命廟宇風（金紅、羅盤、八卦堆滿），也不要花俏到影響閱讀。

## Evidence on Hand
沒有使用者見證、使用人數或準確度數據，不得捏造。舊版介面截圖在 `demo/`。

## Product Principles
1. 結果是主角：號碼輸入，解讀立刻出來。
2. 標明用的是哪個流派，不宣稱哪派才對。
3. 每顆星一點就能看到意思。
4. 手機和桌機一樣好用。

