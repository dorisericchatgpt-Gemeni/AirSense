# NTU AirSense — Real-time Air Quality Intelligence

即時空氣品質監控儀表板 demo。以 NTU 總圖 B1 為情境，視覺化呈現多個區域的 CO₂、溫度、濕度、人流密度與「讀書舒適度」評分。

> ⚠️ **目前是純前端 Demo**：所有感測數據由瀏覽器端即時「模擬生成」（`lib/sensor-data.ts`），尚未接真實感測器或後端資料庫。專案雖已安裝 `@supabase/supabase-js`，但目前頁面未實際串接，可作為日後接真實資料的擴充點。

---

## ✨ 功能 (Features)

| 區塊 | 元件 | 功能說明 |
|---|---|---|
| **頂部導覽 / 狀態列** | `Navbar` | 顯示整體空氣品質狀態（GOOD / MODERATE / BAD），即時更新 |
| **即時警示** | `AlertPanel` / `AlertSection` | CO₂ 超標自動跳出警示（>1200 critical、>800 warning）、廁所通風不良提醒 |
| **概覽英雄區** | `Hero` | 平均 CO₂、平均溫度與整體狀態的大標摘要 |
| **區域地圖** | `AirMap` | 5 個區域（A 區 / B 區 / 討論區 / 會議室 / 廁所）的空氣品質視覺化分布 |
| **趨勢儀表板** | `Dashboard` | CO₂ / 溫度 / 濕度 / 人流 隨時間變化的折線圖（Recharts） |
| **舒適度評分** | `ComfortScores` | 各區舒適度、新鮮度、專注度評分 + 推薦最適合讀書的區域 |
| **即時統計** | `LiveStats` | 各區即時數據卡片 |
| **未來願景 / 技術架構** | `FutureVision` / `TechArchitecture` | 產品規劃與技術堆疊說明 |
| **多語系** | `LanguageSwitcher` | 支援 **10 種語言**：英、繁中、簡中、日、德、西、葡、荷、俄、阿拉伯（含 RTL） |

### 評分演算法 (摘要)
數據每隔一段時間以前一筆為基準加上隨機擾動 (`jitter`) 更新，並計算：
- **空氣品質分數** = CO₂分數 ×0.5 + 濕度分數 ×0.3 + 溫度分數 ×0.2
- **舒適度** = 溫度 ×0.4 + 濕度 ×0.3 + 人流 ×0.3
- **新鮮度** = CO₂分數 ×0.7 + 濕度分數 ×0.3
- **專注度** = CO₂分數 ×0.4 + 舒適度 ×0.4 + 人流分數 ×0.2

---

## 🛠️ 技術棧 (Tech Stack)

- **框架**：Next.js 13 (App Router) + React 18 + TypeScript
- **樣式**：Tailwind CSS + shadcn/ui (Radix UI primitives)
- **圖表**：Recharts
- **動畫**：Framer Motion
- **i18n**：自製輕量 i18n provider（`lib/i18n/`）
- **(預留) 後端**：Supabase

---

## 💻 本機開發 (Local Development)

需先安裝 [Node.js](https://nodejs.org/) (建議 18+)。

```bash
# 1. 取得程式碼
git clone https://github.com/dorisericchatgpt-Gemeni/AirSense.git
cd AirSense

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev
```

打開瀏覽器到 [http://localhost:3000](http://localhost:3000) 即可看到。

其他指令：
```bash
npm run build      # 建置正式版
npm run start      # 啟動正式版伺服器
npm run lint       # ESLint 檢查
npm run typecheck  # TypeScript 型別檢查
```

---

## 🚀 上線教學：讓別人點連結就能用 (Deployment)

要讓任何人「點一個連結就能在瀏覽器使用」，最簡單的方式是把這個 GitHub repo 連到 **Vercel**（Next.js 官方平台，免費、自動部署）。完成後你會拿到一個像 `https://airsense.vercel.app` 的公開網址，分享給任何人都能直接打開。

### 🟢 方法 A：Vercel（推薦）

> 前提：程式碼已經 push 到 GitHub（本 repo 已完成 ✅）。

1. **註冊 / 登入 Vercel**
   前往 [vercel.com](https://vercel.com)，點右上角 **Sign Up**，選 **Continue with GitHub**，用你的 GitHub 帳號登入授權。

2. **匯入專案**
   登入後點 **Add New… → Project**，在清單中找到 `AirSense` repo，點 **Import**。

3. **確認設定（通常全部用預設即可）**
   - Framework Preset：Vercel 會自動偵測為 **Next.js**。
   - Build Command：`next build`（自動帶入，不用改）。
   - Output / Install：保持預設。
   - Environment Variables：目前是純前端 demo，**不需要填任何環境變數**。

4. **點 Deploy**
   等待約 1–2 分鐘建置完成。成功後 Vercel 會給你一個公開網址，例如：
   ```
   https://air-sense.vercel.app
   ```
   把這個連結分享給任何人，點開即可使用。📱 手機 / 電腦皆可。

5. **之後的更新**
   只要你 `git push` 到 GitHub 的 `main` 分支，Vercel 會**自動重新部署**，網址內容自動更新，不用做任何事。

> 💡 想換好記的網址？在 Vercel 專案的 **Settings → Domains** 可改子網域名稱，或綁定你自己的網域。

### ⚪ 方法 B：Netlify（備選）

本 repo 已內含 `netlify.toml`，所以也能用 Netlify：

1. 前往 [netlify.com](https://netlify.com) 用 GitHub 登入。
2. **Add new site → Import an existing project → GitHub**，選 `AirSense`。
3. Build command 與 publish 目錄會由 `netlify.toml` 自動帶入（`npx next build` / `.next`），Netlify 會自動套用官方 Next.js plugin。
4. 點 **Deploy**，完成後得到 `https://<your-site>.netlify.app` 公開連結。

---

## 📁 專案結構 (Project Structure)

```
AirSense/
├── app/
│   ├── layout.tsx          # 根 layout（含 metadata / i18n provider）
│   ├── page.tsx            # 唯一頁面，組合所有區塊
│   └── globals.css
├── components/
│   ├── airsense/           # 11 個 AirSense 專屬區塊元件
│   └── ui/                 # shadcn/ui 元件
├── hooks/
│   └── use-sensor-data.ts  # 驅動即時模擬數據的 hook
├── lib/
│   ├── sensor-data.ts      # 模擬數據生成 + 評分演算法
│   ├── utils.ts
│   └── i18n/               # 多語系（10 種語言）
├── netlify.toml            # Netlify 部署設定
└── next.config.js
```

---

## 🗺️ 未來擴充方向 (Roadmap)

- [ ] 串接 Supabase，把模擬數據換成真實感測器資料
- [ ] 接入實體 CO₂ / 溫濕度感測器（IoT）
- [ ] 歷史數據儲存與長期趨勢分析
- [ ] 警示推播通知

---

## 🙏 出處與致謝 (Credits & Attribution)

本專案改作自 **[Ptorioo/AirSense](https://github.com/Ptorioo/AirSense)**。
原始專案由 [@Ptorioo](https://github.com/Ptorioo) 開發，本 repo 在其基礎上進行修改與擴充（例如新增 10 種語言的多語系切換等）。感謝原作者的開源貢獻。

> This project is adapted from [Ptorioo/AirSense](https://github.com/Ptorioo/AirSense), originally created by [@Ptorioo](https://github.com/Ptorioo). Many thanks to the original author for open-sourcing the work.

## 📄 授權 (License)

本專案為 demo / 作品集 / 學習用途。