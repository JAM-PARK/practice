import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // Service Worker 시작
  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js', // 서비스 워커 파일 경로
    },
    onUnhandledRequest: 'bypass', // 정의되지 않은 요청은 실제 네트워크로 전달
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
