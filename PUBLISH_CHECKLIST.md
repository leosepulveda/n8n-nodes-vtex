# 📦 Checklist de Publicación en npm

## ✅ Pre-requisitos

### 1. Verificar Sesión npm
```bash
npm whoami
```
- [ ] Sesión activa con usuario correcto

### 2. Verificar Nombre del Paquete
```bash
npm search n8n-nodes-vtex-apis
```
- [ ] Nombre disponible o es tu paquete

### 3. Verificar Git/GitHub
```bash
git remote -v
```
- [ ] Repositorio configurado
- [ ] URL correcta: https://github.com/leosepulveda/n8n-nodes-vtex

---

## 📝 Verificaciones del Proyecto

### package.json
- [x] `name`: "n8n-nodes-vtex-apis" ✅
- [x] `version`: "0.3.2" ✅
- [x] `description`: ✅
- [x] `keywords`: Incluye "n8n-community-node-package" ✅
- [x] `license`: "MIT" ✅
- [x] `author`: ✅
- [x] `repository`: ✅
- [x] `main`: "dist/index.js" ✅
- [x] `files`: ["dist"] ✅
- [x] `n8n` config: ✅

### Archivos Requeridos
- [x] README.md
- [x] CHANGELOG.md
- [x] LICENSE (MIT)
- [x] .npmignore o .gitignore

---

## 🔨 Pre-publicación

### 1. Limpiar y Reconstruir
```bash
cd /Users/leonardo/Documents/GitHub/vtex-n8n-nodes
rm -rf dist node_modules
npm install
npm run build
```

### 2. Verificar Build
```bash
ls -la dist/
# Debe contener:
# - credentials/VtexApi.credentials.js
# - nodes/Vtex/Vtex.node.js
# - index.js
```

### 3. Probar Localmente (Opcional)
```bash
npm pack
# Genera: n8n-nodes-vtex-apis-0.3.2.tgz
```

### 4. Lint (automático en prepublishOnly)
```bash
npm run lint
```

---

## 🚀 Publicación

### Opción 1: Publicación Estándar
```bash
npm publish
```

### Opción 2: Publicación con Acceso Público (primera vez)
```bash
npm publish --access public
```

### Opción 3: Dry Run (para ver qué se publicará)
```bash
npm publish --dry-run
```

---

## ⚠️ Posibles Errores

### Error: "You must be logged in"
```bash
npm login
```

### Error: "Package name taken"
- Cambia el nombre en `package.json`
- O verifica si es tu paquete: `npm owner ls n8n-nodes-vtex-apis`

### Error: "Version already exists"
```bash
# Incrementa la versión
npm version patch  # 0.3.2 → 0.3.3
# o
npm version minor  # 0.3.2 → 0.4.0
# o
npm version major  # 0.3.2 → 1.0.0
```

### Error: "No README"
- Asegúrate de tener README.md en el root

---

## 📊 Post-publicación

### 1. Verificar en npm
```
https://www.npmjs.com/package/n8n-nodes-vtex-apis
```

### 2. Instalar en n8n
```bash
# En tu instancia de n8n
npm install n8n-nodes-vtex-apis
```

### 3. Tag en Git
```bash
git tag v0.3.2
git push origin v0.3.2
```

### 4. GitHub Release
- Ir a: https://github.com/leosepulveda/n8n-nodes-vtex/releases
- Crear release desde tag v0.3.2
- Copiar contenido de CHANGELOG.md

---

## 🔄 Actualizaciones Futuras

### Cada vez que publiques una nueva versión:

1. Actualizar código
2. Actualizar CHANGELOG.md
3. Incrementar versión:
   ```bash
   npm version patch
   # o minor, o major
   ```
4. Build:
   ```bash
   npm run build
   ```
5. Publicar:
   ```bash
   npm publish
   ```
6. Tag y push:
   ```bash
   git push origin main --tags
   ```

---

## 📚 Enlaces Útiles

- npm Package: https://www.npmjs.com/package/n8n-nodes-vtex-apis
- GitHub Repo: https://github.com/leosepulveda/n8n-nodes-vtex
- n8n Community Nodes: https://docs.n8n.io/integrations/community-nodes/
- VTEX Developers: https://developers.vtex.com/

