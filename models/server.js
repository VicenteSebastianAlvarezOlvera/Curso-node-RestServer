const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos'
        }

        this.connectDB();
        this.middlewares();
        this.routes();

    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //cors
        this.app.use(cors());
        //lectura y parseo
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Sevidor corriendo en el puerto ', this.port);
        });
    }
}
module.exports = Server;