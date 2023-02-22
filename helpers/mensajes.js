require("colors");

const mostrarMenu = () => {

    return new Promise(resolve =>{
        console.clear();
        console.log("---------------------------".bold);
        console.log("    Qué quiere hacer?".bold);
        console.log("---------------------------\n".bold);
        
        console.log(`${"1.".red} Crear tarea`);
        console.log(`${"2.".red} Listar tarea`);
        console.log(`${"3.".red} Listar tareas completadas`);
        console.log(`${"4.".red} Listar tareas pendientes`);
        console.log(`${"5.".red} Completar tareas`);
        console.log(`${"6.".red} Borrar tarea`);
        console.log(`${"7.".red} Salir\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readLine.question('Seleccione una opción:', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
    


}


const pausa = () => {

    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question(`\nPresiones ${"ENTER".bold} para continuar\n`, (opt) => {
            readLine.close();
            resolve();
        });



    });
    
}

module.exports ={
    mostrarMenu,
    pausa
}
