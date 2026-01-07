# 🔍 Auditoría Completa vs Documentación Oficial de VTEX

## Estado: ⚠️ ERRORES CRÍTICOS ENCONTRADOS

---

## 1. ✅ **COUPONS - YA CORREGIDO**

### Documentación Oficial:
[VTEX Coupons API Documentation](https://developers.vtex.com/docs/guides/creating-and-managing-coupons-with-promotions-api)

### Error Encontrado:
**La API requiere al menos UNO de estos campos obligatorios:**
- `utmSource` (string) - **OBLIGATORIO** si utmCampaign no se proporciona
- `utmCampaign` (string) - **OBLIGATORIO** si utmSource no se proporciona

### Campos Adicionales Requeridos (según docs):
```json
{
  "couponCode": "string",        // OBLIGATORIO
  "utmSource": "string",         // OBLIGATORIO (o utmCampaign)
  "utmCampaign": "string",       // OPCIONAL si utmSource presente
  "isArchived": false,           // OPCIONAL (default: false)
  "maxItemsPerClient": 1,        // OPCIONAL (default: 1)
  "expirationIntervalPerUse": "00:00:00"  // OPCIONAL
}
```

**✅ STATUS:** CORREGIDO en v0.3.2

**Bug adicional encontrado en v0.3.1:**
- El campo `utmSource` estaba definido en la UI pero NO se estaba extrayendo en el código de ejecución
- **Corregido en v0.3.2:** Ahora se obtiene correctamente con `this.getNodeParameter('utmSource', i)`

---

## 2. ⚠️ **PROMOTIONS - REQUIERE REVISIÓN**

### Documentación Oficial:
[VTEX Promotions API Documentation](https://developers.vtex.com/docs/api-reference/promotions-and-taxes-api)

### Implementación Actual (n8n):
```typescript
Campos Requeridos:
- name ✅
- beginDateUtc ✅
- endDateUtc ✅
- discountType ✅ (custom field - simplificación)
- discountValue ✅ (custom field - simplificación)
```

### ⚠️ PROBLEMA POTENCIAL:
La documentación oficial requiere campos más complejos según el tipo de promoción. Nuestra implementación simplifica esto usando `discountType` (percentage/nominal) y `discountValue`.

**Campos que deberían enviarse a la API de VTEX:**
- Para porcentaje: `percentualDiscountValue`
- Para monto fijo: `nominalDiscountValue`

### 🔧 REVISIÓN NECESARIA:
Verificar que la conversión de `discountType` + `discountValue` a los campos correctos de VTEX funciona correctamente en `Vtex.node.ts`.

---

## 3. ⚠️ **MASTER DATA - REVISIÓN NECESARIA**

### Documentación Oficial:
- [Master Data API v2](https://developers.vtex.com/docs/api-reference/master-data-api-v2)
- [Master Data API v1](https://developers.vtex.com/docs/guides/master-data-api-v1-overview)

### Implementación Actual:
```typescript
Operations:
- createDocument ✅
- getDocument ✅
- updateDocument ✅
- deleteDocument ✅
- searchDocuments ✅
- getClientByEmail ✅ (shortcut para CL entity)
```

### ✅ CAMPOS CORRECTOS:
```json
{
  "entity": "CL|AD|custom",     // ✅ Correcto
  "document": { ... },           // ✅ Correcto (JSON)
  "documentId": "string",        // ✅ Correcto
  "_where": "field=value",       // ✅ Correcto
  "_fields": "field1,field2",    // ✅ Correcto
  "_size": 10,                   // ✅ Correcto
  "_page": 1,                    // ✅ Correcto
  "_sort": "field DESC"          // ✅ Correcto
}
```

**✅ STATUS:** Parece correcto, pero necesita testing con entidad CL real

---

## 4. 🔍 **COMPARACIÓN: MCP vs n8n vs Documentación**

### COUPONS:

| Campo | MCP | n8n (antes) | n8n (ahora) | Docs VTEX |
|-------|-----|-------------|-------------|-----------|
| couponCode | ✅ | ✅ | ✅ | **REQUIRED** |
| utmSource | ❌ | ❌ | ✅ | **REQUIRED*** |
| utmCampaign | ❌ | ❌ | ✅ | OPTIONAL |
| maxItemsPerClient | ✅ | ✅ | ✅ | OPTIONAL |
| isArchived | ❌ | ❌ | ✅ | OPTIONAL |
| expirationIntervalPerUse | ❌ | ❌ | ✅ | OPTIONAL |

**CONCLUSIÓN:** El MCP también tiene el bug de Coupons! ⚠️

---

### PROMOTIONS:

| Campo | MCP | n8n | Docs VTEX |
|-------|-----|-----|-----------|
| name | ✅ | ✅ | **REQUIRED** |
| beginDateUtc | ✅ | ✅ | **REQUIRED** |
| endDateUtc | ✅ | ✅ | **REQUIRED** |
| percentualDiscountValue | ✅ | ✅* | OPTIONAL |
| nominalDiscountValue | ✅ | ✅* | OPTIONAL |
| description | ✅ | ✅ | OPTIONAL |
| isActive | ✅ | ✅ | OPTIONAL |
| type | ✅ | ✅ | OPTIONAL |

*n8n usa `discountType` + `discountValue` que se convierten a los campos correctos

**CONCLUSIÓN:** Necesita verificación de la conversión de campos ⚠️

---

### MASTER DATA:

| Campo | MCP | n8n | Docs VTEX |
|-------|-----|-----|-----------|
| entity | ✅ | ✅ | **REQUIRED** |
| document | ✅ | ✅ | **REQUIRED** |
| _where | ✅ | ✅ | OPTIONAL |
| _fields | ✅ | ✅ | OPTIONAL |
| _size | ✅ | ✅ | OPTIONAL |
| _page | ✅ | ✅ | OPTIONAL |
| _sort | ✅ | ✅ | OPTIONAL |

**CONCLUSIÓN:** Parece correcto ✅

---

## 5. 🎯 **ACCIONES REQUERIDAS**

### ✅ Completadas:
1. [x] Coupon - Agregado campos obligatorios utmSource/utmCampaign
2. [x] Coupon - Agregados todos los campos opcionales según docs

### ⚠️ Pendientes:
1. [ ] **PROMOTIONS** - Verificar conversión de discountType a API fields
2. [ ] **PROMOTIONS** - Verificar estructura completa según tipo de promoción
3. [ ] **MASTER DATA** - Testing completo con datos reales
4. [ ] **Actualizar MCP** - Reportar bug de Coupons al repositorio original

---

## 6. 📚 **Referencias Oficiales**

1. **Coupons:**
   - https://developers.vtex.com/docs/guides/creating-and-managing-coupons-with-promotions-api
   - https://developers.vtex.com/docs/api-reference/promotions-and-taxes-api#post-/api/rnb/pvt/coupon

2. **Promotions:**
   - https://developers.vtex.com/docs/api-reference/promotions-and-taxes-api#post-/api/rnb/pvt/benefits/calculatorconfiguration
   - https://help.vtex.com/en/tracks/promotions--6asfF1vFYiZgTQtOzwJchR

3. **Master Data:**
   - https://developers.vtex.com/docs/api-reference/master-data-api-v2
   - https://developers.vtex.com/docs/guides/master-data-api-v1-overview

---

## 7. 🔄 **PRÓXIMOS PASOS**

1. ✅ Recompilar y desplegar corrección de Coupons
2. ⏳ Revisar implementación de Promotions en Vtex.node.ts
3. ⏳ Testing exhaustivo de Master Data
4. ⏳ Documentar todas las correcciones en CHANGELOG
5. ⏳ Crear issues en repo MCP sobre bugs encontrados

