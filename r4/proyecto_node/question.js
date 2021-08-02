let readline = require('readline');
let fs = require('fs');

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout

    } );

function question()
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

                            miPersona = {"name" : respuesta[0],
                                          "surname" : respuesta[1],
                                          "age" : respuesta[2]}

                            let contenido= "{";

                            contenido += '"name" :' + '"' + miPersona.name + '"' + ',\n';
                            contenido +=  '"surname" :'+ '"' + miPersona.surname  + '"' +',\n';
                            contenido += '"age" :' +  miPersona.age  +'\n' + "}";
                                                
                            fs.writeFile( "persona.json",
                                            contenido, (err)=>
                                            {
                                                if(err) throw err;
                                                console.log("Escrito archivo");                           
                                            });
                            rl.close();                            
                        });  
                    });
                } );

}

module.exports = {question}