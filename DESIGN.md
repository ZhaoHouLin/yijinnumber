---
name: 易經數字能量
description: 把號碼印成一頁農民曆：每兩位數一欄、星名直排、右起左讀，吉凶用圈註一眼掃完。
colors:
  almanac-paper: "#efe3b4"
  almanac-paper-deep: "#e4d49c"
  ink: "#1b1b1b"
  ink-faded: "#5b4f3a"
  cinnabar: "#b01e23"
  cinnabar-deep: "#8c1519"
  cinnabar-tint: "#f6d9d9"
typography:
  display:
    fontFamily: "'Noto Serif TC', 'Noto Serif CJK TC', 'PMingLiU', serif"
    fontSize: "1.6rem"
    fontWeight: 900
    letterSpacing: "0.25em"
  numeral:
    fontFamily: "'Noto Serif TC', 'Noto Serif CJK TC', 'PMingLiU', serif"
    fontSize: "2.25rem"
    fontWeight: 900
    letterSpacing: "0.12em"
    fontFeature: "tnum"
  headline:
    fontFamily: "'Noto Serif TC', 'Noto Serif CJK TC', 'PMingLiU', serif"
    fontSize: "1.8rem"
    fontWeight: 900
    letterSpacing: "0.2em"
  title:
    fontFamily: "'Noto Serif TC', 'Noto Serif CJK TC', 'PMingLiU', serif"
    fontSize: "1.5rem"
    fontWeight: 900
    letterSpacing: "0.35em"
  body:
    fontFamily: "'Noto Serif TC', 'Noto Serif CJK TC', 'PMingLiU', serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.7
    fontFeature: "tnum"
  label:
    fontFamily: "'Noto Serif TC', 'Noto Serif CJK TC', 'PMingLiU', serif"
    fontSize: "0.8rem"
    fontWeight: 500
rounded:
  none: "0"
  ring: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
components:
  number-input:
    textColor: "{colors.ink}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
    padding: "4px 0"
    width: "100%"
  almanac-column:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "8px 0 10px"
    height: "240px"
  ring-mark-lucky:
    textColor: "{colors.cinnabar}"
    rounded: "{rounded.ring}"
    size: "1.9em"
  ring-mark-unlucky:
    textColor: "{colors.ink}"
    rounded: "{rounded.ring}"
    size: "1.9em"
  verdict-stamp:
    backgroundColor: "{colors.cinnabar}"
    textColor: "{colors.almanac-paper}"
    rounded: "{rounded.none}"
    size: "1.6em"
  zero-rule-option:
    textColor: "{colors.ink-faded}"
    rounded: "{rounded.ring}"
    padding: "6px 10px"
  zero-rule-option-selected:
    textColor: "{colors.ink}"
    rounded: "{rounded.ring}"
    padding: "6px 10px"
  tab:
    backgroundColor: "{colors.cinnabar}"
    textColor: "{colors.cinnabar-tint}"
    rounded: "{rounded.none}"
    height: "56px"
  tab-active:
    backgroundColor: "{colors.cinnabar-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    height: "56px"
  star-card:
    backgroundColor: "{colors.almanac-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "18px 20px 20px"
    width: "360px"
---

# Design System: 易經數字能量

## Overview

**Creative North Star: "一頁農民曆"**

整個介面是一張便宜的曆紙：黃底、墨黑字、一支朱筆。號碼不是填進表單再吐出卡片清單，而是直接印在紙上，每兩位數成為一欄，星名直排、欄由右往左讀，吉凶像曆書上的朱圈與墨圈。拿掉所有文字，仍然認得出這是曆書版面：雙線外框、墨色細直欄線、斜線網底的凶欄、底部的宜／忌。

密度偏高但不擁擠：一屏內放完輸入、吉凶小計、流派選擇與八到九欄結果。裝飾全部來自印刷語彙（雙線、細線、網底、圈註、朱印），沒有卡片、沒有陰影、沒有漸層色塊。使用者明確拒絕廟宇風（金紅、羅盤、八卦堆滿）與影響閱讀的花俏，所以朱紅只有一種、沒有金色，也沒有任何吉祥圖騰。

**Key Characteristics:**
- 曆紙黃底 + 墨黑 + 單一朱紅，三色就是全部
- 欄位式版面：每組號碼一欄，右起左讀，星名直排
- 吉用朱圈、凶用墨圈加斜線網底，不靠第二個色相分吉凶
- 直角、細線、雙線外框；圓形只出現在「圈註」
- 全站一套宋體（Noto Serif TC 500/900），數字等寬

## Colors

一張曆紙、一瓶墨、一支朱筆；沒有第四種角色色。

### Primary
- **朱砂紅 Cinnabar** (cinnabar)：外框雙線、刊頭標題與其下橫線、吉圈、吉凶小計的數字、宜／忌朱印、選取的流派圈、底部導覽列底色、焦點外框、文字選取底色、說明卡的關鍵詞與連結。
- **深朱 Cinnabar Deep** (cinnabar-deep)：朱紅元素的按下／目前狀態：導覽列 hover 與目前分頁、連結 hover。
- **朱底淡字 Cinnabar Tint** (cinnabar-tint)：只用在朱紅導覽列上未選取分頁的文字。

### Neutral
- **曆紙黃 Almanac Paper** (almanac-paper)：全站底色、說明卡底色、朱印上的反白字。
- **深曆紙 Almanac Paper Deep** (almanac-paper-deep)：捲軸軌道。
- **墨黑 Ink** (ink)：正文、號碼、星名、欄線、凶圈、號碼輸入底線。
- **褪墨 Ink Faded** (ink-faded)：次要文字：placeholder、能量等級、提示、未選流派、空狀態、「隱」圈。

### Named Rules
**The One Cinnabar Rule.** 只有一種紅（加上它的深色狀態）。不加金色、不加第二個強調色；需要區分時用墨與網底，不用新色相。

**The Ink-Not-Color Rule.** 凶不是另一個顏色：凶欄是墨圈加 135° 細斜線網底（ink 8% 不透明，每 7px 一條 1px 線）。

## Typography

**Display Font:** Noto Serif TC（後備 Noto Serif CJK TC、PMingLiU、serif），以 @fontsource 自架 500 與 900 兩個字重
**Body Font:** 同上
**Label/Mono Font:** 同上；全站 `font-variant-numeric: tabular-nums`

**Character:** 一套宋體只用兩個字重，像鉛字印刷：900 是印上去的重墨，500 是說明小字。層級靠字重、字距與直排建立，不靠換字體。

### Hierarchy
- **Display**（900，1.6rem，桌機 2rem，字距 0.25em，朱紅）：刊頭「易經數字能量」。頁名同為 900，直排、字距 0.15em，左側一條朱色細線。
- **Numeral**（900，2.25rem，字距 0.12em，置中，大寫）：號碼輸入本身，就是印出來的號碼。
- **Headline**（900，1.8rem，字距 0.2em）：說明卡上的星名。
- **Title**（900，1.5rem，桌機 1.8rem，字距 0.35em，直排）：欄位中的星名。欄頂的兩位數為 900、1.05rem。
- **Body**（500，1rem；說明卡行高 1.7）：吉凶小計、宜忌（0.9rem）、說明內文。
- **Label**（500，0.75–0.85rem，褪墨色）：能量等級、年齡、提示、註記、說明卡 meta。

### Named Rules
**The Two Weights Rule.** 只用 500 與 900。強調就是 900，不出現 600/700 的中間值。

**The Vertical Name Rule.** 星名與頁名直排（`writing-mode: vertical-rl`），號碼與數字橫排。

## Layout

單欄紙張：`.sheet` 最大寬 760px 置中，手機外距 8px、內距 12px 12px 16px；800px 以上頂部留 32px，內距 20px 28px 32px。紙張撐滿可視高度（100dvh），結果欄區塊以 flex-grow 吃掉剩餘空間，欄高至少 240px（桌機 280px）。

結果是一列等寬欄（`flex-direction: row-reverse`，右起左讀），欄間 1px 墨線，上緣 2px 墨線、下緣 1px。流年頁的欄寬等於該組管的年數（flex-grow = 年數）；599px 以下圈註一起縮小以維持水平對齊。空狀態也畫出九欄淡墨格線（ink 18%），讓版面在輸入前就已經是曆書。

導覽列固定在畫面底部（sticky），兩個分頁平分寬度、高 56px，含 safe-area 內距；桌機時與紙張同寬。

間距節奏以 4px 為底：4 / 8 / 12 / 16 / 20，元素間多用 8–14px 的小間距，大的分隔交給線條而不是留白。

## Elevation & Depth

完全平面，沒有任何 box-shadow。深度只靠印刷手段：雙線外框框出紙張、粗細不同的墨線分層、凶欄網底、朱印實心塊。唯一的「浮起」是說明卡：原生 `<dialog>`，背後蓋一層 ink 45% 的遮罩，卡片本身仍無陰影，只有 3px 朱紅雙線框。

### Named Rules
**The Printed-Not-Lifted Rule.** 層次用線與網底表達，不用陰影；需要聚焦時用遮罩壓暗背景，而不是讓物件浮起。

## Shapes

直角是預設：紙張、欄、輸入、導覽、說明卡、朱印都沒有圓角。線條語彙是 3px 雙線（外框、說明卡）、2px 實線（刊頭下線、欄區上緣、輸入底線）、1px 細線（欄間、分組）。圓形只屬於「圈註」：吉凶圈（2px）、「隱」圈（1px 褪墨）、被選中的流派（2px 朱紅橢圓）。

### Named Rules
**The Only-Rings-Are-Round Rule.** 50% 圓角只給圈註使用，表示「用筆圈起來」；任何容器或按鈕都不得帶圓角。

## Components

### 號碼輸入 Number Input
像印好的號碼，不像表單欄位。
- **Style：** 無框、無底色，只有 2px 墨色底線；Numeral 字級置中。placeholder 降為 500、1.25rem、褪墨色。
- **Focus：** 底線轉為朱紅，不加外框；插入游標為朱紅。

### 曆欄 Almanac Column
招牌元件。每欄是一顆可點的按鈕，由上到下：兩位數（下有 1px 墨線）、直排星名、「隱」圈（如有）、能量等級、年齡區間（流年頁）、吉凶圈。
- **吉：** 曆紙底、朱圈；hover 時鋪 cinnabar 8% 淡底。
- **凶：** 斜線網底、墨圈；hover 時鋪 ink 6% 淡底。
- **進場：** 新的一欄由模糊（blur 4px、透明）0.5s 印清楚，吉凶圈延遲 0.2s 以 scale 1.6→1 蓋下（cubic-bezier(0.16, 1, 0.3, 1)）。`prefers-reduced-motion` 時關閉。

### 圈註 Ring Mark
- **Style：** 50% 圓、2px 框、字色同框色；吉為朱、凶為墨，尺寸 1.9em（說明卡 2em）。

### 宜忌朱印 Verdict Stamp
- **Style：** 1.6em 方形實心朱紅，曆紙色 900 字，後接該類星名清單。

### 流派圈選 Zero Rule (Chips)
- **Style：** 文字選項，無底無框，褪墨色。
- **State：** 選中時以 2px 朱紅橢圓圈起、字轉墨色 900；鍵盤焦點為 2px 朱紅外框。

### 底部導覽 Navigation
- **Style：** 整條朱紅實底、直角，分頁平分寬度、高 56px，字 1.05rem、字距 0.1em。
- **State：** 未選取為 cinnabar-tint 字；hover 與目前分頁為深朱底，目前分頁白字 900。焦點外框改為曆紙色、內縮 6px。

### 說明卡 Star Card
- **Style：** 原生 `<dialog>`，最大寬 360px，曆紙底、3px 朱紅雙線框、直角；刊頭為星名＋圈註＋44px 關閉鈕（內嵌 SVG 叉號），下接 2px 朱線。
- **內容：** meta 小字、朱紅 900 關鍵詞、內文、1px 墨線分隔的優缺點對照、朱紅連結。
- **進場：** 0.3s 由下 8px 淡入；點遮罩可關閉。

### 展開列 Disclosure
- **Style：** 流年第二輪用 `<details>`；summary 為 900 字、最小高 44px，前置 CSS 繪製的朱紅三角，展開時旋轉 90°。

## Do's and Don'ts

### Do:
- **Do** 只用三種顏色角色：曆紙、墨、朱（含深朱狀態）。
- **Do** 用 135° 細斜線網底 + 墨圈表示凶，不用新色相。
- **Do** 把結果排成欄、右起左讀、星名直排。
- **Do** 用線條分隔層次：3px 雙線、2px、1px 三級。
- **Do** 只用 Noto Serif TC 的 500 與 900，數字等寬。
- **Do** 互動元素至少 44px 高（關閉鈕、展開列；導覽 56px）。
- **Do** 所有動態提供 `prefers-reduced-motion` 關閉路徑。

### Don't:
- **Don't** 加金色、羅盤、八卦或其他廟宇裝飾（使用者明確拒絕）。
- **Don't** 用 box-shadow 或漸層製造浮起感。
- **Don't** 給容器、輸入或按鈕圓角；圓形只屬於圈註。
- **Don't** 把結果做成卡片清單或給號碼輸入加外框。
- **Don't** 加入第二套字體或 600/700 字重。
