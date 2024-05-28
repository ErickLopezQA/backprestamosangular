"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_routes_1 = __importDefault(require("../routes/client.routes"));
const amount_routes_1 = __importDefault(require("../routes/amount.routes"));
const time_period_routes_1 = __importDefault(require("../routes/time-period.routes"));
const loan_routes_1 = __importDefault(require("../routes/loan.routes"));
const connection_1 = __importDefault(require("../database/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen(); // Para que se ejecute el servidor al iniciar la clase
        this.middlewares(); // Para que se ejecuten los middlewares al iniciar el servidor
        this.routes(); // Para que se ejecuten las rutas al iniciar el servidor 
        this.databaseConnect(); // Para que se conecte a la base de datos al iniciar el servidor
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion funcionando en el puerto: ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                message: 'API running'
            });
        });
        this.app.use('/api/clients', client_routes_1.default);
        this.app.use('/api/amounts', amount_routes_1.default);
        this.app.use('/api/time-periods', time_period_routes_1.default);
        this.app.use('/api/loans', loan_routes_1.default);
    }
    middlewares() {
        // 
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    databaseConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada correctamente');
            }
            catch (error) {
                console.log(error);
                console.log('Error al conectar a la base de datos');
            }
        });
    }
}
exports.default = Server;
