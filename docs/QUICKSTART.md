# Quick Start Guide 🚀

## ✅ Ya compilaste el proyecto

El nodo está listo para usar localmente. Ahora necesitas conectarlo a n8n.

## 📦 Opción 1: Enlazar a n8n (Más Fácil)

### Si n8n está instalado globalmente:

```bash
# Ir a la carpeta de n8n
cd ~/.n8n

# Enlazar el nodo
npm link n8n-nodes-vtex-apis

# Reiniciar n8n
n8n start
```

### Si n8n está en una carpeta personalizada:

```bash
# Ir a la carpeta de tu instalación de n8n
cd /ruta/a/tu/n8n

# Enlazar el nodo
npm link n8n-nodes-vtex-apis

# Reiniciar n8n
npm start
# o
n8n start
```

## 🐳 Opción 2: Docker (Si usas n8n en Docker)

Necesitas montar el volumen:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v /Users/leonardo/Documents/GitHub/vtex-n8n-nodes:/usr/local/lib/node_modules/n8n-nodes-vtex-apis \
  n8nio/n8n
```

## 🔧 Configurar Credenciales en n8n

1. Abre n8n en tu navegador: `http://localhost:5678`
2. Ve a **Settings → Credentials → New**
3. Busca **"VTEX API"**
4. Completa los campos:
   - **Account Name**: Tu cuenta VTEX (ej: `mitienda`)
   - **Environment**: `vtexcommercestable` (normalmente)
   - **App Key**: Tu App Key de VTEX
   - **App Token**: Tu App Token de VTEX
5. Click en **Save**

### ¿Dónde conseguir las credenciales VTEX?

1. Entra a tu Admin VTEX
2. **Configuración de la cuenta → Cuenta → Seguridad → Claves de aplicación**
3. Click en **Generar clave de acceso**
4. Copia el App Key y App Token

## 🧪 Probar el Nodo

1. **Crea un nuevo workflow en n8n**
2. **Añade un nodo "Manual" trigger**
3. **Busca y añade el nodo "VTEX"**
4. **Configura:**
   - Resource: Product
   - Operation: Get Many
5. **Selecciona tus credenciales VTEX**
6. **Click en "Execute Node"**

Si todo está bien, deberías ver una lista de productos de tu tienda VTEX. ✅

## 🛠️ Desarrollo Activo

Si vas a hacer cambios en el código:

```bash
# Terminal 1: Watch mode (recompila automáticamente)
cd /Users/leonardo/Documents/GitHub/vtex-n8n-nodes
npm run dev

# Terminal 2: n8n
n8n start
```

Cada vez que hagas cambios, solo necesitas:
1. El código se recompila automáticamente (con `npm run dev`)
2. Recargar el workflow en n8n (F5 o recargar la página)

## 🐛 Troubleshooting

### El nodo no aparece en n8n

```bash
# Verificar que el link está creado
ls -la ~/.n8n/node_modules/ | grep vtex

# Limpiar cache de n8n
rm -rf ~/.n8n/cache

# Reiniciar n8n completamente
```

### Error de credenciales

- Verifica que el App Key y App Token sean correctos
- Verifica que tengas permisos en la API de VTEX
- Prueba el endpoint manualmente con Postman o curl

### Ver logs de debug

En la terminal donde corre n8n verás los errores. Si necesitas más info:

```bash
# Ejecutar n8n en modo debug
export LOG_LEVEL=debug
n8n start
```

## 📚 Operaciones Disponibles

### Products
- ✅ Create - Crear producto
- ✅ Get - Obtener producto por ID
- ✅ Get Many - Listar productos
- ✅ Update - Actualizar producto
- ✅ Delete - Eliminar producto

### SKUs
- ✅ Create - Crear SKU
- ✅ Get - Obtener SKU por ID
- ✅ Get Many - Listar SKUs
- ✅ Update - Actualizar SKU

### Orders
- ✅ Get - Obtener orden por ID
- ✅ Get Many - Listar órdenes (con filtros)
- ✅ Start Handling - Iniciar manejo de orden
- ✅ Cancel - Cancelar orden

## 🎯 Próximos Recursos a Implementar

- Categories (Categorías)
- Brands (Marcas)
- Inventory (Inventario)
- Pricing (Precios)
- Warehouses (Almacenes)

## 📖 Más Información

- [DEVELOPMENT.md](DEVELOPMENT.md) - Guía completa de desarrollo
- [README.md](README.md) - Documentación general
- [VTEX API Docs](https://developers.vtex.com/docs/api-reference)

## 💬 ¿Necesitas Ayuda?

- Verifica los logs de n8n en la terminal
- Revisa la consola del navegador (F12)
- Chequea que las credenciales sean válidas

