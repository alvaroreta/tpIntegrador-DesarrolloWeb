El presente proyecto responde a la práctica integral de la materia de Desarrollo Web de la carrera de Tec. Superior en Análisis de Sistemas del Inst. Sup. del Milagro.

**Proceso:**
Al cargar la página se conecta mediante APIKEY a la base de datos de Supabase y renderiza la lista de publicaciones.
El usuario puede eliminar, editar y crear unevas publicaciones mediante formulario y a través de los atributos: TITULO , CONTENIDO.

**Funciones:**

* **Publicaciones ():** Crea los estados por defecto de lista de publicaciones, estado de carga(“Cargando”), atributos de las publicaciones: títulos y contenido y el estado de “Editando Publicación” que sirve como elemento condicional para visualizar el módulo de edición de la publicación.

* **userEffect():** Permite trabajar de manera reactiva con elementos externos, en este caso los datos (publicaciones) consultados a la BD.

* **CargarDatos():** Renderiza la página con los datos de las publicaciones existentes en la BD.

* **handlesubmit():**  Interactúa con las acciones del formulario: 
  * **preventDefault():** evita recargar el formulario al recargar la página.
  * **trim():** permite la operación comparativa para la validación del formulario, si está en blanco emite alerta de “'Complete todos los campos del formulario.'

* **handleBorrar():** interactúa con el botón “borrar” en cada publicación, se confirma mediante la aceptación del usuario con la función window.confirm()

* **prepararEdicion():** Se activa mediante el botón “Editar” de cada publicación y permite cargar los atributos de la publicaciones: título y contenido para su actualización.

* **cancelarEdicion():** Existe mientras el estado publicacionEditando sea True y permite cancelar la actualización de los atributos de la publicación.

* **limpiarFormulario():** Función que limpia el formulario al enviar una nuevo registro de publicación a la base de datos y al cancelar la educación de una publicación.

***Las funciones cuentan con manejo de errores mediante el uso de catch(variable:error) y mensajes de alerta.

RETAMOSO, ALVARO FRANCISCO.
DNI 37636419