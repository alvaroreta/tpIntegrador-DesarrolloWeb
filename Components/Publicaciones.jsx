import React from 'react'
import { useState, useEffect } from 'react'
import { obtenerPublicaciones, crearPublicacion, actualizarPublicacion, eliminarPublicacion } from '../src/services/publicaciones'

//-- Crea función Publicaciones con estados de LISTA, CARGANDO, TITULO, CONTENIDO Y DE EDITAR PUBLICACION
export default function Publicaciones() {
    //-- Estado de la lista y carga de publicaciones (lista vacia y true por defecto)
    const [lista, setLista] = useState([])
    const [cargando, setCargando] = useState(true)

    //-- Estado de  titulo y contenido de la publicación creado por usuario (sin texto por defecto)
    const [titulo, setTitulo] = useState("")
    const [contenido, setContenido] = useState("")

    //-- Estado de creación o edición de publicación, si estado = a null esta creando , si remite a una ID de publicación existente, la está actualizando
    const [publicacionEditando, setPublicacionEditando] = useState(null)

    //--UseEffect permite traer datos  de afuera para sincronizar un componente o realizar efectos 
    useEffect(() => {
        CargarDatos()
    }, [])

    //-- crea función de cargar datos desde la BD de manera asincrónica.
    async function CargarDatos() {
        //-- try para realizar manejo de errores junto a la concatenación del mensaje  + error en una alerta mediante catch
        try {
            setCargando(true)
            const respuesta = await obtenerPublicaciones()
            if (respuesta.error) {
                alert('Error: "' + respuesta.error.message)
            }
            else {
                //-- trae lista desde la bade de datos
                setLista(respuesta.data || [])
            }
        } catch (error) {
            alert('Error al contecta a la bd')
            console.error(error)
        } finally {
            //-- carga estado de cargando de True  a False
            setCargando(false)
        }
    }


    //-- crea función de alta y edicion mediante handlesubmit
    async function handlesubmit(accion) {
        //--evitar recargar la pagina o el fomrulario
        accion.preventDefault()
        //--valida que los campos del form no esten en blanco mediante funcion trim()
        if (!titulo.trim() || !contenido.trim()) {
            alert('Complete todos los campos del formulario.')
            return
        }
        try {
            if (publicacionEditando) {
                const { error } = await actualizarPublicacion(publicacionEditando.id, { titulo, contenido })
                if (error) {
                    alert("Error" + error.message)
                    return
                }
            } else {
                const { error } = await crearPublicacion({ titulo, contenido })
                if (error) {
                    alert("Error" + error.message)
                    return
                }
            }

            limpiarFormulario()
            CargarDatos()

        } catch (error) {
            alert("Error")
            console.error(error)
        }
    }

    //-- crea función de borrado de registro
    async function handleBorrar(id) {
        const confirmar = window.confirm("¿Seguro que quieres eliminar la publicación?")
        if (!confirmar) return
        try {
            const { error } = await eliminarPublicacion(id)
            if (error) {
                alert("Error" + error.message)
                return
            }
            CargarDatos()
        } catch (error) {
            alert("Error")
            console.error(error)
        }
    }

    //--funcion que prepara la publicacion a editar 
    function prepararEdicion(pub) {
        setPublicacionEditando(pub)
        setTitulo(pub.titulo)
        setContenido(pub.contenido)
    }

    //-- función que cancela la edición al estar editando mediante el boton "Cancelar"
    function cancelarEdicion() {
        limpiarFormulario()
    }

    //-- función que deja elformulario en blanco
    function limpiarFormulario() {
        setTitulo("")
        setContenido("")
        setPublicacionEditando(null)
    }


    return (
        <div>
            <h2>Publicaciones</h2>
            <form onSubmit={handlesubmit}>
                {publicacionEditando != null ? (
                    <h3>Editar Publicación</h3>
                ) : (
                    <h3>Crear Publicación</h3>
                )}

                <label>Título</label>
                <br />
                <input
                    type="text"
                    value={titulo}
                    onChange={function (e) {
                        setTitulo(e.target.value)
                    }}
                />
                <br />

                <label>Contenido</label>
                <br />
                <textarea
                    rows="5"
                    cols="40"
                    value={contenido}
                    onChange={function (e) {
                        setContenido(e.target.value)
                    }}
                ></textarea>
                <br />

                {publicacionEditando != null ? (
                    <button type="submit">Guardar Cambios</button>
                ) : (
                    <button type="submit">Crear Publicacion</button>
                )}

                {publicacionEditando != null ? (
                    <button type="button" onClick={cancelarEdicion}>Cancelar</button>
                ) : (
                    <span></span>
                )}
            </form>

            <hr />

            <h3>Publicaciones actuales</h3>

            {cargando == true ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {lista.length == 0 ? (
                        <p>No hay publicaciones todavia</p>
                    ) : (
                        <div>
                            {lista.map(function (publi) {
                                return (
                                    <div key={publi.id}>
                                        <h4>{publi.titulo}</h4>
                                        <p>{publi.contenido}</p>
                                        <small>Creado el: {new Date(publi.creado_en).toLocaleString()}</small>
                                        <br />
                                        <button onClick={function () {
                                            prepararEdicion(publi)
                                        }}>Editar</button>
                                        <button onClick={function () {
                                            handleBorrar(publi.id)
                                        }}>Borrar</button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}