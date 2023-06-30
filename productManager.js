class productManager {
    constructor () {
        this.products = []
        }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || price === 0 || !thumbnail || !code) {
            console.log(`Check ${code} parámetros: todos los parámetros son obligatorios, solo el stock puede ser 0`);
            return false;
          } else {
            const checkproduct = this.#checkCode(code) //---verifica que el código no exista.---//
            if (checkproduct==='OK') {
                const product = {
                    code: code,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock,
                    id: this.#getMaxID() + 1, //---busca el max id creado para crear el siguiente---//
                }
                this.products.push(product)
                console.log(`Producto ${code} creado`)
                return `Producto ${code} creado`
            } else {
                console.log(`El producto ${code} ya existe`)
                return `El producto  ${code} ya existe`}
        }
    } 

    getProductById = (productId) => {
        const product = this.products.find(product => product.id === productId)
        if (product) {
            console.log(product)
            return product
        } else {
            console.log(`El producto id ${productId} no existe`)
            return `El producto id ${productId} no existe`
        }
    }

    getProducts=()=>{
        console.log(this.products)
        return this.products
    }

            //---busca el ultimo ID creado---//
    #getMaxID = () => { 
        const ids = this.products.map(product => product.id)
        if (ids.includes(1)) {
            return Math.max(...ids)
        } else {
            return 0}
    }

    //---busca un codigo de producto y devuelve OK si no existe, y Error si existe---//
    #checkCode=(codeProduct)=>{ 
        if (!this.products.find(product => product.code === codeProduct)) {
            const estado = 'OK'
            return estado
        } else {
            const estado = 'Error'
            return estado
        }
    }
}


const manager = new productManager()
// manager.getProducts()
// manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)
// manager.getProducts()
// manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)
// manager.getProductById(1)

manager.addProduct('Galaxy S22','Samsung Galaxy S22 color white',5000,'Sin imagen','PT001',0) //---stock en 0 OK---//
manager.addProduct('Airpods','Airpods color white compatible con Iphone',15000,'Sin imagen','PT001',5) //---Error: codigo existente---//
manager.addProduct('LG-G8','LG-8 color blue',6000,'Sin imagen','PT002',10)
manager.addProduct('Galaxy Z Flip','Samsung Galaxy Z Flip color black',6000,'Sin imagen','PT003',10)
manager.addProduct('Iphone X','Iphone X color black sellado en caja',6000,'Sin imagen','PT004',10)
manager.addProduct('Apple Watch','Apple Watch color black',5000,'Sin imagen','PT005',10)
manager.getProducts()
manager.getProductById(3)
manager.getProductById(6) //---Error: no existe el ID---//