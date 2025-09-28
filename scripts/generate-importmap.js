#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fontsDir = path.join(process.cwd(), 'src/lib/styles/fonts')
const indexPath = path.join(fontsDir, 'index.ts')
const nodeIndexPath = path.join(fontsDir, 'index.node.ts')
const backupPath = path.join(fontsDir, 'index.ts.backup')

console.log('🔄 Preparing fonts for Node.js runtime...')

// Backup the original index.ts
if (fs.existsSync(indexPath)) {
	fs.copyFileSync(indexPath, backupPath)
	console.log('✅ Backed up original index.ts')
}

// Copy the Node.js safe version
if (fs.existsSync(nodeIndexPath)) {
	fs.copyFileSync(nodeIndexPath, indexPath)
	console.log('✅ Switched to Node.js safe fonts')
}

try {
	console.log('🚀 Running payload generate:importmap...')
	execSync(
		'cross-env NODE_OPTIONS=--no-deprecation IGNORE_LOCAL_FONT=true payload generate:importmap',
		{
			stdio: 'inherit',
			cwd: process.cwd(),
		},
	)
	console.log('✅ Import map generation completed successfully')
} catch (error) {
	console.error('❌ Import map generation failed:', error.message)
	process.exit(1)
} finally {
	// Restore the original index.ts
	if (fs.existsSync(backupPath)) {
		fs.copyFileSync(backupPath, indexPath)
		fs.unlinkSync(backupPath)
		console.log('✅ Restored original fonts')
	}
}
