/**
 * Node.js safe font configuration for Payload type generation
 * This file provides fallback font configurations that don't rely on next/font/google
 * which is not available during Node.js runtime (e.g., payload generate:types)
 */
import { sans, serif, mono } from './candyland'

export { sans, serif, mono }
