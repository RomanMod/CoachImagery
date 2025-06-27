
import { translations } from './translations.js';

const debug = true;

function logDebug(message, data = null) {
  if (debug) {
    console.log(`[DEBUG] ${message}`, data || '');
  }
}

let matches = [];
let matchPositions = [];
let gameStarted = false;
let activeInput = null;
let shadowEnabled = false;
let keyboardEnabled = true;
let matchCount = 3;
let viewTime = 3000;
let restartCount = 0;
let sessionId = generateSessionId();
let gameStartTime = null;
let lastInteraction = performance.now();
let isDarkTheme = true;
let currentLanguage = 'uk';

const languageMap = {
  ru: 'Русский',
  uk: 'Українська',
  en: 'English',
  es: 'Español',
  symbols: '👽'
};

// Declare element variables, assign in DOMContentLoaded
let matchCountDisplay;
let viewTimeDisplay;

function saveSettings() {
  const settings = {
    currentLanguage,
    shadowEnabled,
    keyboardEnabled,
    matchCount,
    viewTime,
    isDarkTheme,
  };
  localStorage.setItem('gameSettings', JSON.stringify(settings));
  logDebug('Settings saved', settings);
}

function loadSettings() {
  const savedSettings = localStorage.getItem('gameSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    currentLanguage = settings.currentLanguage || 'uk';
    shadowEnabled = settings.shadowEnabled === true;
    keyboardEnabled = settings.keyboardEnabled !== false; // Default to true
    matchCount = settings.matchCount || 3;
    viewTime = settings.viewTime || 3000;
    isDarkTheme = settings.isDarkTheme !== false; // Default to true
    logDebug('Settings loaded from localStorage', settings);
  } else {
    logDebug('No saved settings found, using defaults.');
  }
}

function generateSessionId() {
  const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  logDebug('Generated session ID', { sessionId: id });
  return id;
}

function setUserProperties() {
  const properties = {
    preferred_language: currentLanguage,
    shadow_preference: shadowEnabled ? 'on' : 'off',
    keyboard_preference: keyboardEnabled ? 'on' : 'off',
    average_match_count: matchCount,
    average_view_time: viewTime / 1000,
    theme_preference: isDarkTheme ? 'dark' : 'light'
  };
  gtag('set', 'user_properties', properties);
  logDebug('Set user properties', properties);
}

function handleGameAreaClick(event) {
  event.stopPropagation();
  const rect = document.getElementById('game-area').getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  
  const eventData = {
    action: gameStarted && document.getElementById('check-btn').style.display === 'inline-block' ? 'check_answers' : 'reset_game',
    click_coordinates: JSON.stringify({ x: clickX, y: clickY }),
    session_id: sessionId,
    user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'anonymous'
  };
  gtag('event', 'game_area_click', eventData);
  logDebug('Game area clicked', eventData);

  lastInteraction = performance.now();
  if (gameStarted && document.getElementById('check-btn').style.display === 'inline-block') {
    checkAnswers();
  } else {
    resetGame(event);
  }
}

function startGame() {
  logDebug('Starting game');
  document.getElementById('start-btn').style.display = 'none';
  const gameArea = document.getElementById('game-area');
  gameArea.innerHTML = '';
  matches = [];
  matchPositions = [];
  const matchCountValue = parseInt(matchCountDisplay.textContent);
  const viewTimeValue = parseInt(viewTimeDisplay.textContent) * 1000;
  gameStarted = true;
  gameStartTime = performance.now();

  const difficulty = calculateDifficulty(matchCountValue, viewTimeValue);
  
  const eventData = {
    match_count: matchCountValue,
    view_time: viewTimeValue,
    difficulty: difficulty,
    session_id: sessionId,
    user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'anonymous',
    match_distribution: JSON.stringify({
      up: 0,
      down: 0,
      right: 0,
      left: 0
    })
  };
  gtag('event', 'game_start', eventData);
  logDebug('Game started', eventData);

  const gameAreaRect = gameArea.getBoundingClientRect();
  const gameAreaSize = gameAreaRect.width;
  const matchBodyLength = 55;
  const matchBodyHeight = 5;

  // Define a safety margin to ensure no part of the match goes out of bounds.
  // A match's longest possible extent from its rotation center is ~33px.
  // We'll use a slightly larger margin to be safe.
  const margin = 35;

  // The available area for placing the *center* of a match.
  const placementAreaSize = gameAreaSize - (margin * 2);

  for (let i = 0; i < matchCountValue; i++) {
    const angle = Math.random() * 360;

    // Calculate a random center point for the match within the safe placement area.
    const centerX = margin + (Math.random() * placementAreaSize);
    const centerY = margin + (Math.random() * placementAreaSize);

    // Translate the center point to the top-left corner for CSS positioning.
    const x = centerX - (matchBodyLength / 2);
    const y = centerY - (matchBodyHeight / 2);

    const zIndex = Math.floor(Math.random() * matchCountValue);
    const match = document.createElement('div');
    match.className = 'match';
    if (shadowEnabled) match.classList.add('with-shadow');
    match.style.left = x + 'px';
    match.style.top = y + 'px';
    
    // Adjust visual rotation to align with the angle logic (0° = up).
    const displayAngle = (angle - 90 + 360) % 360;
    match.style.transform = `rotate(${displayAngle}deg)`;
    match.style.zIndex = zIndex;

    const head = document.createElement('div');
    head.className = 'match-head';
    match.appendChild(head);
    gameArea.appendChild(match);

    let direction = '';
    // Game's angle system: 0° is Up, 90° is Right, 180° is Down, 270° is Left.
    let normalizedAngle = (angle + 360) % 360;
    
    if (normalizedAngle >= 45 && normalizedAngle < 135) {
      direction = 'right';
    } else if (normalizedAngle >= 135 && normalizedAngle < 225) {
      direction = 'down';
    } else if (normalizedAngle >= 225 && normalizedAngle < 315) {
      direction = 'left';
    } else { // Covers the range from 315° to 45°
      direction = 'up';
    }

    matches.push(direction);
    matchPositions.push({ x, y, angle, zIndex });
  }

  setTimeout(() => {
    gameArea.innerHTML = '';
    document.getElementById('check-btn').style.display = 'inline-block';
    activeInput = document.getElementById('up');
    if (activeInput) {
        activeInput.classList.add('active');
    }
    logDebug('Matches hidden, ready for answers');
  }, viewTimeValue);
}


function calculateDifficulty(matchCount, viewTime) {
  const score = matchCount / viewTime * 1000;
  const difficulty = score < 2 ? 'easy' : score < 5 ? 'medium' : 'hard';
  logDebug('Calculated difficulty', { matchCount, viewTime, difficulty });
  return difficulty;
}

function toggleSettings() {
  const settingsPanel = document.getElementById('settings-panel');
  const settingsBtn = document.getElementById('settings-btn');
  const t = translations[currentLanguage];
  if (settingsPanel.style.display === 'flex') {
    settingsPanel.style.display = 'none';
    settingsBtn.textContent = t.settings;
  } else {
    settingsPanel.style.display = 'flex';
    settingsBtn.textContent = t.settings_on;
    const eventData = { session_id: sessionId };
    gtag('event', 'view_settings', eventData);
    logDebug('Settings panel toggled', eventData);
  }
  lastInteraction = performance.now();
}

function toggleKeyboard() {
  keyboardEnabled = !keyboardEnabled;
  const keyboard = document.getElementById('custom-keyboard');
  const toggleBtn = document.getElementById('toggle-keyboard-btn');
  const t = translations[currentLanguage];
  if (keyboardEnabled) {
    keyboard.style.display = 'grid';
    toggleBtn.textContent = t.keyboard_on;
  } else {
    keyboard.style.display = 'none';
    toggleBtn.textContent = t.keyboard;
  }
  const eventData = {
    enabled: keyboardEnabled,
    session_id: sessionId
  };
  gtag('event', 'toggle_keyboard', eventData);
  logDebug('Keyboard toggled', eventData);
  saveSettings();
  setUserProperties();
  lastInteraction = performance.now();
}

function toggleShadow() {
  shadowEnabled = !shadowEnabled;
  const shadowBtn = document.getElementById('shadow-btn');
  const gameMatches = document.querySelectorAll('.match');
  const t = translations[currentLanguage];
  if (shadowEnabled) {
    shadowBtn.textContent = t.shadow_on;
    gameMatches.forEach(match => match.classList.add('with-shadow'));
  } else {
    shadowBtn.textContent = t.shadow;
    gameMatches.forEach(match => match.classList.remove('with-shadow'));
  }
  const eventData = {
    enabled: shadowEnabled,
    session_id: sessionId
  };
  gtag('event', 'toggle_shadow', eventData);
  logDebug('Shadow toggled', eventData);
  saveSettings();
  setUserProperties();
  lastInteraction = performance.now();
}

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  const themeBtn = document.getElementById('theme-btn');
  const body = document.body;
  const t = translations[currentLanguage];
  
  if (isDarkTheme) {
    body.classList.remove('light-theme');
    themeBtn.textContent = t.night;
  } else {
    body.classList.add('light-theme');
    themeBtn.textContent = t.day;
  }

  const eventData = {
    enabled: isDarkTheme ? 'dark' : 'light',
    session_id: sessionId
  };
  gtag('event', 'toggle_theme', eventData);
  logDebug('Theme toggled', eventData);
  saveSettings();
  setUserProperties();
  lastInteraction = performance.now();
}

function changeLanguage() {
  logDebug('Language changed', { language: currentLanguage });
  
  const t = translations[currentLanguage];
  
  document.getElementById('start-btn').textContent = t.start;
  document.getElementById('check-btn').textContent = t.check;
  document.getElementById('new-game-btn').textContent = t.new_game;
  document.getElementById('settings-btn').textContent = t.settings;
  document.getElementById('close-rules-btn').textContent = t.close;
  document.getElementById('toggle-keyboard-btn').textContent = keyboardEnabled ? t.keyboard_on : t.keyboard;
  document.getElementById('shadow-btn').textContent = shadowEnabled ? t.shadow_on : t.shadow;
  document.getElementById('theme-btn').textContent = isDarkTheme ? t.night : t.day;
  document.getElementById('rules-btn').textContent = t.rules;
  
  document.querySelector('#settings-panel .setting-row:nth-child(1) label').textContent = t.keyboard + ':';
  document.querySelector('#settings-panel .setting-row:nth-child(2) label').textContent = t.language + ':';
  document.querySelector('#settings-panel .setting-row:nth-child(3) label').textContent = t.shadow + ':';
  document.querySelector('#settings-panel .setting-row:nth-child(4) label').textContent = t.rules + ':';
  document.querySelector('#settings-panel .setting-row:nth-child(5) label').textContent = t.match_count + ':';
  document.querySelector('#settings-panel .setting-row:nth-child(6) label').textContent = t.view_time + ':';
  document.querySelector('#settings-panel .setting-row:nth-child(7) label').textContent = t.theme + ':';
  
  document.getElementById('question').textContent = t.question;
  document.querySelector('#result-panel .result-row:nth-child(2) label').innerHTML = `${t.up} <span class="arrow">↑</span>`;
  document.querySelector('#result-panel .result-row:nth-child(3) label').innerHTML = `${t.down} <span class="arrow">↓</span>`;
  document.querySelector('#result-panel .result-row:nth-child(4) label').innerHTML = `${t.right} <span class="arrow">→</span>`;
  document.querySelector('#result-panel .result-row:nth-child(5) label').innerHTML = `${t.left} <span class="arrow">←</span>`;
  
  document.getElementById('keyboard-check-btn').textContent = t.ok;
  document.getElementById('delete-number-btn').textContent = t.delete;
  
  document.getElementById('rules-content').innerHTML = t.rules_content;
  
  viewTimeDisplay.textContent = (viewTime / 1000) + ' ' + t.seconds;
  
  const eventData = {
    language: currentLanguage,
    session_id: sessionId
  };
  gtag('event', 'change_language', eventData);
  saveSettings();
  setUserProperties();
  lastInteraction = performance.now();
}

function addNumber(number) {
  if (!activeInput) return;
  let currentValue = activeInput.value || '';
  if (currentValue.length < 2) {
    activeInput.value = currentValue + number;
    const eventData = {
      key_pressed: number,
      input_field: activeInput.id,
      session_id: sessionId
    };
    gtag('event', 'keyboard_interaction', eventData);
    logDebug('Number added', eventData);
  }
  lastInteraction = performance.now();
}

function deleteNumber() {
  if (!activeInput) return;
  activeInput.value = activeInput.value.slice(0, -1);
  const eventData = {
    key_pressed: 'delete',
    input_field: activeInput.id,
    session_id: sessionId
  };
  gtag('event', 'keyboard_interaction', eventData);
  logDebug('Number deleted', eventData);
  lastInteraction = performance.now();
}

function toggleRules() {
  const rules = document.getElementById('rules');
  if (rules.style.display === 'block') {
    rules.style.display = 'none';
  } else {
    rules.style.display = 'block';
    const eventData = { session_id: sessionId };
    gtag('event', 'view_rules', eventData);
    logDebug('Rules toggled', eventData);
  }
  lastInteraction = performance.now();
}

function trackAchievement(achievementType, matchCount, viewTime) {
  const eventData = {
    achievement_type: achievementType,
    match_count: matchCount,
    view_time: viewTime,
    session_id: sessionId
  };
  gtag('event', 'achievement_unlocked', eventData);
  logDebug('Achievement unlocked', eventData);
}

function checkAnswers() {
  logDebug('Checking answers');
  const up = parseInt(document.getElementById('up').value) || 0;
  const down = parseInt(document.getElementById('down').value) || 0;
  const right = parseInt(document.getElementById('right').value) || 0;
  const left = parseInt(document.getElementById('left').value) || 0;

  const actual = {
    up: matches.filter(d => d === 'up').length,
    down: matches.filter(d => d === 'down').length,
    right: matches.filter(d => d === 'right').length,
    left: matches.filter(d => d === 'left').length
  };

  const correctCount = (up === actual.up ? 1 : 0) + 
                      (down === actual.down ? 1 : 0) + 
                      (right === actual.right ? 1 : 0) + 
                      (left === actual.left ? 1 : 0);
  const totalMatches = matches.length;
  const duration = Math.round((performance.now() - gameStartTime) / 1000);
  const errorMagnitude = {
    up: Math.abs(up - actual.up),
    down: Math.abs(down - actual.down),
    right: Math.abs(right - actual.right),
    left: Math.abs(left - actual.left)
  };

  document.getElementById('feedback-up').innerHTML = `<span class="${up === actual.up ? 'correct' : 'incorrect'}">${actual.up}</span>`;
  document.getElementById('feedback-down').innerHTML = `<span class="${down === actual.down ? 'correct' : 'incorrect'}">${actual.down}</span>`;
  document.getElementById('feedback-right').innerHTML = `<span class="${right === actual.right ? 'correct' : 'incorrect'}">${actual.right}</span>`;
  document.getElementById('feedback-left').innerHTML = `<span class="${left === actual.left ? 'correct' : 'incorrect'}">${actual.left}</span>`;

  const gameArea = document.getElementById('game-area');
  gameArea.innerHTML = '';
  matchPositions.forEach(pos => {
    const match = document.createElement('div');
    match.className = 'match';
    if (shadowEnabled) match.classList.add('with-shadow');
    match.style.left = pos.x + 'px';
    match.style.top = pos.y + 'px';
    const displayAngle = (pos.angle - 90 + 360) % 360;
    match.style.transform = `rotate(${displayAngle}deg)`;
    match.style.zIndex = pos.zIndex;

    const head = document.createElement('div');
    head.className = 'match-head';
    match.appendChild(head);
    gameArea.appendChild(match);
  });

  const checkEventData = {
    correct_count: correctCount,
    user_answers: JSON.stringify({ up, down, right, left }),
    actual_answers: JSON.stringify(actual),
    error_magnitude: JSON.stringify(errorMagnitude),
    session_id: sessionId,
    user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'anonymous'
  };
  gtag('event', 'check_answers', checkEventData);
  logDebug('Answers checked', checkEventData);

  const completeEventData = {
    correct_answers: correctCount,
    total_matches: totalMatches,
    duration: duration,
    match_distribution: JSON.stringify(actual),
    session_id: sessionId,
    user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'anonymous'
  };
  gtag('event', 'game_complete', completeEventData);
  logDebug('Game completed', completeEventData);

  if (correctCount === 4) {
    trackAchievement('perfect_score', totalMatches, viewTime / 1000);
  }

  document.getElementById('new-game-btn').style.display = 'inline-block';
  document.getElementById('check-btn').style.display = 'none';
  lastInteraction = performance.now();
}

function resetGame(event) {
  event.stopPropagation();
  restartCount++;
  logDebug('Resetting game', { restartCount });
  document.getElementById('new-game-btn').style.display = 'none';
  document.getElementById('start-btn').style.display = 'block';
  document.getElementById('check-btn').style.display = 'none';
  document.getElementById('up').value = '';
  document.getElementById('down').value = '';
  document.getElementById('right').value = '';
  document.getElementById('left').value = '';
  document.getElementById('feedback-up').innerHTML = '';
  document.getElementById('feedback-down').innerHTML = '';
  document.getElementById('feedback-right').innerHTML = '';
  document.getElementById('feedback-left').innerHTML = '';
  gameStarted = false;

  const eventData = {
    restart_count: restartCount,
    session_id: sessionId,
    user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'anonymous'
  };
  gtag('event', 'game_restart', eventData);
  logDebug('Game restarted', eventData);

  startGame();
  lastInteraction = performance.now();
}

function changeMatchCount(delta) {
  let currentValue = parseInt(matchCountDisplay.textContent);
  let newValue = currentValue + delta;
  
  if (newValue >= 3 && newValue <= 80) {
    matchCountDisplay.textContent = newValue;
    matchCount = newValue;
    const eventData = {
      setting_type: 'match_count',
      value: newValue,
      session_id: sessionId
    };
    gtag('event', 'change_settings', eventData);
    logDebug('Match count changed', eventData);
    saveSettings();
    setUserProperties();
  }
  lastInteraction = performance.now();
}

function changeViewTime(delta) {
  let currentValueText = viewTimeDisplay.textContent || `${viewTime / 1000}`;
  let lang = translations[currentLanguage] || translations.ru;
  let currentValue = parseInt(currentValueText.replace(lang.seconds, '').trim());
  let newValue = currentValue + delta;
  
  if (newValue >= 1 && newValue <= 30) {
    viewTimeDisplay.textContent = newValue + ' ' + lang.seconds;
    viewTime = newValue * 1000;
    const eventData = {
      setting_type: 'view_time',
      value: newValue,
      session_id: sessionId
    };
    gtag('event', 'change_settings', eventData);
    logDebug('View time changed', eventData);
    saveSettings();
    setUserProperties();
  }
  lastInteraction = performance.now();
}

function changeAnswer(direction, delta) {
  const input = document.getElementById(direction);
  let currentValue = parseInt(input.value) || 0;
  let newValue = currentValue + delta;
  
  if (newValue >= 0 && newValue <= 80) {
    input.value = newValue;
    logDebug('Answer changed', { direction, delta, newValue });
  }
  lastInteraction = performance.now();
}

// --- Initializers and Event Listeners ---

document.addEventListener('click', (e) => {
    lastInteraction = performance.now();
    // Close language dropdown if open and click is outside
    const languageSelectOptions = document.getElementById('language-select-options');
    if (languageSelectOptions.style.display === 'block' && !e.target.closest('#language-select-container')) {
        languageSelectOptions.style.display = 'none';
        document.getElementById('language-select-selected').setAttribute('aria-expanded', 'false');
    }
});

setInterval(() => {
  if (gameStarted && performance.now() - lastInteraction > 30000) {
    const eventData = {
      pause_duration: 30,
      reason: 'inactivity',
      session_id: sessionId
    };
    gtag('event', 'game_pause', eventData);
    logDebug('Game paused', eventData);
  }
}, 30000);

window.onerror = function(message, source, lineno, colno, error) {
  const eventData = {
    message: message,
    source: source,
    line: lineno,
    column: colno,
    session_id: sessionId
  };
  gtag('event', 'javascript_error', eventData);
  logDebug('JavaScript error', eventData);
};


document.addEventListener('DOMContentLoaded', () => {
    // Assign global element variables
    matchCountDisplay = document.getElementById('match-count');
    viewTimeDisplay = document.getElementById('view-time');

    // Load settings from storage and apply them
    loadSettings();

    // Apply visual states before updating text
    matchCountDisplay.textContent = matchCount;
    
    if (!isDarkTheme) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    const keyboard = document.getElementById('custom-keyboard');
    keyboard.style.display = keyboardEnabled ? 'grid' : 'none';

    // This will update all text content based on loaded state
    changeLanguage();

    // Initial gtag event
    const eventData = {
      platform: 'Telegram WebApp',
      version: '1.0',
      language: currentLanguage,
      session_id: sessionId
    };
    gtag('event', 'game_init', eventData);
    logDebug('Game initialized', eventData);
    setUserProperties();

    // Main controls
    document.getElementById('check-btn').addEventListener('click', checkAnswers);
    document.getElementById('new-game-btn').addEventListener('click', resetGame);
    document.getElementById('game-area').addEventListener('click', handleGameAreaClick);
    document.getElementById('start-btn').addEventListener('click', startGame);

    // Answer adjustments
    document.querySelectorAll('[data-change-answer-direction]').forEach(button => {
        button.addEventListener('click', (e) => {
            const direction = e.currentTarget.dataset.changeAnswerDirection;
            const delta = parseInt(e.currentTarget.dataset.changeAnswerDelta, 10);
            changeAnswer(direction, delta);
        });
    });

    // Custom keyboard
    document.querySelectorAll('[data-add-number]').forEach(button => {
        button.addEventListener('click', e => addNumber(e.currentTarget.dataset.addNumber));
    });
    document.getElementById('delete-number-btn').addEventListener('click', deleteNumber);
    document.getElementById('keyboard-check-btn').addEventListener('click', checkAnswers);
    
    // Settings panel controls
    document.getElementById('settings-btn').addEventListener('click', toggleSettings);
    document.getElementById('toggle-keyboard-btn').addEventListener('click', toggleKeyboard);
    document.getElementById('shadow-btn').addEventListener('click', toggleShadow);
    document.getElementById('rules-btn').addEventListener('click', toggleRules);
    document.getElementById('theme-btn').addEventListener('click', toggleTheme);

    // --- Custom Language Dropdown Setup ---
    const languageSelectSelected = document.getElementById('language-select-selected');
    const languageSelectOptions = document.getElementById('language-select-options');

    // Populate options
    Object.keys(languageMap).forEach(langCode => {
        const option = document.createElement('div');
        option.classList.add('option');
        option.dataset.value = langCode;
        option.textContent = languageMap[langCode];
        option.addEventListener('click', () => {
            currentLanguage = langCode;
            languageSelectSelected.textContent = languageMap[langCode];
            languageSelectOptions.style.display = 'none';
            languageSelectSelected.setAttribute('aria-expanded', 'false');
            changeLanguage(); // Update all text and save settings
        });
        languageSelectOptions.appendChild(option);
    });
    
    // Set initial value from loaded settings
    languageSelectSelected.textContent = languageMap[currentLanguage];
    
    // Toggle dropdown
    languageSelectSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpening = languageSelectOptions.style.display === 'none';
        languageSelectOptions.style.display = isOpening ? 'block' : 'none';
        languageSelectSelected.setAttribute('aria-expanded', isOpening);
    });
    
    // Settings value changers
    document.querySelectorAll('[data-change-match-count]').forEach(button => {
        button.addEventListener('click', e => changeMatchCount(parseInt(e.currentTarget.dataset.changeMatchCount, 10)));
    });
    document.querySelectorAll('[data-change-view-time]').forEach(button => {
        button.addEventListener('click', e => changeViewTime(parseInt(e.currentTarget.dataset.changeViewTime, 10)));
    });

    // Rules
    document.getElementById('close-rules-btn').addEventListener('click', toggleRules);

    // Input focusing
    const inputs = document.querySelectorAll('#result-panel input');
    inputs.forEach(input => {
      input.addEventListener('click', () => {
        inputs.forEach(inp => inp.classList.remove('active'));
        input.classList.add('active');
        activeInput = input;
        lastInteraction = performance.now();
        logDebug('Input selected', { input: input.id });
      });
    });

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
    }
});