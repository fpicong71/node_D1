
const fs = require('fs');

class Persona
{
    //  Constructor
    constructor(name, surname, age)
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
    {   this.borrarArchivo();
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
                fs.unlinkSync('./persona.json');
                console.log('Archivo eliminado');
            } 
        catch(err) 
            {
                console.error('Ocurrio un error mientras se intentaba borrar el archivo', err);
            }

    }


}

let pers1 = new Persona("Juan","Martinez",36);

pers1.guardarPersona();

let pers2 = pers1.leerPersona();
