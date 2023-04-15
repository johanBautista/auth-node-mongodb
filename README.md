## Auth REST Api con nodejs
1. primero hacemos l structura de carpetas del proyecto
2. instalamos las depndencias
3. creamos los scripts para poder levantar el servidor 
4. llamamos a la funcion listen para ejecutar el server
5. se crea un proyecto en mongoDB y se obtiene el url que usaremos para conectar la base de datos, usaremos el metodo connect de monfgose y pasmos la url como parametro.
6. importamos la database desde el file de app.js
7. usamos mongoose para crear una nueva instancia del schema y crear el modelo de uaurio que me servira para conectarme con la base de datos
8. creamos el router de los endpoints con la siguiente estructura router.<metodo>(<url>,<controller>) => router.get(url,controller)
9. los controller tienen una request y una response.