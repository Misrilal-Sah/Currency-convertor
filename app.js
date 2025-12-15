/**
 * CurrencyX - Premium Currency Converter
 * Real-time exchange rates with modern UI
 */

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const API_PRIMARY = 'https://open.er-api.com/v6/latest/';
const API_FALLBACK = 'https://api.exchangerate-api.com/v4/latest/';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const DEBOUNCE_DELAY = 300;
const MAX_HISTORY = 15;
const MAX_FAVORITES = 10;

// Currency data with names and flags
const CURRENCIES = {
    USD: { name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
    EUR: { name: 'Euro', flag: '🇪🇺', symbol: '€' },
    GBP: { name: 'British Pound', flag: '🇬🇧', symbol: '£' },
    JPY: { name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
    AUD: { name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
    CAD: { name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
    CHF: { name: 'Swiss Franc', flag: '🇨🇭', symbol: 'Fr' },
    CNY: { name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
    INR: { name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
    MXN: { name: 'Mexican Peso', flag: '🇲🇽', symbol: '$' },
    SGD: { name: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' },
    HKD: { name: 'Hong Kong Dollar', flag: '🇭🇰', symbol: 'HK$' },
    NOK: { name: 'Norwegian Krone', flag: '🇳🇴', symbol: 'kr' },
    SEK: { name: 'Swedish Krona', flag: '🇸🇪', symbol: 'kr' },
    DKK: { name: 'Danish Krone', flag: '🇩🇰', symbol: 'kr' },
    NZD: { name: 'New Zealand Dollar', flag: '🇳🇿', symbol: 'NZ$' },
    ZAR: { name: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
    RUB: { name: 'Russian Ruble', flag: '🇷🇺', symbol: '₽' },
    BRL: { name: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
    KRW: { name: 'South Korean Won', flag: '🇰🇷', symbol: '₩' },
    TRY: { name: 'Turkish Lira', flag: '🇹🇷', symbol: '₺' },
    PLN: { name: 'Polish Zloty', flag: '🇵🇱', symbol: 'zł' },
    THB: { name: 'Thai Baht', flag: '🇹🇭', symbol: '฿' },
    IDR: { name: 'Indonesian Rupiah', flag: '🇮🇩', symbol: 'Rp' },
    MYR: { name: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
    PHP: { name: 'Philippine Peso', flag: '🇵🇭', symbol: '₱' },
    CZK: { name: 'Czech Koruna', flag: '🇨🇿', symbol: 'Kč' },
    ILS: { name: 'Israeli Shekel', flag: '🇮🇱', symbol: '₪' },
    CLP: { name: 'Chilean Peso', flag: '🇨🇱', symbol: '$' },
    PKR: { name: 'Pakistani Rupee', flag: '🇵🇰', symbol: '₨' },
    EGP: { name: 'Egyptian Pound', flag: '🇪🇬', symbol: 'E£' },
    VND: { name: 'Vietnamese Dong', flag: '🇻🇳', symbol: '₫' },
    BDT: { name: 'Bangladeshi Taka', flag: '🇧🇩', symbol: '৳' },
    NGN: { name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
    AED: { name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
    SAR: { name: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼' },
    QAR: { name: 'Qatari Riyal', flag: '🇶🇦', symbol: '﷼' },
    KWD: { name: 'Kuwaiti Dinar', flag: '🇰🇼', symbol: 'د.ك' },
    BHD: { name: 'Bahraini Dinar', flag: '🇧🇭', symbol: '.د.ب' },
    OMR: { name: 'Omani Rial', flag: '🇴🇲', symbol: '﷼' },
    JOD: { name: 'Jordanian Dinar', flag: '🇯🇴', symbol: 'د.ا' },
    LKR: { name: 'Sri Lankan Rupee', flag: '🇱🇰', symbol: '₨' },
    NPR: { name: 'Nepalese Rupee', flag: '🇳🇵', symbol: '₨' },
    MMK: { name: 'Myanmar Kyat', flag: '🇲🇲', symbol: 'K' },
    KES: { name: 'Kenyan Shilling', flag: '🇰🇪', symbol: 'KSh' },
    GHS: { name: 'Ghanaian Cedi', flag: '🇬🇭', symbol: '₵' },
    UGX: { name: 'Ugandan Shilling', flag: '🇺🇬', symbol: 'USh' },
    TZS: { name: 'Tanzanian Shilling', flag: '🇹🇿', symbol: 'TSh' },
    MAD: { name: 'Moroccan Dirham', flag: '🇲🇦', symbol: 'د.م.' },
    TWD: { name: 'Taiwan Dollar', flag: '🇹🇼', symbol: 'NT$' },
    HUF: { name: 'Hungarian Forint', flag: '🇭🇺', symbol: 'Ft' },
    RON: { name: 'Romanian Leu', flag: '🇷🇴', symbol: 'lei' },
    BGN: { name: 'Bulgarian Lev', flag: '🇧🇬', symbol: 'лв' },
    HRK: { name: 'Croatian Kuna', flag: '🇭🇷', symbol: 'kn' },
    ISK: { name: 'Icelandic Krona', flag: '🇮🇸', symbol: 'kr' },
    COP: { name: 'Colombian Peso', flag: '🇨🇴', symbol: '$' },
    PEN: { name: 'Peruvian Sol', flag: '🇵🇪', symbol: 'S/' },
    ARS: { name: 'Argentine Peso', flag: '🇦🇷', symbol: '$' },
    UAH: { name: 'Ukrainian Hryvnia', flag: '🇺🇦', symbol: '₴' }
};

// Popular currency pairs for display
const POPULAR_PAIRS = [
    ['USD', 'EUR'],
    ['USD', 'GBP'],
    ['USD', 'JPY'],
    ['EUR', 'GBP'],
    ['USD', 'INR'],
    ['EUR', 'JPY'],
    ['GBP', 'EUR'],
    ['USD', 'CAD']
];

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    rates: {},
    baseCurrency: 'USD',
    lastFetch: null,
    isLoading: false,
    fromCurrency: 'INR',
    toCurrency: 'USD',
    amount: 1,
    isDarkMode: false,
    favorites: [],
    history: [],
    error: null
};

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    // Theme
    themeToggle: document.getElementById('themeToggle'),
    
    // Inputs
    amountInput: document.getElementById('amount'),
    currencySymbol: document.getElementById('currencySymbol'),
    clearAmount: document.getElementById('clearAmount'),
    fromCurrency: document.getElementById('fromCurrency'),
    toCurrency: document.getElementById('toCurrency'),
    fromFlag: document.getElementById('fromFlag'),
    toFlag: document.getElementById('toFlag'),
    
    // Buttons
    swapBtn: document.getElementById('swapCurrencies'),
    convertBtn: document.getElementById('convertBtn'),
    addFavoriteBtn: document.getElementById('addFavoriteBtn'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    
    // Results
    resultContainer: document.getElementById('resultContainer'),
    resultAmount: document.getElementById('resultAmount'),
    resultCurrency: document.getElementById('resultCurrency'),
    exchangeRate: document.getElementById('exchangeRate'),
    lastUpdated: document.getElementById('lastUpdated'),
    
    // Sections
    favoritesList: document.getElementById('favoritesList'),
    historyList: document.getElementById('historyList'),
    popularGrid: document.getElementById('popularGrid'),
    emptyFavorites: document.getElementById('emptyFavorites'),
    emptyHistory: document.getElementById('emptyHistory'),
    
    // Quick actions
    quickBtns: document.querySelectorAll('.quick-btn'),
    
    // Notifications
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    loadingOverlay: document.getElementById('loadingOverlay')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit API calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format number with proper decimal places
 */
function formatNumber(number, decimals = 2) {
    if (number >= 1000) {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else if (number >= 1) {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        });
    } else {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        });
    }
}

/**
 * Format date for display
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

/**
 * Format relative time
 */
function formatRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return formatDate(date);
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    elements.toast.className = `toast ${type}`;
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('visible');
    
    setTimeout(() => {
        elements.toast.classList.remove('visible');
    }, 3000);
}

/**
 * Get currency info with fallback
 */
function getCurrencyInfo(code) {
    return CURRENCIES[code] || {
        name: code,
        flag: '🏳️',
        symbol: code
    };
}

// ============================================
// LOCAL STORAGE
// ============================================

const storage = {
    get(key, defaultValue) {
        try {
            const item = localStorage.getItem(`currencyX_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(`currencyX_${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    },
    
    loadPreferences() {
        state.isDarkMode = this.get('darkMode', false);
        state.fromCurrency = this.get('fromCurrency', 'INR');
        state.toCurrency = this.get('toCurrency', 'USD');
        state.amount = this.get('amount', 1);
        state.favorites = this.get('favorites', []);
        state.history = this.get('history', []);
    },
    
    savePreferences() {
        this.set('darkMode', state.isDarkMode);
        this.set('fromCurrency', state.fromCurrency);
        this.set('toCurrency', state.toCurrency);
        this.set('amount', state.amount);
        this.set('favorites', state.favorites);
        this.set('history', state.history);
    }
};

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Fetch exchange rates from API with fallback
 */
async function fetchExchangeRates(baseCurrency = 'USD') {
    // Check cache first
    if (state.rates[baseCurrency] && state.lastFetch) {
        const cacheAge = Date.now() - state.lastFetch;
        if (cacheAge < CACHE_DURATION) {
            return state.rates[baseCurrency];
        }
    }
    
    state.isLoading = true;
    elements.convertBtn.classList.add('loading');
    
    try {
        // Try primary API first
        let response = await fetch(`${API_PRIMARY}${baseCurrency}`);
        
        if (!response.ok) {
            // Fallback to secondary API
            response = await fetch(`${API_FALLBACK}${baseCurrency}`);
        }
        
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        
        // Store rates
        state.rates[baseCurrency] = data.rates;
        state.baseCurrency = baseCurrency;
        state.lastFetch = Date.now();
        state.error = null;
        
        return data.rates;
        
    } catch (error) {
        console.error('API Error:', error);
        state.error = error.message;
        showToast('Failed to fetch rates. Using cached data.', 'error');
        throw error;
    } finally {
        state.isLoading = false;
        elements.convertBtn.classList.remove('loading');
    }
}

// ============================================
// CONVERSION FUNCTIONS
// ============================================

/**
 * Convert currency amount
 */
async function convertCurrency() {
    const amount = parseFloat(elements.amountInput.value);
    
    // Validation
    if (isNaN(amount) || amount < 0) {
        showToast('Please enter a valid positive amount', 'error');
        return;
    }
    
    if (amount === 0) {
        updateResultDisplay(0, 0);
        return;
    }
    
    try {
        const rates = await fetchExchangeRates(state.fromCurrency);
        const rate = rates[state.toCurrency];
        
        if (!rate) {
            showToast('Exchange rate not available', 'error');
            return;
        }
        
        const result = amount * rate;
        
        // Update state
        state.amount = amount;
        
        // Update display
        updateResultDisplay(result, rate);
        
        // Add to history
        addToHistory(amount, result, rate);
        
        // Save preferences
        storage.savePreferences();
        
    } catch (error) {
        // Use cached rates if available
        if (state.rates[state.fromCurrency]) {
            const rate = state.rates[state.fromCurrency][state.toCurrency];
            if (rate) {
                const result = amount * rate;
                updateResultDisplay(result, rate);
            }
        }
    }
}

/**
 * Update result display with animation
 */
function updateResultDisplay(result, rate) {
    elements.resultAmount.textContent = formatNumber(result);
    elements.resultCurrency.textContent = state.toCurrency;
    
    const fromInfo = getCurrencyInfo(state.fromCurrency);
    const toInfo = getCurrencyInfo(state.toCurrency);
    
    elements.exchangeRate.textContent = `1 ${state.fromCurrency} = ${formatNumber(rate)} ${state.toCurrency}`;
    elements.lastUpdated.textContent = `Last updated: ${formatDate(new Date(state.lastFetch))}`;
    
    // Show result with animation
    elements.resultContainer.classList.add('visible');
}

/**
 * Swap currencies
 */
function swapCurrencies() {
    // Add animation
    elements.swapBtn.classList.add('rotating');
    
    // Swap values
    [state.fromCurrency, state.toCurrency] = [state.toCurrency, state.fromCurrency];
    
    // Update dropdowns
    elements.fromCurrency.value = state.fromCurrency;
    elements.toCurrency.value = state.toCurrency;
    
    // Update flags
    updateFlags();
    
    // Update currency symbol
    updateCurrencySymbol();
    
    // Convert with new currencies
    convertCurrency();
    
    // Remove animation class
    setTimeout(() => {
        elements.swapBtn.classList.remove('rotating');
    }, 300);
    
    // Save preferences
    storage.savePreferences();
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

/**
 * Populate currency dropdowns
 */
function populateCurrencyDropdowns() {
    const sortedCurrencies = Object.entries(CURRENCIES).sort((a, b) => 
        a[1].name.localeCompare(b[1].name)
    );
    
    const createOptions = () => {
        return sortedCurrencies.map(([code, info]) => 
            `<option value="${code}">${code} - ${info.name}</option>`
        ).join('');
    };
    
    elements.fromCurrency.innerHTML = createOptions();
    elements.toCurrency.innerHTML = createOptions();
    
    // Set initial values
    elements.fromCurrency.value = state.fromCurrency;
    elements.toCurrency.value = state.toCurrency;
    
    // Update flags
    updateFlags();
    updateCurrencySymbol();
}

/**
 * Update currency flags
 */
function updateFlags() {
    const fromInfo = getCurrencyInfo(state.fromCurrency);
    const toInfo = getCurrencyInfo(state.toCurrency);
    
    elements.fromFlag.textContent = fromInfo.flag;
    elements.toFlag.textContent = toInfo.flag;
}

/**
 * Update currency symbol in input
 */
function updateCurrencySymbol() {
    const info = getCurrencyInfo(state.fromCurrency);
    elements.currencySymbol.textContent = info.symbol;
}

/**
 * Populate popular rates grid
 */
async function populatePopularRates() {
    try {
        const rates = await fetchExchangeRates('USD');
        
        elements.popularGrid.innerHTML = POPULAR_PAIRS.map(([from, to]) => {
            const fromInfo = getCurrencyInfo(from);
            const toInfo = getCurrencyInfo(to);
            
            // Calculate rate (convert through USD if needed)
            let rate;
            if (from === 'USD') {
                rate = rates[to];
            } else {
                // Cross rate calculation
                const fromToUsd = 1 / rates[from];
                rate = fromToUsd * rates[to];
            }
            
            return `
                <div class="popular-item" data-from="${from}" data-to="${to}">
                    <div class="popular-pair">
                        <span class="popular-flags">${fromInfo.flag}→${toInfo.flag}</span>
                        <span class="popular-code">${from}/${to}</span>
                    </div>
                    <span class="popular-rate">${formatNumber(rate)}</span>
                </div>
            `;
        }).join('');
        
        // Add click handlers
        document.querySelectorAll('.popular-item').forEach(item => {
            item.addEventListener('click', () => {
                state.fromCurrency = item.dataset.from;
                state.toCurrency = item.dataset.to;
                elements.fromCurrency.value = state.fromCurrency;
                elements.toCurrency.value = state.toCurrency;
                updateFlags();
                updateCurrencySymbol();
                convertCurrency();
                storage.savePreferences();
                
                // Scroll to converter
                document.querySelector('.converter-card').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        });
        
    } catch (error) {
        elements.popularGrid.innerHTML = '<p class="empty-message">Unable to load popular rates</p>';
    }
}

// ============================================
// FAVORITES FUNCTIONS
// ============================================

/**
 * Add current pair to favorites
 */
function addToFavorites() {
    const pair = {
        from: state.fromCurrency,
        to: state.toCurrency,
        id: `${state.fromCurrency}-${state.toCurrency}`
    };
    
    // Check if already exists
    if (state.favorites.some(f => f.id === pair.id)) {
        showToast('This pair is already in favorites', 'error');
        return;
    }
    
    // Check limit
    if (state.favorites.length >= MAX_FAVORITES) {
        showToast(`Maximum ${MAX_FAVORITES} favorites allowed`, 'error');
        return;
    }
    
    state.favorites.unshift(pair);
    storage.savePreferences();
    renderFavorites();
    showToast('Added to favorites! ⭐');
}

/**
 * Remove from favorites
 */
function removeFromFavorites(id) {
    state.favorites = state.favorites.filter(f => f.id !== id);
    storage.savePreferences();
    renderFavorites();
    showToast('Removed from favorites');
}

/**
 * Render favorites list
 */
function renderFavorites() {
    if (state.favorites.length === 0) {
        elements.favoritesList.innerHTML = `
            <p class="empty-message">No favorites yet. Click "Add Current" to save a currency pair.</p>
        `;
        return;
    }
    
    elements.favoritesList.innerHTML = state.favorites.map(fav => {
        const fromInfo = getCurrencyInfo(fav.from);
        const toInfo = getCurrencyInfo(fav.to);
        
        return `
            <div class="favorite-item" data-from="${fav.from}" data-to="${fav.to}">
                <div class="favorite-info">
                    <span class="favorite-pair">${fromInfo.flag} ${fav.from} → ${toInfo.flag} ${fav.to}</span>
                </div>
                <button class="remove-btn" data-id="${fav.id}" aria-label="Remove favorite">×</button>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.favorite-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                removeFromFavorites(e.target.dataset.id);
                return;
            }
            
            state.fromCurrency = item.dataset.from;
            state.toCurrency = item.dataset.to;
            elements.fromCurrency.value = state.fromCurrency;
            elements.toCurrency.value = state.toCurrency;
            updateFlags();
            updateCurrencySymbol();
            convertCurrency();
            storage.savePreferences();
        });
    });
}

// ============================================
// HISTORY FUNCTIONS
// ============================================

/**
 * Add conversion to history
 */
function addToHistory(amount, result, rate) {
    const entry = {
        id: Date.now(),
        from: state.fromCurrency,
        to: state.toCurrency,
        amount,
        result,
        rate,
        timestamp: new Date().toISOString()
    };
    
    // Add to beginning
    state.history.unshift(entry);
    
    // Limit history
    if (state.history.length > MAX_HISTORY) {
        state.history = state.history.slice(0, MAX_HISTORY);
    }
    
    storage.savePreferences();
    renderHistory();
}

/**
 * Clear all history
 */
function clearHistory() {
    state.history = [];
    storage.savePreferences();
    renderHistory();
    showToast('History cleared');
}

/**
 * Render history list
 */
function renderHistory() {
    if (state.history.length === 0) {
        elements.historyList.innerHTML = `
            <p class="empty-message">No conversions yet. Start converting to see your history.</p>
        `;
        return;
    }
    
    elements.historyList.innerHTML = state.history.map(entry => {
        const fromInfo = getCurrencyInfo(entry.from);
        const toInfo = getCurrencyInfo(entry.to);
        const time = formatRelativeTime(new Date(entry.timestamp));
        
        return `
            <div class="history-item" data-from="${entry.from}" data-to="${entry.to}" data-amount="${entry.amount}">
                <div class="history-info">
                    <span class="history-pair">${fromInfo.flag} ${formatNumber(entry.amount)} ${entry.from} → ${toInfo.flag} ${formatNumber(entry.result)} ${entry.to}</span>
                    <span class="history-time">${time}</span>
                </div>
                <button class="remove-btn" data-id="${entry.id}" aria-label="Remove from history">×</button>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                state.history = state.history.filter(h => h.id !== parseInt(e.target.dataset.id));
                storage.savePreferences();
                renderHistory();
                return;
            }
            
            state.fromCurrency = item.dataset.from;
            state.toCurrency = item.dataset.to;
            elements.amountInput.value = item.dataset.amount;
            elements.fromCurrency.value = state.fromCurrency;
            elements.toCurrency.value = state.toCurrency;
            updateFlags();
            updateCurrencySymbol();
            convertCurrency();
            storage.savePreferences();
        });
    });
}

// ============================================
// THEME FUNCTIONS
// ============================================

/**
 * Toggle dark/light mode
 */
function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    applyTheme();
    storage.savePreferences();
    showToast(state.isDarkMode ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
}

/**
 * Apply current theme
 */
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light');
}

// ============================================
// EVENT LISTENERS
// ============================================

function initEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Amount input - auto convert with debounce
    elements.amountInput.addEventListener('input', debounce(() => {
        state.amount = parseFloat(elements.amountInput.value) || 0;
        convertCurrency();
    }, DEBOUNCE_DELAY));
    
    // Clear amount
    elements.clearAmount.addEventListener('click', () => {
        elements.amountInput.value = '';
        elements.amountInput.focus();
        elements.resultContainer.classList.remove('visible');
    });
    
    // Currency selection
    elements.fromCurrency.addEventListener('change', () => {
        state.fromCurrency = elements.fromCurrency.value;
        updateFlags();
        updateCurrencySymbol();
        convertCurrency();
        storage.savePreferences();
    });
    
    elements.toCurrency.addEventListener('change', () => {
        state.toCurrency = elements.toCurrency.value;
        updateFlags();
        convertCurrency();
        storage.savePreferences();
    });
    
    // Swap button
    elements.swapBtn.addEventListener('click', swapCurrencies);
    
    // Convert button
    elements.convertBtn.addEventListener('click', convertCurrency);
    
    // Add to favorites
    elements.addFavoriteBtn.addEventListener('click', addToFavorites);
    
    // Clear history
    elements.clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Quick amount buttons
    elements.quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseInt(btn.dataset.amount);
            elements.amountInput.value = amount;
            state.amount = amount;
            convertCurrency();
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Enter to convert
        if (e.key === 'Enter' && document.activeElement === elements.amountInput) {
            convertCurrency();
        }
        
        // Escape to clear
        if (e.key === 'Escape') {
            elements.amountInput.value = '';
            elements.resultContainer.classList.remove('visible');
        }
        
        // Ctrl/Cmd + S to swap
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            swapCurrencies();
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

async function init() {
    try {
        // Load saved preferences
        storage.loadPreferences();
        
        // Apply theme
        applyTheme();
        
        // Populate dropdowns
        populateCurrencyDropdowns();
        
        // Set saved amount
        elements.amountInput.value = state.amount;
        
        // Initialize event listeners
        initEventListeners();
        
        // Render favorites and history
        renderFavorites();
        renderHistory();
        
        // Fetch initial rates and convert
        await fetchExchangeRates(state.fromCurrency);
        await convertCurrency();
        
        // Populate popular rates
        await populatePopularRates();
        
        // Hide loading overlay
        elements.loadingOverlay.classList.add('hidden');
        
    } catch (error) {
        console.error('Initialization error:', error);
        
        // Still hide loading overlay
        elements.loadingOverlay.classList.add('hidden');
        
        // Show error toast
        showToast('Unable to connect. Some features may be limited.', 'error');
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// ============================================
// SERVICE WORKER REGISTRATION (for PWA support)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Only register if service worker file exists
        navigator.serviceWorker.register('./sw.js').catch(() => {
            // Service worker not available, continue without it
        });
    });
}
