import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

// Cleanly filter harmless Vite HMR WebSocket connection logs in sandbox iframe environment
if (typeof window !== 'undefined') {
  const isWsMsg = (item: any) => {
    if (!item) return false;
    let str = '';
    if (typeof item === 'string') {
      str = item;
    } else if (item instanceof Error) {
      str = (item.message || '') + ' ' + (item.stack || '');
    } else if (typeof item === 'object') {
      try {
        str = (item.message || '') + ' ' + (item.reason || '') + ' ' + JSON.stringify(item);
      } catch {
        str = String(item);
      }
    } else {
      str = String(item);
    }
    return (
      str.indexOf('WebSocket') !== -1 ||
      str.indexOf('closed without opened') !== -1 ||
      str.indexOf('[vite] connecting') !== -1 ||
      str.indexOf('[vite] failed to connect') !== -1 ||
      str.indexOf('vite:ws') !== -1
    );
  };

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      if (isWsMsg(event.reason)) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
      }
    },
    true
  );

  window.addEventListener(
    'error',
    (event) => {
      if (isWsMsg(event.message || event.error)) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
      }
    },
    true
  );

  const filterMethod = (origFn: any) => {
    if (!origFn) return () => {};
    return function (...args: any[]) {
      for (let i = 0; i < args.length; i++) {
        if (isWsMsg(args[i])) return;
      }
      return origFn.apply(console, args);
    };
  };

  console.log = filterMethod(console.log);
  console.info = filterMethod(console.info);
  console.warn = filterMethod(console.warn);
  console.error = filterMethod(console.error);
  console.debug = filterMethod(console.debug);

  // Sync canonical link dynamically if present
  try {
    const canLink = document.getElementById('canonical-url') as HTMLLinkElement | null;
    if (canLink && window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      canLink.href = window.location.origin + window.location.pathname;
    }
  } catch {}

  // Automatically resolve root-relative asset URLs (/assets/..., /images/...) under subpath deployments like GitHub Pages (/final/)
  const rawBase = import.meta.env.BASE_URL || '/';
  const subpathPrefix = rawBase !== '/' ? rawBase.replace(/\/$/, '') : '';

  if (subpathPrefix) {
    const patchAssetUrl = (url: string): string => {
      if (typeof url !== 'string') return url;
      if (url.startsWith('/assets/') || url.startsWith('/images/')) {
        return subpathPrefix + url;
      }
      const origin = window.location.origin;
      if (url.startsWith(origin + '/assets/') || url.startsWith(origin + '/images/')) {
        return url.replace(origin, origin + subpathPrefix);
      }
      return url;
    };

    // Patch HTMLImageElement src property setter
    const origImgSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    if (origImgSrc && origImgSrc.set) {
      const origSet = origImgSrc.set;
      Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set(val: string) {
          origSet.call(this, patchAssetUrl(val));
        },
        get: origImgSrc.get,
        configurable: true,
        enumerable: true,
      });
    }

    // Patch setAttribute for both src and href
    const origSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name: string, value: string) {
      if (typeof value === 'string' && (name === 'src' || name === 'href')) {
        value = patchAssetUrl(value);
      }
      return origSetAttr.call(this, name, value);
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
