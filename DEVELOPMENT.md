# Development Guide

## Local Testing (Without Publishing to npm)

### Method 1: Using npm link (Recommended)

1. **Build the project:**
```bash
cd /Users/leonardo/Documents/GitHub/vtex-n8n-nodes
npm install
npm run build
```

2. **Create a global symlink:**
```bash
npm link
```

3. **Link to your n8n installation:**

If you're running n8n globally:
```bash
cd ~/.n8n
npm link n8n-nodes-vtex-apis
```

If you're running n8n from a custom directory:
```bash
cd /path/to/your/n8n
npm link n8n-nodes-vtex-apis
```

4. **Restart n8n:**
```bash
# If running globally
n8n start

# If running with npx
npx n8n start

# If running with docker, you'll need to mount the volume
```

5. **Watch mode for development:**
```bash
npm run dev
```
This will automatically rebuild when you make changes.

### Method 2: Using Custom Nodes Folder

You can also tell n8n to load nodes from a custom folder:

1. **Set environment variable:**
```bash
export N8N_CUSTOM_EXTENSIONS="~/.n8n/custom"
```

2. **Create custom folder and link:**
```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
ln -s /Users/leonardo/Documents/GitHub/vtex-n8n-nodes n8n-nodes-vtex-apis
```

3. **Build and start n8n:**
```bash
cd /Users/leonardo/Documents/GitHub/vtex-n8n-nodes
npm install
npm run build
n8n start
```

### Method 3: Direct Path in n8n

Edit your n8n config to point directly to your node:

```bash
# Add to ~/.n8n/config
export N8N_NODES_EXCLUDE=""
export N8N_CUSTOM_EXTENSIONS="/Users/leonardo/Documents/GitHub/vtex-n8n-nodes"
```

## Testing Workflow

1. **Create a test workflow in n8n**
2. **Add your VTEX credentials**
3. **Test each operation:**
   - Get a product
   - List products
   - Create a product
   - Update a product
   - List orders
   - etc.

## Publishing to npm (When Ready)

### Prerequisites

1. **Create npm account** (if you don't have one):
```bash
npm login
```

2. **Verify package name is available:**
```bash
npm search n8n-nodes-vtex-apis
```

### Publishing Steps

1. **Final build and test:**
```bash
npm run build
npm run lint
```

2. **Publish:**
```bash
npm publish
```

3. **If you want a scoped package:**
```bash
# Update package.json name to @yourusername/n8n-nodes-vtex-apis
npm publish --access public
```

### Version Updates

```bash
# Patch version (bug fixes): 0.1.0 -> 0.1.1
npm version patch

# Minor version (new features): 0.1.0 -> 0.2.0
npm version minor

# Major version (breaking changes): 0.1.0 -> 1.0.0
npm version major

# Then publish
npm publish
```

## Troubleshooting

### Node not showing up in n8n

1. Check n8n logs for errors
2. Verify the build was successful (check `dist/` folder)
3. Restart n8n completely
4. Check that credentials are properly defined
5. Try clearing n8n cache: `rm -rf ~/.n8n/cache`

### TypeScript errors

```bash
npm run lint
npm run lintfix
```

### Build errors

```bash
# Clean and rebuild
rm -rf dist/
npm run build
```

### Testing specific operations

Create a simple test workflow in n8n with:
1. Manual trigger
2. VTEX node
3. Set node to see the output

Check the execution logs for any errors.

## Development Tips

1. **Use watch mode** (`npm run dev`) while developing
2. **Check n8n logs** in the terminal for debugging
3. **Use the node's "Execute workflow" button** to test
4. **Add console.log** statements and check n8n logs
5. **Test with real VTEX credentials** from a test store

## Debugging

Add console.error to see logs in n8n:

```typescript
console.error('DEBUG:', someVariable);
```

These will appear in the n8n terminal output.

