const fs = require('fs');

class ProductManager {
    constructor (path) {
        this.path = path
        }
        
        //async addProduct(title, description, price, thumbnail, code, stock){
        async addProduct(product){
            try {
                const productsFile = await this.getProducts();
                if (!product.title || !product.description || product.price === 0 || !product.thumbnail || !product.code) { // verifica que los valores estén vacios o que el precio sea 0, el stock puede ser 0.
                    console.log(`Check ${product.code} parámetros: todos los parámetros son obligatorios, solo el stock puede ser 0`);
                    return false;
                } else {
                    const checkproduct = await this.#checkCode(product.code) // verifica que el código no exista.
                    if (checkproduct==='OK') {
                        const newProduct = {
                            ...product,
                            id: await this.#getMaxID() + 1 //---busca el máx id creado para crear el siguiente---//
                        }
                        productsFile.push(newProduct);
                        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                        console.log(`Producto ${product.code} creado`)
                        return `Producto ${product.code} creado`
                    } else {
                        console.log(`No se pudo crear el producto ${product.code}: el código ya existe`)
                        return `No se pudo crear el producto ${product.code}: el código ya existe`}
                    }
                }
                catch (error){
                    console.log(error);
                }
            }
            
        async getProducts(){
            try {
                if(fs.existsSync(this.path)){ // verificar que existe el archivo
                    const products = await fs.promises.readFile(this.path, 'utf-8');
                    const productsJs = JSON.parse(products);
                    return productsJs;
                } else {
                    //---si no existe, simula un array vacío---//
                    return [] 
                }
            }
            catch (error){
                console.log(error);
            }
        }
            
        //---busca un codigo de producto y devuelve OK si no existe, y Error si existe.---//
        async #checkCode(codeProduct){  
            try {
                const productsFile = await this.getProducts();
                if (!productsFile.find(product => product.code === codeProduct)) {
                    const exists = 'OK'
                    return exists
                } else {
                    const exists = 'Error'
                    return exists
                }    
                }
            catch (error){
                console.log(error);
            }
        }
            
        //---busca el ultimo ID creado---//
        async #getMaxID(){ 
            try {
                const productsFile = await this.getProducts();
                const ids = productsFile.map(product => product.id)
                if (ids.includes(1)) {
                    return Math.max(...ids)
                } else {
                    return 0
                }
            }
            catch (error){
                console.log(error);
            } 
        }
                
    async getProductById(productId){
        try {
            const productsFile = await this.getProducts();
            const idProduct = productsFile.find(product => product.id === productId)
            if (idProduct) {
                console.log(`Mostrando producto id ${productId} info: `, idProduct);
                return idProduct
            } else {
                console.log(`Error al mostrar el producto: id ${productId} no existe`)
                return `Error al mostrar el producto: id ${productId} no existe`
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    //async updateProduct(productId,title, description, price, thumbnail, code, stock){ // actualiza el o los datos del producto y mantiene el id
    async updateProduct(product){ // actualiza el o los datos del producto y mantiene el id
        try {
            const productsFile = await this.getProducts();
            const productId = product.id;
            const idPosition = productsFile.findIndex(product => product.id === productId);
            if(idPosition > -1){
                    if(product.title!==''){productsFile[idPosition].title = product.title};
                    if(product.description!==''){productsFile[idPosition].description = product.description};
                    if(product.price>0){productsFile[idPosition].price = product.price};
                    if(product.thumbnail!==''){productsFile[idPosition].thumbnail = product.thumbnail};
                    if(product.code!==''){productsFile[idPosition].code = product.code};
                    if(product.stock>0){productsFile[idPosition].stock = product.stock};
                    
                    await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                    console.log(`Producto id ${productId} ha sido actualizado`);
                    return `Producto id ${productId} ha sido actualizado`;
            } else {
                console.log(`Actualización fallida: Producto id ${productId} no existe`);
                return `Actualización fallida: Producto id ${productId} no existe`;
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    //---elimina el producto, con ese id, del archivo---//
    async deleteProduct(productId){ 
        try {
            const productsFile = await this.getProducts();
            const idPosition = productsFile.findIndex(product => product.id === productId);
            if(idPosition>-1){
                productsFile.splice(idPosition,1);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                console.log(`Producto id ${productId} ha sido eliminado`)
                return `Producto id ${productId} ha sido eliminado`
            } else {
                console.log(`Eliminación fallida: Producto id ${productId} no existe`)
                return `Eliminación fallida: Producto id ${productId} no existe`
            }
        }
        catch (error){
            console.log(error);
        }
    }
}


const manager = new ProductManager('./products.json')

const product1 = {
    title:'Galaxy S22',
    description:'Samsung Galaxy S22 color white',
    price:5000,
    thumbnail:'Sin imagen',
    code:'PT001',
    stock:0
}
const product2 = {
    title:'Airpods',
    description:'Airpods color white compatible con Iphone',
    price:15000,
    thumbnail:'Sin imagen',
    code:'PT001',
    stock:5
}
const product3 = {
    title:'LG-G8',
    description:'LG-8 color blue',
    price:6000,
    thumbnail:'Sin imagen',
    code:'PT002',
    stock:10
}
const product4 = {
    title:'Silla madera negra',
    description:'Silla de madera de pino negra',
    price:6000,
    thumbnail:'Sin imagen',
    code:'PT003',
    stock:10
}
const product5 = {
    title:'Galaxy Z Flip',
    description:'Samsung Galaxy Z Flip color black',
    price:6000,
    thumbnail:'Sin imagen',
    code:'PT004',
    stock:10
}
const product6 = {
    title:'Iphone X',
    description:'Iphone X color black sellado en caja',
    price:5000,
    thumbnail:'Sin imagen',
    code:'PT005',
    stock:10 ,
};

const test = async ()=>{
     console.log('Complete product list: ', await manager.getProducts());
     await manager.addProduct(product1); //---stock en 0 OK---//
     await manager.addProduct(product2); //---Error: codigo existente---//
     await manager.addProduct(product3);
     await manager.addProduct(product4);
     await manager.addProduct(product5);
     await manager.addProduct(product6);
     console.log('Complete product list: ', await manager.getProducts());
     await manager.getProductById(3);
     await manager.getProductById(6);
     await manager.updateProduct(productUpd1);
     await manager.updateProduct(productUpd2);
     await manager.getProductById(3);
     await manager.deleteProduct(4);
     await manager.deleteProduct(6);
     console.log('Complete product list: ', await manager.getProducts());
 }

test()