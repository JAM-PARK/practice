// src/mocks/browser.ts

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 브라우저 워커 설정
export const worker = setupWorker(...handlers);