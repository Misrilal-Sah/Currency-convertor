# 💱 CurrencyX - Premium Currency Converter

A beautiful, responsive currency converter web application with real-time exchange rates for 150+ currencies.

![Currency Converter](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Core Features
- 🔄 **Real-time Exchange Rates** - Live rates from Open Exchange Rates API
- 💱 **150+ Currencies** - Support for all major world currencies
- ⚡ **Instant Conversion** - Auto-converts as you type
- 🔁 **Swap Currencies** - One-click currency swap with animation

### User Experience
- 🎨 **Premium Design** - Glassmorphism UI with smooth animations
- 🌓 **Dark/Light Mode** - Toggle between themes with persistence
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⌨️ **Keyboard Shortcuts** - Enter to convert, Ctrl+S to swap

### Smart Features
- ⭐ **Favorites** - Save frequently used currency pairs
- 📊 **Conversion History** - Track your last 15 conversions
- 💾 **Local Storage** - Remembers your preferences
- 🔥 **Popular Rates** - Quick access to common currency pairs
- ⚡ **Quick Amounts** - One-click preset amounts (100, 500, 1K, 5K, 10K)

## 🚀 Live Demo

Simply open `index.html` in your browser or serve with any static server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Then visit `http://localhost:8080`

## 📂 Project Structure

```
currency_converter/
├── index.html      # Main HTML structure
├── styles.css      # CSS with themes & animations
├── app.js          # JavaScript functionality
└── README.md       # Documentation
```

## 🎯 How to Use

1. **Enter Amount** - Type the amount you want to convert
2. **Select Currencies** - Choose source (From) and target (To) currencies
3. **Convert** - Click "Convert" or results update automatically
4. **Swap** - Click ⇄ to swap currencies instantly
5. **Quick Amounts** - Use preset buttons for common amounts
6. **Save Favorites** - Click "Add Current" to save currency pairs
7. **Toggle Theme** - Click ☀️/🌙 for light/dark mode

## 🔧 Technical Details

### API Integration
- **Primary API**: [Open Exchange Rates](https://open.er-api.com)
- **Fallback API**: [ExchangeRate-API](https://exchangerate-api.com)
- **Cache Duration**: 10 minutes

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

### Features Implementation
| Feature | Technology |
|---------|------------|
| State Management | Vanilla JS Object |
| Persistence | localStorage |
| Styling | CSS Variables + Flexbox/Grid |
| Animations | CSS Transitions & Keyframes |
| API Calls | Fetch API with async/await |

## 🎨 Design Highlights

- **Glassmorphism** - Frosted glass effect with backdrop blur
- **Gradient Backgrounds** - Animated floating circles
- **Micro-interactions** - Hover effects, button feedback
- **Accessibility** - ARIA labels, keyboard navigation, focus states
- **Reduced Motion** - Respects user preference

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Credits

- Exchange rates by [Open Exchange Rates API](https://open.er-api.com)
- Font: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts
- Icons: Native emoji support

---

Made with ❤️ by [Misrilal Sah](https://github.com/Misrilal-Sah)
