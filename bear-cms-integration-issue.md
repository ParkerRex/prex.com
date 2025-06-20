# 🐻 Bear CMS Integration: Transform Bear into Website CMS

## Overview
Transform Bear note-taking app into a full CMS for prex.com by automatically syncing notes tagged with `#prex.com` to the website. This will enable seamless content creation directly from Bear while maintaining the existing website functionality.

## 🎯 Goals
- Write content naturally in Bear using familiar interface
- Auto-publish content by tagging notes with `#prex.com`
- Support hierarchical tagging (e.g., `#prex.com/tech`, `#prex.com/blog`)
- Real-time sync from Bear to website
- Handle Bear's markdown formats and syntax gracefully
- Maintain existing website features and performance

## 🏗️ Technical Architecture

### Monorepo Migration (Turborepo + Bun)
Since file watchers don't work well with Next.js apps, we need to separate concerns:

```
prex-com/
├── apps/
│   ├── web/                 # Next.js website (current prex.com)
│   └── bear-sync/           # Hono service for Bear integration
├── packages/
│   ├── shared/              # Shared types and utilities
│   ├── bear-client/         # Bear database client
│   └── content-processor/   # MDX/content processing
├── turbo.json
├── package.json
└── bun.lockb
```

### Bear Sync Service (Hono + Bun)
**Location**: `apps/bear-sync/`

**Responsibilities**:
- Monitor Bear's SQLite database for changes
- Query notes tagged with `#prex.com`
- Process and convert content to MDX format
- Generate/update content files for website
- Handle tag mapping and content organization

**Key Components**:
```typescript
// Database watcher using chokidar
const dbWatcher = chokidar.watch(BEAR_DB_PATH)

// Bear database client
class BearClient {
  async getNotesWithTag(tag: string): Promise<BearNote[]>
  async getNoteContent(noteId: string): Promise<string>
  async getNoteTags(noteId: string): Promise<string[]>
}

// Content processor
class ContentProcessor {
  convertBearToMDX(content: string): string
  generateFrontmatter(note: BearNote): Frontmatter
  mapTagsToCategories(tags: string[]): string[]
}
```

## 🔄 Content Sync Workflow

### 1. Detection
- File system watcher monitors Bear's SQLite database
- Triggers on database changes (new notes, edits, deletions)
- Filters for notes containing `#prex.com` tag

### 2. Processing
- Extract note content from Bear's `ZSFNOTE` table
- Parse Bear's markdown syntax and convert to standard MDX
- Generate frontmatter from note metadata:
  ```yaml
  ---
  title: "Note Title"
  date: "2024-06-19"
  tags: ["tech", "nextjs"]
  slug: "note-title"
  bearId: "unique-bear-identifier"
  ---
  ```

### 3. Content Generation
- Create/update MDX files in `apps/web/posts/`
- Handle tag mapping gracefully:
  - `#prex.com/tech` → tech category
  - `#prex.com/blog/javascript` → blog category, javascript tag
  - Unknown tags → create new or map to "uncategorized"

### 4. Website Update
- Trigger Next.js rebuild/revalidation
- Update blog indexes and tag pages
- Deploy updated content

## 📊 Bear Database Schema
Based on research, Bear's SQLite database structure:

```sql
-- Main notes table
ZSFNOTE (
  Z_PK INTEGER PRIMARY KEY,
  ZUNIQUEIDENTIFIER VARCHAR,
  ZTITLE VARCHAR,
  ZTEXT VARCHAR,          -- Note content
  ZCREATIONDATE TIMESTAMP,
  ZMODIFICATIONDATE TIMESTAMP
)

-- Tags and note relationships
ZSFNOTETAG (note-tag relationships)
Z_5TAGS (tag definitions)
```

## 🏷️ Tag Mapping Strategy

### Hierarchical Tags
- `#prex.com` → publish to website
- `#prex.com/blog` → blog category
- `#prex.com/tech` → tech category
- `#prex.com/blog/javascript` → blog category, javascript tag

### Graceful Fallbacks
- Unknown tags → create new category or map to "general"
- Malformed tags → log warning, continue processing
- Duplicate content → use Bear's unique identifier to prevent duplicates

## 🔧 Implementation Plan

### Phase 1: Monorepo Setup
- [ ] Convert current Next.js app to Turborepo monorepo
- [ ] Setup Bun workspaces configuration
- [ ] Create shared packages for types and utilities
- [ ] Migrate existing website to `apps/web/`

### Phase 2: Bear Database Client
- [ ] Create Bear SQLite client (`packages/bear-client/`)
- [ ] Implement note querying by tags
- [ ] Add content extraction and metadata parsing
- [ ] Handle Bear's timestamp format (Core Data)

### Phase 3: Content Processing
- [ ] Build MDX converter (`packages/content-processor/`)
- [ ] Handle Bear's markdown syntax variations
- [ ] Create frontmatter generation
- [ ] Implement tag mapping logic

### Phase 4: Sync Service
- [ ] Setup Hono service (`apps/bear-sync/`)
- [ ] Implement file system watcher with chokidar
- [ ] Create sync pipeline
- [ ] Add error handling and logging

### Phase 5: Integration & Testing
- [ ] Integrate sync service with Next.js app
- [ ] Test content sync workflow
- [ ] Handle edge cases and error scenarios
- [ ] Setup monitoring and alerts

### Phase 6: Deployment & Automation
- [ ] Setup production deployment pipeline
- [ ] Configure automated builds on content changes
- [ ] Add health checks and monitoring
- [ ] Document usage and troubleshooting

## 🚀 Technical Specifications

### Dependencies
```json
{
  "turborepo": "^2.x",
  "hono": "^4.x",
  "chokidar": "^4.x",
  "sqlite3": "^5.x",
  "gray-matter": "^4.x",
  "remark": "^15.x",
  "rehype": "^13.x"
}
```

### Environment Variables
```env
BEAR_DB_PATH=~/Library/Group\ Containers/9K33E3U3T4.net.shinyfrog.bear/Application\ Data/database.sqlite
CONTENT_OUTPUT_DIR=../web/posts
SYNC_INTERVAL=5000
```

### API Endpoints (Hono Service)
```typescript
app.get('/health', (c) => c.json({ status: 'ok' }))
app.post('/sync', async (c) => { /* Manual sync trigger */ })
app.get('/notes/:tag', async (c) => { /* Get notes by tag */ })
app.get('/status', async (c) => { /* Sync status */ })
```

## 🎨 Content Format Support

### Bear Markdown Features
- [x] Standard markdown syntax
- [x] Bear-specific image syntax
- [x] Bear tables
- [x] Bear highlights and markers
- [x] Bear file attachments
- [x] Bear todo items
- [x] Bear nested tags

### Export Format
```markdown
---
title: "My Bear Note"
date: "2024-06-19T10:30:00Z"
tags: ["tech", "javascript"]
category: "blog"
slug: "my-bear-note"
bearId: "ABC123-DEF456"
---

# Content from Bear

This is the content from my Bear note, converted to MDX format.
```

## 🔍 Monitoring & Observability
- Database connection health checks
- Sync operation success/failure rates
- Content processing errors and warnings
- Performance metrics (sync duration, file count)
- Alert on sync failures or database connectivity issues

## 🧪 Testing Strategy
- Unit tests for Bear database client
- Integration tests for content processing
- End-to-end tests for full sync workflow
- Performance tests with large note collections
- Error handling tests for edge cases

## 🔒 Security Considerations
- Read-only access to Bear's database
- Backup Bear database before any operations
- Input sanitization for note content
- Rate limiting for sync operations
- Secure handling of file paths and content

## 📝 Usage Instructions
Once implemented:

1. **Create content**: Write notes in Bear as usual
2. **Tag for publishing**: Add `#prex.com` tag to publish
3. **Organize with sub-tags**: Use `#prex.com/category/tag` for organization
4. **Automatic sync**: Content appears on website within seconds
5. **Edit and update**: Changes in Bear automatically sync to website

## 🔄 Future Enhancements
- Bi-directional sync (website → Bear)
- Draft/preview mode before publishing
- Content scheduling and publication dates
- Image optimization and CDN integration
- SEO optimization suggestions
- Analytics integration for content performance

---

**Estimated Timeline**: 3-4 weeks for full implementation
**Complexity**: High (database integration, file watching, content processing)
**Impact**: High (complete CMS transformation, streamlined content workflow)