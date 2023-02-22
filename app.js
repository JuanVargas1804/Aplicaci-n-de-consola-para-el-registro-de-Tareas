//Importación de todas las funciones necesarias para el funcionamiento

import colors from "colors";
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoCheckList } from "./helpers/inquirer.js";
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";
import { guardarDB, leerDB, } from "./helpers/saveFile.js";

const main = async () => {



    //Inicialización de instacias y variables
    let opt = "";
    const tareas = new Tareas();

    const leer = leerDB();

    if (leer) {
        tareas.crearTareaFromArray(leer);
    }


    do {
        // Menú que retorna una opción
        opt = await inquirerMenu();


        //Switch para saber que vamos a hacer
        switch (opt) {
            case "1":

                //Añade una tarea con su debida descripción (desc)
                const desc = await leerInput("Ingrese una descripción: ");
                tareas.crearTarea(desc);
                break;

            case "2":

                //Muestra las tareas
                tareas.listadoCompleto();
                break;

            case "3":
                tareas.listarCompletadas();
                break;


            case "4":
                tareas.listarNoCompletadas();
                break;


            case "5":
                const ids = await listadoCheckList(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
                break;


            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArray);
                if(id !== '0'){
                    const ok = await confirmar("¿Está seguro?");
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    } 
                }
                
                break;
        }


        guardarDB(tareas.listadoArray);

        //Pausa la pantalla hasta que el usuario presione enter
        await pausa();
    } while (opt !== "0");
};

main();
