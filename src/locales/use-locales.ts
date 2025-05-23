'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { localStorageGetItem } from 'src/utils/storage-available';

import { useSettingsContext } from 'src/components/settings';

import { allLangs, defaultLang } from './config-lang';

// ----------------------------------------------------------------------

export function useLocales() {
  const [currentLang, setCurrentLang] = useState(defaultLang);
  
  // Only run this effect on the client side
  useEffect(() => {
    const langStorage = localStorageGetItem('i18nextLng', '');
    const storedLang = allLangs.find((lang) => lang.value === langStorage);
    if (storedLang) {
      setCurrentLang(storedLang);
    }
  }, []);
  
  return {
    allLangs,
    currentLang,
  };
}

// ----------------------------------------------------------------------

export function useTranslate() {
  const { t, i18n, ready } = useTranslation();

  const settings = useSettingsContext();

  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
      settings.onChangeDirectionByLang(newlang);
    },
    [i18n, settings]
  );

  return {
    t,
    i18n,
    ready,
    onChangeLang,
  };
}
