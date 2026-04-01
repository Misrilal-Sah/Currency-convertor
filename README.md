<div align="center">

<img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&customColorList=0,2,24,25&height=200&section=header&text=💱%20CurrencyX&fontSize=72&fontAlignY=48&desc=Premium%20Currency%20Converter%20•%20Real-Time%20Exchange%20Rates&descSize=17&descAlignY=73&fontColor=ffffff&stroke=ffffff&strokeWidth=0" alt="CurrencyX"/>

<br/>

[![Version](https://img.shields.io/badge/Version-1.3.0-6366f1?style=for-the-badge&logo=semver&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-ec4899?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

<br/>

[![Currencies](https://img.shields.io/badge/🌍%20Currencies-150%2B-14b8a6?style=flat-square)](#-supported-currencies)
[![API](https://img.shields.io/badge/⚡%20API-Open%20Exchange%20Rates-22c55e?style=flat-square)](https://open.er-api.com)
[![Cache](https://img.shields.io/badge/💾%20Cache-10%20Minutes-f59e0b?style=flat-square)](#-api-integration)
[![Dark Mode](https://img.shields.io/badge/🌙%20Dark%20Mode-Supported-0f172a?style=flat-square)](#)
[![Responsive](https://img.shields.io/badge/📱%20Responsive-Mobile%20First-6366f1?style=flat-square)](#)

<br/>

> *Convert any currency, instantly — with a glassmorphism UI, dual-theme support, smart favorites, and live exchange rates from dual redundant APIs.*

</div>

<br/>

---

## ✦ Features at a Glance

<div align="center">

<table>
<tr>
<td align="center" width="33%">

### ⚡ Real-Time Rates
Live exchange rates via Open Exchange Rates API with an automatic **10-minute cache** and seamless fallback to a secondary API — always fresh, always available.

</td>
<td align="center" width="33%">

### 🌍 150+ Currencies
Covers all major, minor, and emerging-market currencies — from **USD, EUR, GBP** to **KWD, BDT, UGX** — with native flag emojis and currency symbols.

</td>
<td align="center" width="33%">

### 🎨 Glassmorphism UI
Frosted-glass cards, floating-blob background, silky transitions, and a **micro-interaction** on every click — light and dark themes included.

</td>
</tr>
<tr>
<td align="center" width="33%">

### 🌓 Dual Themes
Toggle between **light and dark mode** with one click. Theme preference is persisted in `localStorage` and restored automatically on next visit.

</td>
<td align="center" width="33%">

### ⭐ Smart Favorites
Bookmark up to **10 currency pairs** for instant one-click access. Add the current pair or remove any saved pair with a single tap.

</td>
<td align="center" width="33%">

### 📊 Conversion History
Your last **15 conversions** are tracked automatically — timestamp, currencies, and result — so you can always look back.

</td>
</tr>
<tr>
<td align="center" width="33%">

### 🔁 Instant Swap
Reverse *From ↔ To* currencies with a satisfying animated flip. Also triggered by the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>S</kbd>.

</td>
<td align="center" width="33%">

### ⚡ Quick Amounts
One-click preset buttons — **100 · 500 · 1K · 5K · 10K** — set the amount instantly, no typing required.

</td>
<td align="center" width="33%">

### 📱 Fully Responsive
Pixel-perfect across **mobile, tablet, and desktop**. Built CSS-first with Flexbox and Grid, designed mobile-first.

</td>
</tr>
</table>

</div>

---

## 🚀 Quick Start

**Zero dependencies. Zero build tools. Just open and go.**

```bash
# 1 — Clone the repository
git clone https://github.com/Misrilal-Sah/currency-converter.git
cd currency-converter

# 2 — Launch a local server (pick any option)
python -m http.server 8080     # Python
npx serve .                    # Node.js
npx live-server                # Live reload
start index.html               # Windows — open directly
open  index.html               # macOS  — open directly
```

Then visit **`http://localhost:8080`** in your browser.

---

## 🎯 How to Use

| Step | Action | Detail |
|:----:|--------|--------|
| **1** | **Enter Amount** | Type any number — results update as you type (debounced 300 ms) |
| **2** | **Select Currencies** | Pick *From* and *To* from 150+ currencies with flag previews |
| **3** | **Convert** | Hit **Convert** or press <kbd>Enter</kbd> — live rate shown below |
| **4** | **Swap** | Click **⇄** or press <kbd>Ctrl</kbd>+<kbd>S</kbd> to reverse direction |
| **5** | **Quick Amounts** | Tap **100 / 500 / 1K / 5K / 10K** to set amount instantly |
| **6** | **Favorites** | Click **+ Add Current** to save a pair; click any saved pair to load it |
| **7** | **Toggle Theme** | Click **☀️ / 🌙** in the header to switch light ↔ dark |

---

## ⌨️ Keyboard Shortcuts

<div align="center">

| Key | Action |
|:---:|--------|
| <kbd>Enter</kbd> | Trigger conversion |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Swap currencies |

</div>

---

## 📡 API Integration

CurrencyX uses a **dual-API resilience strategy** — if the primary endpoint fails, the fallback kicks in transparently, and all rates are cached locally for 10 minutes.

```
  ┌──────────────────────────────────────────────────────┐
  │                  fetchExchangeRates()                │
  └──────────────────────┬───────────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   localStorage      │  Hit? → Return cached rates
              │   Cache (10 min)    │  Miss? → Fetch from API
              └──────────┬──────────┘
                         │ Miss
              ┌──────────▼──────────┐
              │   Primary API       │  open.er-api.com/v6/latest/
              └──────────┬──────────┘
                  ✗ Fail │ ✓ OK → Parse & Cache
              ┌──────────▼──────────┐
              │   Fallback API      │  api.exchangerate-api.com/v4/latest/
              └──────────┬──────────┘
                         │ ✓ OK → Parse & Cache
              ┌──────────▼──────────┐
              │   Update UI         │  Rate, result, timestamp
              └─────────────────────┘
```

| Property | Value |
|----------|-------|
| Primary API | `open.er-api.com/v6/latest/{BASE}` |
| Fallback API | `api.exchangerate-api.com/v4/latest/{BASE}` |
| Cache Storage | `localStorage` (key-prefixed `currencyX_*`) |
| Cache TTL | 10 minutes |
| Debounce Delay | 300 ms on input |
| Request Strategy | `fetch()` with `async / await` |

---

## 🌍 Supported Currencies

<details>
<summary><b>Click to expand — 60+ currencies listed</b></summary>

<br/>

| Flag | Code | Currency | Flag | Code | Currency |
|:----:|:----:|----------|:----:|:----:|----------|
| 🇺🇸 | USD | US Dollar | 🇪🇺 | EUR | Euro |
| 🇬🇧 | GBP | British Pound | 🇯🇵 | JPY | Japanese Yen |
| 🇮🇳 | INR | Indian Rupee | 🇦🇺 | AUD | Australian Dollar |
| 🇨🇦 | CAD | Canadian Dollar | 🇨🇭 | CHF | Swiss Franc |
| 🇨🇳 | CNY | Chinese Yuan | 🇸🇬 | SGD | Singapore Dollar |
| 🇭🇰 | HKD | Hong Kong Dollar | 🇳🇿 | NZD | New Zealand Dollar |
| 🇳🇴 | NOK | Norwegian Krone | 🇸🇪 | SEK | Swedish Krona |
| 🇩🇰 | DKK | Danish Krone | 🇰🇷 | KRW | South Korean Won |
| 🇧🇷 | BRL | Brazilian Real | 🇲🇽 | MXN | Mexican Peso |
| 🇿🇦 | ZAR | South African Rand | 🇹🇷 | TRY | Turkish Lira |
| 🇵🇱 | PLN | Polish Zloty | 🇹🇭 | THB | Thai Baht |
| 🇮🇩 | IDR | Indonesian Rupiah | 🇲🇾 | MYR | Malaysian Ringgit |
| 🇵🇭 | PHP | Philippine Peso | 🇦🇪 | AED | UAE Dirham |
| 🇸🇦 | SAR | Saudi Riyal | 🇶🇦 | QAR | Qatari Riyal |
| 🇰🇼 | KWD | Kuwaiti Dinar | 🇧🇭 | BHD | Bahraini Dinar |
| 🇴🇲 | OMR | Omani Rial | 🇯🇴 | JOD | Jordanian Dinar |
| 🇵🇰 | PKR | Pakistani Rupee | 🇧🇩 | BDT | Bangladeshi Taka |
| 🇳🇬 | NGN | Nigerian Naira | 🇪🇬 | EGP | Egyptian Pound |
| 🇻🇳 | VND | Vietnamese Dong | 🇲🇦 | MAD | Moroccan Dirham |
| 🇺🇦 | UAH | Ukrainian Hryvnia | 🇷🇺 | RUB | Russian Ruble |
| 🇨🇿 | CZK | Czech Koruna | 🇭🇺 | HUF | Hungarian Forint |
| 🇷🇴 | RON | Romanian Leu | 🇧🇬 | BGN | Bulgarian Lev |
| 🇮🇱 | ILS | Israeli Shekel | 🇳🇵 | NPR | Nepalese Rupee |
| 🇱🇰 | LKR | Sri Lankan Rupee | 🇲🇲 | MMK | Myanmar Kyat |
| 🇰🇪 | KES | Kenyan Shilling | 🇹🇿 | TZS | Tanzanian Shilling |
| 🇺🇬 | UGX | Ugandan Shilling | 🇬🇭 | GHS | Ghanaian Cedi |
| 🇦🇷 | ARS | Argentine Peso | 🇨🇱 | CLP | Chilean Peso |
| 🇨🇴 | COP | Colombian Peso | 🇵🇪 | PEN | Peruvian Sol |
| 🇹🇼 | TWD | Taiwan Dollar | 🇮🇸 | ISK | Icelandic Krona |

*…and 90+ more covered via the exchange rate API.*

</details>

---

## 🎨 Design System

<div align="center">

| Token | Hex | Preview | Usage |
|-------|-----|---------|-------|
| `--primary` | `#6366f1` | ![](https://img.shields.io/badge/_%20-6366f1?style=flat-square&color=6366f1) | Buttons, accents, focus rings |
| `--secondary` | `#ec4899` | ![](https://img.shields.io/badge/_%20-ec4899?style=flat-square&color=ec4899) | Swap button, highlights |
| `--accent` | `#14b8a6` | ![](https://img.shields.io/badge/_%20-14b8a6?style=flat-square&color=14b8a6) | Exchange rate badge, teal accents |
| `--success` | `#22c55e` | ![](https://img.shields.io/badge/_%20-22c55e?style=flat-square&color=22c55e) | Positive indicators, toast |
| `--warning` | `#f59e0b` | ![](https://img.shields.io/badge/_%20-f59e0b?style=flat-square&color=f59e0b) | Quick-amount buttons |
| `--error` | `#ef4444` | ![](https://img.shields.io/badge/_%20-ef4444?style=flat-square&color=ef4444) | Error states |
| Dark `--bg` | `#0f172a` | ![](https://img.shields.io/badge/_%20-0f172a?style=flat-square&color=0f172a) | Dark mode page background |

</div>

**Typography** — [Inter](https://fonts.google.com/specimen/Inter) (300–700 weight) via Google Fonts  
**Effects** — `backdrop-filter: blur` for glassmorphism · CSS `@keyframes` for floating blob circles · cubic-bezier transitions throughout  
**Accessibility** — ARIA labels · keyboard navigation · `prefers-reduced-motion` support

---

## 📁 Project Structure

```
currency_converter/
│
├── 📄  index.html    ← App shell — semantic HTML, layout, all section markup
├── 🎨  styles.css    ← CSS custom properties, glassmorphism, dark/light themes,
│                       animations, responsive breakpoints
├── ⚡  app.js        ← State management, dual-API fetch, localStorage, DOM logic,
│                       debounce, favorites, history, keyboard shortcuts
└── 📖  README.md     ← You are here
```

---

## 🔧 Technical Highlights

```javascript
// Dual-API resilience with localStorage cache
async function fetchExchangeRates(baseCurrency = 'USD') {
    // Serve from cache if still fresh (< 10 min)
    if (state.rates[baseCurrency] && state.lastFetch) {
        if (Date.now() - state.lastFetch < CACHE_DURATION) {
            return state.rates[baseCurrency];
        }
    }
    try {
        let res = await fetch(`${API_PRIMARY}${baseCurrency}`);
        if (!res.ok) res = await fetch(`${API_FALLBACK}${baseCurrency}`); // fallback
        const data = await res.json();
        state.rates[baseCurrency] = data.rates;
        state.lastFetch = Date.now();
        return data.rates;
    } catch (err) {
        showToast('Failed to fetch rates. Using cached data.', 'error');
    }
}
```

| Concern | Approach |
|---------|----------|
| API Resilience | Dual-API with transparent fallback |
| Performance | Debounced input (`300 ms`) + 10-min rate cache |
| State | Vanilla JS state object + `localStorage` persistence |
| Input UX | Auto-convert on type, `Clear ×` button, quick-amount presets |
| Notifications | Toast system with success / error variants |
| Accessibility | ARIA labels, keyboard shortcuts, focus management |

---

## 🛠️ Browser Support

| Browser | Support |
|---------|:-------:|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |
| Mobile (iOS / Android) | ✅ |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. Create your branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feat/amazing-feature`
5. Open a **Pull Request**

---

## 📄 License

Distributed under the **MIT License** — free for personal and commercial use.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,24,25&height=90&section=footer&text=Made%20with%20❤️%20by%20Misrilal%20Sah&fontSize=22&fontColor=ffffff" alt="Footer"/>

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Misrilal--Sah-6366f1?style=flat-square&logo=github&logoColor=white)](https://github.com/Misrilal-Sah)
&nbsp;
[![Powered By](https://img.shields.io/badge/Powered%20by-Open%20Exchange%20Rates-22c55e?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0xIDE3aC0ydi0yaDF2LTVoLTF2LTJoM3Y3eiIvPjwvc3ZnPg==&logoColor=white)](https://open.er-api.com)
&nbsp;
[![Font](https://img.shields.io/badge/Font-Inter-f1f5f9?style=flat-square&logo=google-fonts&logoColor=black)](https://fonts.google.com/specimen/Inter)

<sub><b>Exchange rates provided by <a href="https://open.er-api.com">Open Exchange Rates API</a></b><br/>
Built with pure HTML5 · CSS3 · Vanilla JavaScript — no frameworks, no dependencies.</sub>

</div>
