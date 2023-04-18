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
17. crear template de .env para dejar documentado las variables de entorno necesarias para nuestro proyecto
18. Procedemos a generar el token con jwt en la funcion generateToken pasando el uid como parametro (file tokenManager) usamos el metodo sign de la libreria jwt y pasamos como argumentos(uid, el secreto del .env, y la expiresIn), lo importante en esta parte es que no debemos enviar informacion sensible del usuario(email, password etc.) en la generacion del token, unicamente el id del usuario. Aqui tb desde el backend se puede gestionar el envio de una cookie para mantener la session en frontend sin embargo aunque pongamos la propiedad httpOnly en las cookie-parser, esta forma muestra vulnerabilidades por ello lo mejor es crear un refresh token
19. usamos la func. generateToken y destructuramos el valor del token y la expiracion que los usamos en la response del controller de login
20. creamos un endpoint protegido como ejemplo para validar el token y devolver info solo si el token es correcto, en la route /protected pasamos el middleware requireToken en donde se evalua el token por medio de la funcion de jwt.verify() y luego el controller infoUser que es donde filtramos la DB por el uid que estamos enviando, usamos el metodo lean() de mongoose para que solo me traiga la data que pido y no todo el constructor de la clase. En la respuesta enviamos el status y el email.
21. importamos las cookieParser desde nuestro app.js
22. refactorizamos la logica de validacion de los endpoints de auth.router en el archivo validationManager
23. en el controller de login cuando el cliente se logee llamamos a la func. generateRefreshToken() pasandole como argumento el user.id y el res, esta funcion se encargara de firmar un nuevo token y enviarlo por medio de cookies al navegador
24. creamos el endpoint de refresh(refreshtoken), el cual tiene el middleware requireRefreshToken y el controller refreshToken. el middleware comprobara si el token generado en el momento de login es correcto si es asi pasa al next() y pasa al controller. El controller genera un nuevo token que es el que nos permitira hacer las peticiones a los endpoints protegidos.
25. finalmente creamos el endpoint de logout que limpiara las cookies
