import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  List, 
  User, 
  TrendingUp, 
  RefreshCw, 
  Sun, 
  Moon, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  Smartphone, 
  Wifi, 
  Battery, 
  ArrowUpDown, 
  Check, 
  Info, 
  CheckCircle, 
  Globe 
} from 'lucide-react';

// Hardcoded exchange rates relative to USD
const RATES: Record<string, { symbol: string; rate: number; flag: string; name: string }> = {
  USD: { symbol: '$', rate: 1.0, flag: '🇺🇸', name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.88, flag: '🇪🇺', name: 'Euro' },
  GBP: { symbol: '£', rate: 0.76, flag: '🇬🇧', name: 'British Pound' },
  JPY: { symbol: '¥', rate: 161.78, flag: '🇯🇵', name: 'Japanese Yen' },
  INR: { symbol: '₹', rate: 83.45, flag: '🇮🇳', name: 'Indian Rupee' },
  CAD: { symbol: '$', rate: 1.42, flag: '🇨🇦', name: 'Canadian Dollar' },
  SGD: { symbol: '$', rate: 1.30, flag: '🇸🇬', name: 'Singapore Dollar' },
  CHF: { symbol: 'Fr', rate: 0.81, flag: '🇨🇭', name: 'Swiss Franc' },
  AUD: { symbol: '$', rate: 1.45, flag: '🇦🇺', name: 'Australian Dollar' },
};

interface Transaction {
  id: string;
  from: string;
  to: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  date: string;
}

export default function CurrencyCountEmulator() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'converter' | 'watchlist' | 'history' | 'profile' | 'trend'>('converter');
  
  // Converter States
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [fromAmount, setFromAmount] = useState<string>('1.00');
  const [toAmount, setToAmount] = useState<string>('0.88');
  
  // Watchlist States
  const [watchlist, setWatchlist] = useState<string[]>([]);
  
  // History States
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-1',
      from: 'USD',
      to: 'CAD',
      fromAmount: 1.00,
      toAmount: 1.42,
      rate: 1.42,
      date: 'Jun 26, 2026 10:52 pm'
    }
  ]);
  
  // Profile States
  const [profile, setProfile] = useState({
    name: 'Admin',
    email: 'admin@currencycount.com',
    baseCurrency: 'USD',
    bio: 'Exploring the wonders of the world!',
    isEditing: false
  });
  
  // Profile edit inputs
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editBaseCurrency, setEditBaseCurrency] = useState(profile.baseCurrency);

  // Toast message
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Convert amounts dynamically when inputs or currencies change
  useEffect(() => {
    const fromRate = RATES[fromCurrency]?.rate || 1;
    const toRate = RATES[toCurrency]?.rate || 1;
    
    // Conversion calculation: target = source * (toRate / fromRate)
    const amt = parseFloat(fromAmount);
    if (!isNaN(amt)) {
      const converted = amt * (toRate / fromRate);
      setToAmount(converted.toFixed(2));
    } else {
      setToAmount('');
    }
  }, [fromCurrency, toCurrency, fromAmount]);

  const handleFromAmountChange = (val: string) => {
    setFromAmount(val);
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setFromAmount(toAmount);
  };

  const handleRecordExchange = () => {
    const fromAmt = parseFloat(fromAmount);
    const toAmt = parseFloat(toAmount);
    if (isNaN(fromAmt) || fromAmt <= 0) {
      triggerToast('Please enter a valid amount');
      return;
    }

    const currentRate = (RATES[toCurrency].rate / RATES[fromCurrency].rate);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      from: fromCurrency,
      to: toCurrency,
      fromAmount: fromAmt,
      toAmount: toAmt,
      rate: currentRate,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' ' + new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toLowerCase()
    };

    setTransactions([newTx, ...transactions]);
    triggerToast('Exchange recorded to History!');
  };

  const toggleWatchlist = (currencyCode: string) => {
    if (watchlist.includes(currencyCode)) {
      setWatchlist(watchlist.filter(c => c !== currencyCode));
      triggerToast(`Removed ${currencyCode} from Watchlist`);
    } else {
      setWatchlist([...watchlist, currencyCode]);
      triggerToast(`Added ${currencyCode} to Watchlist`);
    }
  };

  const handleSaveProfile = () => {
    setProfile({
      name: editName,
      email: editEmail,
      baseCurrency: editBaseCurrency,
      bio: editBio,
      isEditing: false
    });
    triggerToast('Profile updated successfully!');
  };

  const handleStartEditProfile = () => {
    setEditName(profile.name);
    setEditEmail(profile.email);
    setEditBio(profile.bio);
    setEditBaseCurrency(profile.baseCurrency);
    setProfile({ ...profile, isEditing: true });
  };

  // Styles based on simulated theme
  const themeBg = isDarkMode ? 'bg-[#121024]' : 'bg-[#F5F4FA]';
  const cardBg = isDarkMode ? 'bg-[#1E1A3C]' : 'bg-white';
  const textTitle = isDarkMode ? 'text-white' : 'text-[#1E1A3C]';
  const textSub = isDarkMode ? 'text-[#8F87B5]' : 'text-slate-550';
  const borderCol = isDarkMode ? 'border-[#2D265A]' : 'border-slate-200';
  const innerInputBg = isDarkMode ? 'bg-[#121024]' : 'bg-[#EFEEF5]';
  const activeTabColor = 'text-[#7C63F5]';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
      
      {/* Left Column: Emulator Information & Walkthrough */}
      <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-accent-sage bg-accent-sage/10 px-2.5 py-1 rounded-md">
            Interactive Showcase
          </span>
          <h4 className="font-display text-2xl font-bold text-slate-900 mt-3 mb-2">
            Currency Count Simulator
          </h4>
          <p className="text-slate-650 text-sm leading-relaxed">
            Experience the design and functionality of the native Android application first-hand. This simulator models the real, high-fidelity UI layout, interactive calculator states, line trends, and customizable user settings shown in Akshay's project showcase.
          </p>
        </div>

        <div className="bg-calm-900/40 border border-calm-800 rounded-2xl p-5 space-y-4">
          <h5 className="text-xs font-mono font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-accent-sage" />
            Simulator Guide
          </h5>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sage mt-1.5 shrink-0" />
              <span><strong>Interactive Conversions:</strong> Type amounts or choose currencies inside the phone frame to compute rate exchanges in real-time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sage mt-1.5 shrink-0" />
              <span><strong>Authentication & Mode Toggles:</strong> Toggle between light and dark modes via the Sun/Moon icon inside the simulator.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sage mt-1.5 shrink-0" />
              <span><strong>Watchlist & Star System:</strong> Navigate to the Watchlist tab. You can star currencies directly from the selector or interactive lists.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sage mt-1.5 shrink-0" />
              <span><strong>Interactive Profile Settings:</strong> Edit administrative profiles, bio info, and default currencies on the Profile tab.</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <span className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs">📱</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs">⚡</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs">🎯</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Fully responsive. Emulating native Kotlin features in pure web state.
          </p>
        </div>
      </div>

      {/* Right Column: The Phone Frame Emulator */}
      <div className="lg:col-span-7 flex justify-center items-center">
        <div className="relative mx-auto w-[330px] sm:w-[350px] h-[640px] rounded-[48px] border-[10px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden flex flex-col ring-8 ring-slate-900/10">
          
          {/* Smartphone Hardware Notch (Dynamic Island) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-50 flex items-center justify-between px-3.5">
            <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
            <div className="w-14 h-1 bg-slate-800/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
          </div>

          {/* Simulated Status Bar */}
          <div className={`px-6 pt-8 pb-2 flex items-center justify-between text-[11px] font-mono z-40 ${isDarkMode ? 'text-slate-400 bg-[#121024]' : 'text-slate-600 bg-[#F5F4FA]'}`}>
            <span className="font-semibold">10:50</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-semibold">VoLTE</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 rotate-90" />
            </div>
          </div>

          {/* Main Simulated Screen */}
          <div className={`flex-1 flex flex-col overflow-y-auto relative ${themeBg} transition-colors duration-300 text-left`}>
            
            {/* Header of Simulated App */}
            <div className={`px-5 py-4 flex items-center justify-between border-b ${borderCol}`}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#7C63F5] flex items-center justify-center text-white text-xs font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <h1 className={`text-base font-bold tracking-tight font-display ${textTitle}`}>
                  Currency Count
                </h1>
              </div>

              {/* Theme Toggle Button Inside App */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-1.5 rounded-xl border ${borderCol} transition-colors cursor-pointer`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-500" />
                )}
              </button>
            </div>

            {/* SCREEN TABS */}
            <div className="flex-1 p-4 overflow-y-auto pb-20">
              
              {/* Toast Message inside App */}
              {toast && (
                <div className="absolute top-16 left-4 right-4 bg-slate-900 text-white text-xs py-2 px-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-fade-in border border-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-sage shrink-0" />
                  <span className="font-mono">{toast}</span>
                </div>
              )}

              {/* TAB 1: CONVERTER */}
              {activeTab === 'converter' && (
                <div className="space-y-4">
                  {/* Top quick-rate slider cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(RATES).slice(0, 3).map(([code, details]) => (
                      <div 
                        key={code}
                        onClick={() => {
                          setFromCurrency('USD');
                          setToCurrency(code);
                          setActiveTab('trend');
                        }}
                        className={`p-2.5 rounded-2xl border ${borderCol} ${cardBg} cursor-pointer hover:scale-[1.02] transition-transform`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-slate-400">{code}</span>
                          <span className="text-xs">{details.flag}</span>
                        </div>
                        <span className={`text-[10px] ${textSub} block truncate`}>{details.name}</span>
                        <span className={`text-xs font-bold font-mono ${textTitle} block mt-1`}>
                          {details.symbol} {details.rate.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Converter Calculator Card */}
                  <div className={`p-4 rounded-3xl border ${borderCol} ${cardBg} space-y-4`}>
                    <h3 className={`text-xs font-mono uppercase tracking-wider font-semibold ${textSub}`}>
                      Convert Currency
                    </h3>

                    {/* From Currency Block */}
                    <div className="space-y-1">
                      <div className={`flex items-center justify-between p-2.5 rounded-2xl ${innerInputBg} border ${borderCol}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{RATES[fromCurrency]?.flag}</span>
                          <div>
                            <select 
                              value={fromCurrency}
                              onChange={(e) => setFromCurrency(e.target.value)}
                              className={`text-xs font-bold bg-transparent border-none outline-none focus:ring-0 ${textTitle}`}
                            >
                              {Object.keys(RATES).map(code => (
                                <option key={code} value={code} className="bg-[#121024] text-white">
                                  {code}
                                </option>
                              ))}
                            </select>
                            <span className="text-[9px] text-slate-400 block -mt-0.5 ml-1">From</span>
                          </div>
                        </div>
                        <input 
                          type="number"
                          value={fromAmount}
                          onChange={(e) => handleFromAmountChange(e.target.value)}
                          className={`w-28 text-right bg-transparent border-none outline-none text-sm font-bold font-mono ${textTitle}`}
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Circular Swap Button */}
                    <div className="flex justify-center -my-2.5 relative z-10">
                      <button 
                        onClick={handleSwapCurrencies}
                        className="w-8 h-8 rounded-full bg-[#7C63F5] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md cursor-pointer"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* To Currency Block */}
                    <div className="space-y-1">
                      <div className={`flex items-center justify-between p-2.5 rounded-2xl ${innerInputBg} border ${borderCol}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{RATES[toCurrency]?.flag}</span>
                          <div>
                            <select 
                              value={toCurrency}
                              onChange={(e) => setToCurrency(e.target.value)}
                              className={`text-xs font-bold bg-transparent border-none outline-none focus:ring-0 ${textTitle}`}
                            >
                              {Object.keys(RATES).map(code => (
                                <option key={code} value={code} className="bg-[#121024] text-white">
                                  {code}
                                </option>
                              ))}
                            </select>
                            <span className="text-[9px] text-slate-400 block -mt-0.5 ml-1">To</span>
                          </div>
                        </div>
                        <input 
                          type="text"
                          readOnly
                          value={toAmount}
                          className={`w-28 text-right bg-transparent border-none outline-none text-sm font-bold font-mono ${textTitle}`}
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Calculated live rate display */}
                    <div className="text-center pt-1">
                      <span className="text-[11px] font-mono font-medium text-slate-400">
                        1 {fromCurrency} = {(RATES[toCurrency].rate / RATES[fromCurrency].rate).toFixed(4)} {toCurrency}
                      </span>
                    </div>

                    {/* Record Exchange Button */}
                    <button
                      onClick={handleRecordExchange}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#7C63F5] hover:bg-[#684FE0] text-white text-xs font-semibold py-3 rounded-2xl shadow-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Record Exchange
                    </button>
                  </div>

                  {/* Mini instruction or shortcut to trend graph */}
                  <div 
                    onClick={() => setActiveTab('trend')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border ${borderCol} ${cardBg} cursor-pointer hover:bg-slate-50/5`}
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className={`text-[11px] font-mono font-medium ${textTitle}`}>
                        View 30-Day Trend Rate Graphics
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">USD/EUR</span>
                  </div>
                </div>
              )}

              {/* TAB 2: WATCHLIST */}
              {activeTab === 'watchlist' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xs font-mono uppercase tracking-wider font-semibold ${textSub}`}>
                      My Watchlist
                    </h3>
                  </div>

                  {watchlist.length === 0 ? (
                    <div className="text-center py-16 flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-400 text-xl font-bold animate-pulse">
                        ★
                      </div>
                      <h4 className={`text-xs font-bold ${textTitle}`}>
                        Your Watchlist is empty
                      </h4>
                      <p className={`text-[10px] ${textSub} max-w-[200px] mx-auto leading-relaxed`}>
                        Star world currencies in the converter or selection list to build your watchlist.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {watchlist.map(code => (
                        <div 
                          key={code}
                          className={`p-3 rounded-2xl border ${borderCol} ${cardBg} flex items-center justify-between`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{RATES[code]?.flag}</span>
                            <div>
                              <span className={`text-xs font-bold block ${textTitle}`}>{code}</span>
                              <span className={`text-[9px] ${textSub} block`}>{RATES[code]?.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-bold font-mono ${textTitle}`}>
                              {RATES[code]?.symbol} {RATES[code]?.rate.toFixed(2)}
                            </span>
                            <button 
                              onClick={() => toggleWatchlist(code)}
                              className="text-amber-400 text-sm hover:scale-110 transition-transform cursor-pointer"
                            >
                              ★
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Currency selector for watchlist */}
                  <div className={`p-4 rounded-3xl border ${borderCol} ${cardBg} space-y-3`}>
                    <h4 className={`text-xs font-bold ${textTitle} flex items-center gap-1.5`}>
                      Add Currencies to Watchlist
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(RATES).filter(c => c !== 'USD').map(code => {
                        const isStarred = watchlist.includes(code);
                        return (
                          <button
                            key={code}
                            onClick={() => toggleWatchlist(code)}
                            className={`px-2 py-1.5 rounded-xl border ${borderCol} text-[10px] font-mono flex items-center justify-between ${isStarred ? 'bg-[#7C63F5]/10 text-[#7C63F5] border-[#7C63F5]/40' : 'bg-transparent text-slate-400 hover:text-white'}`}
                          >
                            <span>{RATES[code].flag} {code}</span>
                            <span>{isStarred ? '★' : '☆'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xs font-mono uppercase tracking-wider font-semibold ${textSub}`}>
                      Transaction History
                    </h3>
                    {transactions.length > 0 && (
                      <button 
                        onClick={() => {
                          setTransactions([]);
                          triggerToast('History cleared!');
                        }}
                        className="text-red-400 hover:text-red-300 text-[10px] font-mono flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear
                      </button>
                    )}
                  </div>

                  {transactions.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center justify-center space-y-3">
                      <div className="text-2xl">📜</div>
                      <h4 className={`text-xs font-bold ${textTitle}`}>
                        No history recorded
                      </h4>
                      <p className={`text-[10px] ${textSub} max-w-[200px] mx-auto leading-relaxed`}>
                        Record exchanges in the Converter tab to build your transaction ledger.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {transactions.map(tx => (
                        <div 
                          key={tx.id}
                          className={`p-3 rounded-2xl border ${borderCol} ${cardBg} space-y-2`}
                        >
                          <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                            <span>{tx.date}</span>
                            <span className="text-[#7C63F5]">Rate: 1 {tx.from} = {tx.rate.toFixed(4)} {tx.to}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{RATES[tx.from]?.flag}</span>
                              <span className={`text-xs font-bold font-mono ${textTitle}`}>{tx.fromAmount.toFixed(2)} {tx.from}</span>
                            </div>
                            <span className="text-slate-400 text-xs">➔</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{RATES[tx.to]?.flag}</span>
                              <span className={`text-xs font-bold font-mono ${textTitle}`}>{tx.toAmount.toFixed(2)} {tx.to}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  {/* Avatar & Header */}
                  <div className={`p-4 rounded-3xl border ${borderCol} ${cardBg} text-center space-y-3`}>
                    <div className="mx-auto w-14 h-14 rounded-full bg-[#7C63F5] flex items-center justify-center text-white text-xl font-bold font-display shadow-inner">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${textTitle}`}>{profile.name}</h4>
                      <p className={`text-[10px] font-mono ${textSub}`}>{profile.email}</p>
                    </div>
                    <span className="inline-block text-[9px] font-mono tracking-wider font-semibold text-[#7C63F5] bg-[#7C63F5]/10 px-2.5 py-1 rounded-full">
                      Base: {profile.baseCurrency}
                    </span>
                  </div>

                  {/* Profile Form Details */}
                  <div className={`p-4 rounded-3xl border ${borderCol} ${cardBg} space-y-3`}>
                    <div className="flex items-center justify-between pb-2 border-b border-dashed border-slate-700/30">
                      <h4 className={`text-xs font-mono font-bold ${textTitle}`}>
                        Traveler Profile Info
                      </h4>
                      {!profile.isEditing ? (
                        <button 
                          onClick={handleStartEditProfile}
                          className="text-[#7C63F5] hover:text-[#684FE0] text-xs font-mono flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                      ) : (
                        <button 
                          onClick={handleSaveProfile}
                          className="text-emerald-400 hover:text-emerald-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                      )}
                    </div>

                    {profile.isEditing ? (
                      <div className="space-y-3 text-xs text-left">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-400 uppercase block">Full Name</label>
                          <input 
                            type="text" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-[#121024] text-white border border-[#2D265A] px-3 py-2 rounded-xl"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-400 uppercase block">Email Address</label>
                          <input 
                            type="email" 
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full bg-[#121024] text-white border border-[#2D265A] px-3 py-2 rounded-xl"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-400 uppercase block">Home Base Currency</label>
                          <select
                            value={editBaseCurrency}
                            onChange={(e) => setEditBaseCurrency(e.target.value)}
                            className="w-full bg-[#121024] text-white border border-[#2D265A] px-3 py-2 rounded-xl"
                          >
                            {Object.keys(RATES).map(code => (
                              <option key={code} value={code}>{code} - {RATES[code].name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-400 uppercase block">Travel Goal / Status</label>
                          <textarea 
                            value={editBio}
                            onChange={(e) => setEditBio(e.target.value)}
                            className="w-full h-16 bg-[#121024] text-white border border-[#2D265A] px-3 py-2 rounded-xl resize-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3.5 text-xs text-left">
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 uppercase block">Full Name</span>
                          <span className={`font-semibold ${textTitle}`}>{profile.name}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 uppercase block">Email Address</span>
                          <span className={`font-semibold ${textTitle}`}>{profile.email}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 uppercase block">Home Base Currency</span>
                          <span className={`font-semibold ${textTitle}`}>{RATES[profile.baseCurrency]?.flag} {profile.baseCurrency} ({RATES[profile.baseCurrency]?.name})</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-slate-400 uppercase block">Travel Bio / Status</span>
                          <p className={`text-[11px] leading-relaxed italic ${textSub}`}>{profile.bio}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* App Version Branding Footer inside Emulator */}
                  <div className="text-center py-2">
                    <p className="text-[9px] font-mono text-slate-500">
                      Currency Count Travel Companion • Version 2.4.0
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 5: TREND GRAPH SPECIFIC */}
              {activeTab === 'trend' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xs font-mono uppercase tracking-wider font-semibold ${textSub}`}>
                      {fromCurrency} to {toCurrency} Trend
                    </h3>
                    <button 
                      onClick={() => setActiveTab('converter')}
                      className="text-[#7C63F5] hover:text-[#684FE0] text-xs font-mono cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Simulated Line Graph Area */}
                  <div className={`p-4 rounded-3xl border ${borderCol} ${cardBg} space-y-3`}>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Past 30 Days</span>
                      <span className="text-emerald-400 font-bold">0.9764</span>
                    </div>

                    {/* Styled Graph Canvas/SVG */}
                    <div className="relative h-28 w-full border-b border-l border-slate-700/30 flex items-end">
                      <svg viewBox="0 0 100 30" className="w-full h-full text-[#7C63F5] filter drop-shadow">
                        {/* Shaded Area underneath the path */}
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7C63F5" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#7C63F5" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M0,10 L10,8 L20,15 L30,12 L40,22 L50,18 L60,25 L70,16 L80,20 L90,14 L100,18 L100,30 L0,30 Z" 
                          fill="url(#gradient)" 
                        />
                        {/* Trend line */}
                        <path 
                          d="M0,10 Q10,5 20,15 T40,22 T60,25 T80,20 T100,18" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                        />
                        {/* Interactive dots */}
                        <circle cx="50" cy="18" r="1.5" className="fill-[#7C63F5] stroke-white stroke-0.5" />
                        <circle cx="100" cy="18" r="1.5" className="fill-[#7C63F5] stroke-white stroke-0.5 animate-ping" />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span>May 28, 2026</span>
                      <span>Jun 26, 2026</span>
                    </div>

                    {/* Details and stats */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/20 text-[10px] font-mono text-left">
                      <div>
                        <span className="text-slate-400 block">Min Value</span>
                        <span className={`font-semibold ${textTitle}`}>0.9715</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Max Value</span>
                        <span className={`font-semibold ${textTitle}`}>1.0085</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('converter')}
                    className="w-full py-2.5 bg-[#7C63F5]/10 border border-[#7C63F5]/30 text-[#7C63F5] rounded-2xl text-xs font-mono hover:bg-[#7C63F5]/20 transition-colors cursor-pointer"
                  >
                    Back to Converter Calc
                  </button>
                </div>
              )}

            </div>

            {/* Bottom App Navigation Bar inside Emulator */}
            <div className={`absolute bottom-0 left-0 right-0 h-16 border-t ${borderCol} ${cardBg} flex items-center justify-around px-2 z-40`}>
              <button 
                onClick={() => setActiveTab('converter')}
                className={`flex flex-col items-center gap-1 cursor-pointer`}
              >
                <RefreshCw className={`w-4 h-4 ${activeTab === 'converter' ? activeTabColor : 'text-slate-400'}`} />
                <span className={`text-[8px] font-mono uppercase ${activeTab === 'converter' ? 'text-[#7C63F5] font-bold' : 'text-slate-400'}`}>Converter</span>
              </button>
              <button 
                onClick={() => setActiveTab('watchlist')}
                className={`flex flex-col items-center gap-1 cursor-pointer`}
              >
                <Heart className={`w-4 h-4 ${activeTab === 'watchlist' ? activeTabColor : 'text-slate-400'}`} />
                <span className={`text-[8px] font-mono uppercase ${activeTab === 'watchlist' ? 'text-[#7C63F5] font-bold' : 'text-slate-400'}`}>Watchlist</span>
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex flex-col items-center gap-1 cursor-pointer`}
              >
                <List className={`w-4 h-4 ${activeTab === 'history' ? activeTabColor : 'text-slate-400'}`} />
                <span className={`text-[8px] font-mono uppercase ${activeTab === 'history' ? 'text-[#7C63F5] font-bold' : 'text-slate-400'}`}>History</span>
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center gap-1 cursor-pointer`}
              >
                <User className={`w-4 h-4 ${activeTab === 'profile' ? activeTabColor : 'text-slate-400'}`} />
                <span className={`text-[8px] font-mono uppercase ${activeTab === 'profile' ? 'text-[#7C63F5] font-bold' : 'text-slate-400'}`}>Profile</span>
              </button>
            </div>

          </div>

          {/* Home indicator bar at bottom */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-800 rounded-full z-50" />
        </div>
      </div>

    </div>
  );
}
