import '@testing-library/jest-dom';
import React from 'react';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => (
      <div ref={ref} {...props}>{children}</div>
    )),
    h1: React.forwardRef<HTMLHeadingElement, any>(({ children, ...props }, ref) => (
      <h1 ref={ref} {...props}>{children}</h1>
    )),
    h2: React.forwardRef<HTMLHeadingElement, any>(({ children, ...props }, ref) => (
      <h2 ref={ref} {...props}>{children}</h2>
    )),
    h3: React.forwardRef<HTMLHeadingElement, any>(({ children, ...props }, ref) => (
      <h3 ref={ref} {...props}>{children}</h3>
    )),
    p: React.forwardRef<HTMLParagraphElement, any>(({ children, ...props }, ref) => (
      <p ref={ref} {...props}>{children}</p>
    )),
    span: React.forwardRef<HTMLSpanElement, any>(({ children, ...props }, ref) => (
      <span ref={ref} {...props}>{children}</span>
    )),
    button: React.forwardRef<HTMLButtonElement, any>(({ children, ...props }, ref) => (
      <button ref={ref} {...props}>{children}</button>
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock window.scrollTo
global.scrollTo = jest.fn();

// ✅ FIXED IntersectionObserver mock
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}
global.IntersectionObserver = MockIntersectionObserver;

// Optional: ResizeObserver mock (safe fallback)
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.ResizeObserver = MockResizeObserver;

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
  Toaster: () => null,
}));