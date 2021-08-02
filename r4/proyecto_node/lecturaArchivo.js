const fs = require('fs');

function leerArchivo()
{
     //Leo lo que contiene el archivo
     fs.readFile('./persona.json', 
     (err,data)=>
     {
         if(err) 
         {
             throw err
         }
         else
         {
             //Parseo el contenido del archivo
             let miP = JSON.parse(data); 

             //Recojo una cadena con los parametros a pasar al constructor de Persona
             let valP =[];

             for (let atr in miP)
             {
                 (atr=="age") ? valP.push( miP[atr]) 
                              : valP.push('"' + miP[atr] + '"');       
             }

             let personaLeida = {   "name" : valP[0],
                                    "surname" : valP[1],
                                    "age" : valP[2]
                                };
             console.log("\nLeer persona---------\n")
             for (let atr in personaLeida)
             {
                 console.log(atr + ": ");
                 console.log(personaLeida[atr] + '\n');
             }  
         }
     });

}

module.exports = {leerArchivo}