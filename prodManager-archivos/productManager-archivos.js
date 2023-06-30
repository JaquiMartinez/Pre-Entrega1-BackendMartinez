const fs = require('fs');

class ProductManager {
    constructor (path) {
        this.path = path
        }
        
        async addProduct(title, description, price, thumbnail, code, stock){
            try {
                const productsFile = await this.getProducts();
                if (!title || !description || price === 0 || !thumbnail || !code) { //---vverifica que los valores estén vacios o que el precio sea 0, el stock puede ser 0.
                    console.log(`Check ${code} parámetros: todos los parámetros son obligatorios, solo el stock puede ser 0`);
                    return false;
                } else {
                    const checkproduct = await this.#checkCode(code) //---verifica que el código no exista.---//
                    if (checkproduct==='OK') {
                        const product = {
                            id: await this.#getMaxID() + 1, //---busca el max id creado para crear el siguiente
                            code: code,
                            title: title,
                            description: description,
                            price: price,
                            thumbnail: thumbnail,
                            stock: stock,
                        }
                        productsFile.push(product);
                        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                        console.log(`Producto ${code} creado`)
                        return `Producto ${code} creado`
                    } else {
                        console.log(`No se pudo crear el producto ${code}: el código ya existe`)
                        return `No se pudo crear el producto ${code}: el código ya existe`}
                    }
                }
                catch (error){
                    console.log(error);
                }
            }
            
        async getProducts(){
            try {
                if(fs.existsSync(this.path)){ //---verificar que existe el archivo
                    const products = await fs.promises.readFile(this.path, 'utf-8');
                    const productsJs = JSON.parse(products);
                    return productsJs;
                } else {
                    return [] //---si no existe, simula un array vacío
                }
            }
            catch (error){
                console.log(error);
            }
        }
            
        async #checkCode(codeProduct){  //---busca un codigo de producto y devuelve OK si no existe, y Error si existe.
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
            
        async #getMaxID(){ //---busca el ultimo ID creado
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
    
    async updateProduct(productId,title, description, price, thumbnail, code, stock){ // actualiza el o los datos del producto y mantiene el id
        try {
            const productsFile = await this.getProducts();
            const idPosition = productsFile.findIndex(product => product.id === productId);

            if(idPosition > -1){
                if(title!==''){productsFile[idPosition].title = title};
                if(description!==''){productsFile[idPosition].description = description};
                if(price>0){productsFile[idPosition].price = price};
                if(thumbnail!==''){productsFile[idPosition].thumbnail = thumbnail};
                if(code!==''){productsFile[idPosition].code = code};
                if(stock>0){productsFile[idPosition].stock = stock};
                
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                console.log(`Producto id ${productId} Ha sido actualizado`);
                return `Producto id ${productId} Ha sido actualizado`;
            } else {
                console.log(`Actualización fallida: Producto id ${productId} no existe`);
                return `Actualización fallida: Producto id ${productId} no existe`;
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    async deleteProduct(productId){ //---elimina el producto, con ese id, del archivo
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
const test = async ()=>{
    console.log('Lista completa de productos: ', await manager.getProducts());
    await manager.addProduct('Galaxy S22','Samsung Galaxy S22 color white',5000,'Sin imagen','PT001',0) // stock en 0 OK
    await manager.addProduct('Airpods','Airpods color white compatible con Iphone',15000,'Sin imagen','PT001',5) // Error: codigo existente
    await manager.addProduct('LG-G8','LG-8 color blue',6000,'Sin imagen','PT002',10)
    await manager.addProduct('Galaxy Z Flip','Samsung Galaxy Z Flip color black',6000,'Sin imagen','PT003',10)
    await manager.addProduct('Iphone X','Iphone X color black sellado en caja',6000,'Sin imagen','PT004',10)
    await manager.addProduct('Apple Watch','Apple Watch color black',5000,'Sin imagen','PT005',10)
    console.log('Lista completa de productos: ', await manager.getProducts());
    await manager.getProductById(3);
    await manager.getProductById(6);
    await manager.updateProduct(3,'','',6500,'','','');
    await manager.updateProduct(6,'','',6500,'','','');
    await manager.deleteProduct(4);
    await manager.deleteProduct(6);
    console.log('Complete product list: ', await manager.getProducts());
}
test()