import { Tarea } from "./tarea.js";
import { guardarDB, leerDB, } from "../../Tareas-Por-Hacer/helpers/saveFile.js";
import colors from "colors";


class Tareas {

    _listado = {

    };

    get listadoArray() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        })



        return listado;
    }

    constructor() {
        this._listado = {};
    }


    borrarTarea(id = "") {

        if(this._listado[id]){
            delete this._listado[id];
        }
    }


    crearTareaFromArray(tareas = [] ){
 
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(descripcion = "") {
        const tarea = new Tarea(descripcion);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArray.forEach( (tarea, index) => {
            const indice = `${index + 1}`;

            const {completadoEn, description} = tarea;

            if(completadoEn === null){
                console.log(`${indice}. ${description} :: ${"Pendiente".red}`);
            }else{
                console.log(`${indice}. ${description} :: ${"Completada".green}`)
            }
        })
    }

    listarCompletadas() {
        this.listadoArray.forEach( (tarea, index) => {
            const indice = `${index + 1}`;

            const {completadoEn, description} = tarea;

            if(completadoEn !== null){
                console.log(`${indice}. ${description} :: ${"Completada".green} en la fecha de ${completadoEn.green}`);
            }
        })
    }

    listarNoCompletadas() {
        this.listadoArray.forEach( (tarea, index) => {
            const indice = `${index + 1}`;

            const {completadoEn, description} = tarea;

            if(completadoEn === null){
                console.log(`${indice}. ${description} :: ${"Pendiente".red}`);
            }
        })
    }

    toggleCompletadas( ids = []){

        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArray.forEach(tarea => {

            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }

        });
    }

}

export { Tareas };