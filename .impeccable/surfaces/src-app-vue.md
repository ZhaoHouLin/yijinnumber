---
version: 1
slug: "src-app-vue"
primary_target: "src/App.vue"
related_targets: ["src/components/PhoneNumber.vue","src/components/IDNumber.vue"]
---

# 易經數字能量：整站（算手機能量、算流年）

範圍：整個 app（兩個路由共用外框）。模式：Operate（輸入號碼 → 看結果 → 點星看說明 → 換號碼比較 → 截圖分享）。
禁區（使用者）：不要廟宇風（金紅、羅盤、八卦堆滿），不要花俏到影響閱讀。
批判參考圖：.impeccable/mocks/decision/almanac.png（使用者從 10 張樣板中選定）。

## Direction contract

THESIS：號碼印成一頁農民曆：每兩位數一欄、星名直排、左起右讀（使用者改定，和號碼與年齡同方向），吉凶像曆書的圈註一眼掃完。拒絕「輸入框＋結果卡片清單」的工具預設。

OWN-WORLD：便宜曆紙黃底、墨黑字、單一朱紅只用在外框雙線、標題、吉圈與選取；凶欄用細斜線網底而不是另一個顏色。Noto Serif TC 500/900，數字等寬。欄與欄之間是墨色細直線，沒有卡片、沒有圓角、沒有陰影；拿掉所有文字也認得出是曆書版面。

STORY：使用者打號碼，每多一組，就多一欄墨跡印上去；頂端先看到「吉 五・凶 三」，再往下讀各欄，底部的宜／忌把出現的星歸類；點欄位翻出那顆星的說明頁。流年頁同一個版面，欄寬等於管的年數。

FIRST VIEWPORT：手機 390 寬：朱紅雙線外框貼齊畫面；頂端左「易經數字能量」朱紅粗體、右側直排頁名；中央 40px 號碼輸入（就是印出來的號碼本身，只有底線）；其下吉凶小計與「零的算法」三選一圈選；再下面八到九欄直排欄位佔據主體；底部朱紅導覽列兩個分頁。主要動作（輸入）在畫面上三分之一。

FORM：自己列表的第 2 名（農民曆），使用者在看過 10 張樣板後選定；seed key 86ff0313（擲到的是第 4 名老手機液晶，使用者改選）。招牌互動：新的一組數字出現時，那一欄以墨跡暈開的方式印上（blur→清楚），吉凶圈隨後蓋上。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
