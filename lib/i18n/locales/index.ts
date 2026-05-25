import { Dictionary, Locale } from '../types';
import { en } from './en';
import { zhTW } from './zh-TW';
import { zhCN } from './zh-CN';
import { ja } from './ja';
import { de } from './de';
import { es } from './es';
import { pt } from './pt';
import { nl } from './nl';
import { ru } from './ru';
import { ar } from './ar';

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  ja,
  de,
  es,
  pt,
  nl,
  ru,
  ar,
};
