const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    };
    
    save = async (object) => {
        try {
            let arrayObject = [];
            //Si no existe el archivo lo creo --> else 
            if(fs.existsSync(this.nombreArchivo)){
                const allData = await this.getAll();
                // console.log(allData);
                const id = (allData[allData.length - 1].id) + 1;
                object.id = id;
                allData.push(object);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(allData));
                return object.id;
            }else{
                object.id = 1;
                arrayObject.push(object);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrayObject));
                return object.id;
            }
        } catch (error) {
            console.error(`Error al guardar el objeto: ${error.message}`);
        }
    }

    getAll = async () => {
        try {
            let data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log(`Error al leer todos los objetos`);
        }
    }

    getById = async (id) => {
        try{
            const allData = await this.getAll();
            let objectById = allData.filter(object => object.id === id);
            if(objectById === undefined) throw new Error("El id no fue encontrado en el archivo: ");
            else return objectById;
        }catch(error){
            console.log('Error al leer el objeto');
        }
    }

    deleteById = async (id) => {
        try{
            const allData = await this.getAll();
            let newArrayObject = allData.filter(object => object.id !== id);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newArrayObject));
        }catch(error){
            console.log(`Error al eliminar un objeto`);
        }
    }

    deleteAll = async ()=>{
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
        }catch(error){
            console.log(`Error al eliminar todos los objetos`);
        }
    };
};


module.exports = Contenedor;