# Configuración de EmailJS para el Formulario de Contacto

EmailJS ha sido integrado exitosamente en tu formulario de contacto. Sigue estos pasos para completar la configuración:

## 📋 Pasos de Configuración

### 1. Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita (incluye 200 emails/mes)
3. Verifica tu email

### 2. Configurar Servicio de Email

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Para Gmail:
   - Click en "Connect Account"
   - Autoriza el acceso a tu cuenta de Gmail
5. Copia el **Service ID** (ejemplo: `service_abc123`)

### 3. Crear Template de Email

1. Ve a **"Email Templates"** en el dashboard
2. Haz clic en **"Create New Template"**
3. Configura el template con estas variables:

```
Subject: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

**Ejemplo de template completo:**

```
Subject: Nuevo mensaje de contacto: {{subject}}

Has recibido un nuevo mensaje desde tu portafolio.

De: {{from_name}}
Email: {{from_email}}

Asunto: {{subject}}

Mensaje:
{{message}}

---
Este email fue enviado desde el formulario de contacto de henry-torres.dev
```

4. En la configuración del template:
   - **To Email:** `torrescondorihenry@gmail.com` (o déjalo en blanco para usar el default del servicio)
   - **From Name:** `{{from_name}}`
   - **From Email:** Tu email verificado en EmailJS
   - **Reply To:** `{{from_email}}`

5. Guarda y copia el **Template ID** (ejemplo: `template_xyz789`)

### 4. Obtener Public Key

1. Ve a **"Account"** → **"General"**
2. Encuentra tu **Public Key** (ejemplo: `abcd1234efgh5678`)
3. Copia este valor

### 5. Configurar Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto y reemplaza los valores:

```env
# EmailJS Configuration (for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcd1234efgh5678
```

### 6. Reiniciar el Servidor de Desarrollo

```bash
npm run dev
```

## 🎯 Configuración del Template - Variables Disponibles

Las siguientes variables están configuradas en el código y deben coincidir en tu template de EmailJS:

- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Cuerpo del mensaje
- `{{to_email}}` - Email de destino (torrescondorihenry@gmail.com)

## ✅ Probar el Formulario

1. Ve a tu sitio web en desarrollo
2. Navega a la sección de contacto
3. Completa el formulario con datos de prueba
4. Envía el formulario
5. Deberías recibir un email en `torrescondorihenry@gmail.com`

## 🔒 Seguridad

- Las variables que empiezan con `NEXT_PUBLIC_` son accesibles en el cliente
- EmailJS usa tu Public Key que es segura para uso público
- El Service ID y Template ID también son seguros para el cliente
- **NUNCA** expongas tu Private Key de EmailJS

## 📊 Límites del Plan Gratuito

- 200 emails por mes
- Si necesitas más, considera actualizar a un plan de pago

## 🐛 Troubleshooting

### El formulario no envía emails

1. Verifica que las variables de entorno estén correctamente configuradas
2. Abre la consola del navegador y busca errores
3. Verifica que el Service esté conectado correctamente en EmailJS
4. Asegúrate de que el template tenga las variables correctas

### Error 403

- Verifica que tu Public Key sea correcta
- Asegúrate de que el servicio esté activo en EmailJS

### Emails no llegan

1. Revisa la carpeta de spam
2. Verifica la configuración del template en EmailJS
3. Asegúrate de que el email de destino esté correcto

## 📚 Documentación

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/examples/reactjs/)

## 🎨 Personalización Adicional

Si quieres personalizar más el template de email, puedes:

1. Agregar estilos HTML en el template de EmailJS
2. Incluir tu logo o imágenes
3. Agregar auto-respuesta para el usuario que envía el mensaje
