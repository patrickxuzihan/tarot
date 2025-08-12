// ThemesHelper.js — 扩展主题令牌（支持更多页面的换肤）
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const THEMES = {
  mysticPurple: {
    key: 'mysticPurple',
    dark: true,
    colors: {
      /* 背景与面板 */
      bg: '#1a0d33',
      surface: 'rgba(32,20,56,0.7)',
      surfaceCard: 'rgba(38,26,61,0.8)',
      surfaceGlass: 'rgba(255,255,255,0.15)',
      surfaceLine: 'rgba(255,255,255,0.10)',
      surfaceCardBorder: 'rgba(255,255,255,0.10)',

      /* 文本 */
      text: '#FFFFFF',
      subtext: '#D9C8FF',
      textMuted: '#B8B8C7',
      textInverse: '#0F1020',

      /* 边框与主色 */
      border: 'rgba(130,90,180,0.8)',
      brandPrimary: '#9933FF',
      accent: '#9D5CFF',

      /* 语义色/装饰 */
      stateSuccess: '#06D6A0',
      stateWarning: '#FFD166',
      stateError:   '#FF6B6B',
      stateInfo:    '#118AB2',
      accentGold:   '#FFD700',
      accentViolet: '#B266FF',

      /* 输入控件 */
      inputBg: 'rgba(255,255,255,0.08)',
      inputBorder: 'rgba(255,255,255,0.25)',
      inputPlaceholder: 'rgba(255,255,255,0.6)',

      /* 按钮 */
      buttonPrimaryBg: '#9933FF',
      buttonPrimaryText: '#FFFFFF',
      buttonPrimaryDisabledBg: 'rgba(200,200,200,0.35)',

      /* 其它 */
      pill: 'rgba(118,58,168,0.85)',
      badgeRing: 'rgba(214,185,255,0.8)',
      headerBg: '#4a2179',
      tabActive: '#FFFFFF',
      tabInactive: '#AAAAAA',
    },
    /* 默认渐变（兼容旧用法） */
    gradient: ['#1a0d33', '#241040', '#321857'],
    /* 多套渐变（新） */
    gradients: {
      panel: ['#1a0d33', '#241040', '#321857'],
      auth:  ['#260D40', '#401966'],
      deep:  ['#0d041d', '#1d0838', '#2d1251'],
    },
  },

  silverNoir: {
    key: 'silverNoir',
    dark: true,
    colors: {
      /* 背景与面板 */
      bg: '#0d0e15',
      surface: 'rgba(22,24,34,0.7)',
      surfaceCard: 'rgba(28,30,42,0.8)',
      surfaceGlass: 'rgba(255,255,255,0.12)',
      surfaceLine: 'rgba(255,255,255,0.12)',
      surfaceCardBorder: 'rgba(255,255,255,0.12)',

      /* 文本 */
      text: '#F3F4FF',
      subtext: '#C9CBE6',
      textMuted: '#9AA0B4',
      textInverse: '#0F1020',

      /* 边框与主色 */
      border: 'rgba(120,130,160,0.7)',
      brandPrimary: '#D6DAE8',
      accent: '#D6DAE8',

      /* 语义色/装饰 */
      stateSuccess: '#4ED3A1',
      stateWarning: '#E7C564',
      stateError:   '#D96A6A',
      stateInfo:    '#5BA7D1',
      accentGold:   '#E6C65B',
      accentViolet: '#B5BAFF',

      /* 输入控件 */
      inputBg: 'rgba(255,255,255,0.06)',
      inputBorder: 'rgba(255,255,255,0.18)',
      inputPlaceholder: '#AAB0C0',

      /* 按钮 */
      buttonPrimaryBg: '#D6DAE8',
      buttonPrimaryText: '#0F1020',
      buttonPrimaryDisabledBg: 'rgba(200,200,200,0.35)',

      /* 其它 */
      pill: 'rgba(140,150,175,0.85)',
      badgeRing: 'rgba(180,185,210,0.8)',
      headerBg: '#262a3c',
      tabActive: '#F3F4FF',
      tabInactive: '#9AA0B4',
    },
    gradient: ['#0d0e15', '#10121b', '#131524'],
    gradients: {
      panel: ['#0d0e15', '#10121b', '#131524'],
      auth:  ['#0f1117', '#121624', '#161a2e'],
      deep:  ['#0a0b12', '#0f111b', '#14172a'],
    },
  },
};

export const DEFAULT_THEME_KEY = 'mysticPurple';

const STORE_KEY = 'app.theme';
const ThemeCtx = createContext(null);

export function ThemeProvider({ children, initialKey = DEFAULT_THEME_KEY }) {
  const [key, setKey] = useState(initialKey);

  useEffect(() => {
    (async () => {
      try {
        const k = await AsyncStorage.getItem(STORE_KEY);
        if (k && THEMES[k]) setKey(k);
      } catch {}
    })();
  }, []);

  const setTheme = async (k) => {
    if (!THEMES[k]) return;
    setKey(k);
    try {
      await AsyncStorage.setItem(STORE_KEY, k);
    } catch {}
  };

  const toggle = () => setTheme(key === 'mysticPurple' ? 'silverNoir' : 'mysticPurple');

  const theme = THEMES[key];
  const value = useMemo(
    () => ({
      key,
      theme,
      colors: theme.colors,
      gradient: theme.gradient,     // 兼容旧用法
      gradients: theme.gradients,   // 新：多套渐变
      setTheme,
      toggle,
    }),
    [key]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useAppTheme = () => useContext(ThemeCtx);
