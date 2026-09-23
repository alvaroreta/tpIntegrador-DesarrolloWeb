import { supabase } from './supabaseClient';

//-- Función de lectura (R) selecciona de la tabla publicaciones los campos de ID, TITULO, CONTENIDO, Y FECHA DE CREACIÓN y los extrae ordenandolos de manera descendente.
export async function obtenerPublicaciones() {
    return supabase
        .from("publicaciones")
        .select("id, titulo, contenido, creado_en")
        .order("creado_en", { ascending: false });
}

//-- Función de Creación (C), inserta registro de titulo y contenido a la tabla publicaciones
export async function crearPublicacion({ titulo, contenido }) {
    return supabase
        .from("publicaciones")
        .insert({ titulo, contenido });
}

//-- Función de actualizar (U), actualiza el valor del registro identiicado mediante si ID.
export async function actualizarPublicacion(id, cambios) {
    return supabase
        .from("publicaciones")
        .update(cambios)
        .eq("id", id);
}

//-- Función de eliminación (D), elimina el registro identificado mediante su ID.
export async function eliminarPublicacion(id) {
    return supabase
        .from("publicaciones")
        .delete()
        .eq("id", id);
}