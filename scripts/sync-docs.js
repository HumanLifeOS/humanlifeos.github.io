#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)

const TEMP_DIR = path.join(projectRoot, '.sync-temp')
const OFFICIAL_REPO = 'https://github.com/vuejs/vitepress.git'

const SYNC_DIRS = [
  'snippets',
  'components',
]

const SYNC_FILES = [
  '.postcssrc.json',
]

function existsSync(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

function rmSync(p) {
  try {
    fs.rmSync(p, { recursive: true, force: true })
  } catch {}
}

function copyDirSync(src, dest) {
  if (!existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function main() {
  console.log('🔄 开始同步 VitePress 官方程序文件...')

  try {
    rmSync(TEMP_DIR)

    console.log('📥 克隆官方仓库...')
    execSync(`git clone ${OFFICIAL_REPO} ${TEMP_DIR} --depth 1`, {
      stdio: 'ignore'
    })

    const docsDir = path.join(TEMP_DIR, 'docs')

    if (!existsSync(docsDir)) {
      throw new Error('官方仓库中未找到 docs 目录')
    }

    const officialEntries = fs.readdirSync(docsDir, { withFileTypes: true })
    const officialDirs = officialEntries
      .filter(e => e.isDirectory())
      .map(e => e.name)
    const officialFiles = officialEntries
      .filter(e => e.isFile())
      .map(e => e.name)

    const newDirs = officialDirs.filter(d => !SYNC_DIRS.includes(d))
    const missingDirs = SYNC_DIRS.filter(d => !officialDirs.includes(d))
    
    const newFiles = officialFiles.filter(f => !SYNC_FILES.includes(f) && f !== 'package.json' && !f.startsWith('.'))
    const missingFiles = SYNC_FILES.filter(f => !officialFiles.includes(f))

    if (newDirs.length > 0) {
      console.log('\n⚠️  检测到官方新增目录（已忽略，不同步文档）：')
      newDirs.forEach(dir => console.log(`  • ${dir}/`))
    }

    if (missingDirs.length > 0) {
      console.log('\n⚠️  检测到官方已删除目录：')
      missingDirs.forEach(dir => console.log(`  • ${dir}/`))
      console.log('请考虑是否需要从同步脚本中移除！')
    }

    if (newFiles.length > 0) {
      console.log('\n⚠️  检测到官方新增文件（已忽略，不同步文档）：')
      newFiles.forEach(file => console.log(`  • ${file}`))
    }

    if (missingFiles.length > 0) {
      console.log('\n⚠️  检测到官方已删除文件：')
      missingFiles.forEach(file => console.log(`  • ${file}`))
      console.log('请考虑是否需要从同步脚本中移除！')
    }

    for (const dir of SYNC_DIRS) {
      const source = path.join(docsDir, dir)
      const target = path.join(projectRoot, dir)

      if (existsSync(source)) {
        console.log(`\n📤 同步 ${dir}/ ...`)
        rmSync(target)
        copyDirSync(source, target)
      }
    }

    for (const file of SYNC_FILES) {
      const source = path.join(docsDir, file)
      const target = path.join(projectRoot, file)
      if (existsSync(source)) {
        console.log(`📤 同步 ${file} ...`)
        fs.copyFileSync(source, target)
      }
    }

    rmSync(TEMP_DIR)

    console.log('\n✅ 同步完成！')
    console.log('\n同步内容（仅程序文件）：')
    SYNC_DIRS.forEach(dir => console.log(`  • ${dir}/`))
    SYNC_FILES.forEach(file => console.log(`  • ${file}`))
    console.log('\n以下文件保留自定义版本（未被覆盖）：')
    const customFiles = [
      'package.json',
      '.vitepress/config.ts',
      '.vitepress/theme/index.ts',
      '.vitepress/theme/styles.css',
      '.gitignore',
      'config.ts',
      'en/',
      'zh/',
    ]
    customFiles.forEach(file => {
      if (existsSync(path.join(projectRoot, file))) {
        console.log(`  • ${file}`)
      }
    })

  } catch (error) {
    console.error('\n❌ 同步失败:', error.message)
    rmSync(TEMP_DIR)
    process.exit(1)
  }
}

main()
