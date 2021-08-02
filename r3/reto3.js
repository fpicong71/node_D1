
let readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface(
                            {
                                input: process.stdin,
                                output: process.stdout

                            } );

class Persona
{
    name = ""; 
    surname = "";
    age = 0;

    //  Constructor
    constructor(name,surname,age)
    { 
        this.name = name;
        this.surname = surname;
        this.age = age;  
    }

    // Metodo guardar persona
    // con writeFileSync escribo el objeto en formato json (persona.json)
    // contenido es un string que recoge los atributos de persona
    // utf es la codificación en que tiene que guardarse el archivo
    guardarPersona()
    {   
        this.borrarArchivo();
        let contenido= "{";

        contenido += '"name" :' + '"' + this.name + '"' + ',\n';
        contenido +=  '"surname" :'+ '"' + this.surname  + '"' +',\n';
        contenido += '"age" :' +  this.age  +'\n' + "}";
        

        fs.writeFile( "persona.json",
                        contenido, (err)=>
                        {
                            if(err) throw err;
                            console.log("Escrito archivo");                           
                        });
    }

    //Metodo leerPersona
    // Este método lee un archivo Json y lo persenta por pantalla
    // No 
    leerPersona()
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

                            let personaLeida = new Persona (valP[0], valP[1], valP[2]);
                            console.log("\nLeer persona---------\n")
                            for (let atr in personaLeida)
                            {
                                console.log(atr + ": ");
                                console.log(personaLeida[atr] + '\n');
                            }  
                        }
                    });
    }

    //Método para borrar el archivo json antes de guardar otra persona
    //método unlinkSync y se le pasa el archivo a eliminar
    borrarArchivo()
    {
        try {
                fs.unlink('./persona.json');
                console.log('Archivo eliminado');
            } 
        catch(err) 
            {
                console.error('Ocurrio un error mientras se intentaba borrar el archivo', err);
            }

    }
}


function pedirDatos()
{
    let respuesta =[];
    let miPersona ;
    rl.question("name", function(name) 
                {
                    respuesta.push(`${name}`);
                    rl.question("surname: ", function(surname)
                    {
                        respuesta.push(`${surname}`);
                        rl.question("age: ", function(age)
                        {  
                            respuesta.push(`${age}`); 

                            miPersona = new Persona(respuesta[0],respuesta[1],respuesta[2]);
                            miPersona.guardarPersona();
                            miPersona.leerPersona();
                            rl.close();                            
                        });  
                    });
                } );
    
    console.log(miPersona);

    return miPersona;
}

let persona = pedirDatos();





