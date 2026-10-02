import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// O jsdom não implementa rolagem; o ScrollRestoration do React Router a usa.
if (typeof window !== 'undefined') {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
  Element.prototype.scrollIntoView = vi.fn()
}

afterEach(() => {
  cleanup()
})
