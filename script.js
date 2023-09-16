// VARIABLES

let productos = [
    {id:1,nombre:"Crash",categoria:"Juegos",precio:5200,stock:2},
    {id:3,nombre:"Super Mario",categoria:"Juegos",precio:2300,stock:3},
    {id:15,nombre:"Volante",categoria:"Accesorios",precio:25600,stock:1},
    {id:4,nombre:"Sega genesis",categoria:"Consolas",precio:7200,stock:0},
    {id:23,nombre:"Super Nintendo",categoria:"Consolas",precio:10000,stock:1},
    {id:12,nombre:"Mando ps5",categoria:"Accesorios",precio:31000,stock:4},
    {id:8,nombre:"God Of War",categoria:"Juegos",precio:27200,stock:2},
    {id:7,nombre:"Vr",categoria:"Accesorios",precio:64000,stock:3},
    {id:11,nombre:"Ps5",categoria:"Consolas",precio:540000,stock:5},
    {id:17,nombre:"Sonic",categoria:"Juegos",precio:1500,stock:1},
    {id:13,nombre:"Resident evil",categoria:"Juegos",precio:18000,stock:6},
    {id:21,nombre:"Cable HDMI",categoria:"Accesorios",precio:3000,stock:6},
    {id:32,nombre:"Game Cube",categoria:"Consolas",precio:45000,stock:3},
    {id:31,nombre:"Pes",categoria:"Juegos",precio:14300,stock:3},
    {id:37,nombre:"Mause",categoria:"Accesorios",precio:5600,stock:3},
    {id:36,nombre:"Ps4",categoria:"Consolas",precio:200000,stock:3},
    {id:39,nombre:"Teclado",categoria:"Accesorio",precio:6000,stock:3}
]
let salir = false
let idIngresado = 0
let nombreIngresado
let productoBuscado
let productoAgregado
let productosFiltrados
let carrito = []
let totalAPagar = 0

// FUNCIONES

//Funciones con menu de opciones
function menuPrincipal(opcion){
    opcion = Number(prompt("Bienvenidos a mi tienda Gamer seleccione la opcion deseada\n1-Listar productos\n2-Ver informacion de un producto en particular\n3-Agregar un producto al carrito\n4-Filtrar por categoria\n5-Ordenar productos por nombre Ascendente\n6-Ordenar productos por nombre Descendente\n7-Ordenar productos por precio Ascendente\n8-Ordenar porductos por precio descendente\n9-Mostrar carrito\n10-Salir"))
    return opcion
}

function menuFiltrado(opcion){
    opcion = Number(prompt("Ingrese la opcion de la categoria a filtrar\n1- Juegos\n2- Consolas\n3-Accesorios"))
    return opcion
}

function menuCompra(opcion){
    opcion = Number(prompt("Desea finalizar compra?\n1-Si\n2-Seguir comprando"))
    return opcion
}

function informacionParticular(opcion){
    opcion = Number(prompt("Como desea buscar ese producto en particular?\n1-Buscar por id\n2-Buscar por nombre"))
    return opcion
}

//funcion para filtrar productos por categoria
function filtrarPorCategoria(productos,categoria){
    return productos.filter(producto => producto.categoria === categoria)
}

//funcion para listar productos por alert
function listarProductos(productos){
    return productos.map(producto => producto.id + " - " + producto.nombre + " $" + producto.precio).join("\n")
}

function listarProductosCarrito(productos){
    return productos.map(producto => producto.id + " - " + producto.nombre + " Precio total $" + producto.precio + " Unidades: " + producto.unidades).join("\n")
}

//Funcion para mostrar un producto por alert
function mostrarProducto(producto){
    return "id: " +producto.id + "\nnombre: " + producto.nombre + "\ncategoria: " + producto.categoria + "\nprecio: $" + producto.precio + "\nstock: " + producto.stock
}

//funciones para buscar productos por nombre e id
function buscarProductoPorId(productos,id){
    return productos.find(producto => producto.id === id)
}

function buscarProductoPorNombre(productos,nombre){
    return productos.find(producto => producto.nombre === nombre)
}

//funcion para ordenar array de forma(asc=ascendente y des=descendente)
function ordenar(productos,propiedad,forma){
    if(forma == "asc"){
        productos.sort((a,b) => {
            if(a[propiedad] > b[propiedad]){
                return 1
            }
            if(a[propiedad] < b[propiedad]){
                return -1
            }
            return 0
        })
    }else{
        productos.sort((a,b) => {
            if(a[propiedad] < b[propiedad]){
                return 1
            }
            if(a[propiedad] > b[propiedad]){
                return -1
            }
            return 0
        })
    }   
}

// EJECUCION

do{
    switch(menuPrincipal()){
        case 1:
            alert(listarProductos(productos))
        break;
        case 2:
            switch(informacionParticular()){
                case 1:
                    idIngresado = Number(prompt("Ingrese el id que desea buscar"))
                    productoBuscado = buscarProductoPorId(productos,idIngresado)
                    if(productoBuscado){
                        alert(mostrarProducto(productoBuscado))
                    }else{
                        alert("No existe un producto con el id: " + idIngresado)
                    }   
                break;
                case 2:
                    nombreIngresado = prompt("Ingrese el nombre que desea buscar")
                    productoBuscado = buscarProductoPorNombre(productos,nombreIngresado)
                    if(productoBuscado){
                        alert(mostrarProducto(productoBuscado))
                    }else{
                        alert("No existe un producto con el nombre: " + nombreIngresado)
                    } 
                break;
                default:
                    alert("Opcion incorrecta")
                break;
            }
        break;
        case 3:
            idIngresado = Number(prompt(listarProductos(productos) + "\n Ingrese el id del producto que desea agregar al carrito:"))
            productoBuscado = buscarProductoPorId(productos,idIngresado)
            productoAgregado = buscarProductoPorId(carrito,idIngresado)
            if(!productoBuscado){
                alert("No existe un prodcto con ese id")
            }else if(productoBuscado.stock > 0){
                if(productoAgregado){
                    productoAgregado.unidades++
                    productoAgregado.precio += productoBuscado.precio
                }else{
                    carrito.push({
                        id: productoBuscado.id,
                        nombre: productoBuscado.nombre,
                        categoria: productoBuscado.categoria,
                        precio: productoBuscado.precio,
                        unidades: 1
                    })
                }
                productoBuscado.stock--
                alert("Producto agregado exitosamente!")
            }else{
                alert("No hay stock de ese producto")
            }
        break;
        case 4:
            switch(menuFiltrado()){
                case 1:
                    productosFiltrados = filtrarPorCategoria(productos,"Juegos")
                    alert(listarProductos(productosFiltrados))
                break;
                case 2:
                    productosFiltrados = filtrarPorCategoria(productos,"Consolas")
                    alert(listarProductos(productosFiltrados))
                break;
                case 3:
                    productosFiltrados = filtrarPorCategoria(productos,"Accesorios")
                    alert(listarProductos(productosFiltrados))
                break;
                default:
                    alert("Opcion incorrecta")
                break;
            }
        break;
        case 5:
            ordenar(productos,"nombre","asc")
            alert(listarProductos(productos))
        break;
        case 6:
            ordenar(productos,"nombre","des")
            alert(listarProductos(productos))
        break;
        case 7:
            ordenar(productos,"precio","asc")
            alert(listarProductos(productos))
        break;
        case 8:
            ordenar(productos,"precio","des")
            alert(listarProductos(productos))
        break;
        case 9:
            if(carrito.length <= 0){
                alert("El carrito esta vacio")
            }else{
                alert(listarProductosCarrito(carrito))
                switch(menuCompra()){
                    case 1:
                        totalAPagar = carrito.reduce((acumulador,producto) => acumulador + producto.precio,0)
                        alert("Debes abonar un total de: $" + totalAPagar)
                        alert("Gracias por vicitar mi tienda!!")
                        salir = true
                    break;
                    case 2:
                        alert("Regresando a la tienda")
                    break;
                    default:
                        alert("Opcion incorrecta")
                    break;
                }
            }    
        break;
        case 10:
            salir = true
        default:
            alert("Opcion incorrecta")
        break;
    }
}while(salir == false)