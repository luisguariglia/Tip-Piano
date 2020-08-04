# Tip-Piano
Guía de instalación.
Tip Piano.
Servicios necesarios:
Xampp Control panel
Node.js
Comandos necesarios:
Luego de Clonar el proyecto en github https://github.com/luisguariglia/Tip-Piano.git
e iniciar un servidor apache con la aplicación Xampp:
Dentro del directorio del proyecto.
npm install
npm install -g express
npm run build
Para iniciar el programa:
Dentro del directorio del proyecto.
node index.js

Se podrá acceder a la web desde:

http://localhost:3000/server
http://localhost:3000/user
http://localhost:3000/screen
Para subir los cambios
Para subir a github normal:
Dentro del directorio del proyecto:
git add .
git commit -m “cambios”
git push origin master
Para subir a github de heroku(se actualizan las apps en la web de heroku):
Dentro del directorio del proyecto:
git add .
git commit -m “cambios”
git push heroku master
