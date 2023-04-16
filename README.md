## Auth REST Api con nodejs
1. primero hacemos la estructura de carpetas del proyecto
2. instalamos las dependencias
3. creamos los scripts para poder levantar el servidor 
4. llamamos a la funcion listen para ejecutar el server
5. se crea un proyecto en mongoDB y se obtiene el url que usaremos para conectar la base de datos, usaremos el metodo connect de mongoose y pasmos la url como parametro.
6. importamos la database desde el file de app.js
7. usamos mongoose para crear una nueva instancia del schema y crear el modelo de uaurio que me servira para conectarme con la base de datos
8. creamos el router de los endpoints con la siguiente estructura router.<metodo>(<url>,<controller>) => router.get(url,controller)
9. los controller tienen una request y una response.
10. habilitar la lectura en .json() de express en el file app.js 
11. agregamos el resto del path al router de auth en app.js
12. ahora agregamos una validacion en el router en medio de la url y el controller, para capturar los errores de la request creamos un middleware <validationResultRequest> que captura si hay error y frena el controller. Ell router quedara con la siguiente estructura. router.metodo(url,validaciones,middlewareErrores,controller) 
13. usamos bcrypt para hashear el password antes de guardarlo en la DB, esta operacion la hacemos en el schema de mongoose gracias al middleware pre de la libreria 
14. En el schema de mongoose hacemos un metodo que reciba el passwoed de la query y lo compare con el password que tenemos en la DB, luego este metodo lo usaremos desde el controller para verificar si la password coincide 
15. en el controller - Registro. desestructuramos de la request el email y el password, hacemos una validacion si el email ya existe, si no es asi usamos el objeto de mongoose para pasar el objeto user con email y password y guardamos con el metodo save en la DB. En caso de error manejamos los errores con el catch.
16. en el controller - Login. verificamos si existe el email que nos da el cliente(findOne metodo de mongoose) y luego verificamos si las password coinciden la de la DB y la que el cliente me da, esto lo hacemos con la funcion que compara heche en el schema del user.