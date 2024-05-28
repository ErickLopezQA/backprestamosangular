import express, { Application, Request, Response }  from 'express';
import cors from 'cors';
import RoutesClient from '../routes/client.routes';
import AmountClient from '../routes/amount.routes';
import TimePeriodClient from '../routes/time-period.routes';
import LoanClient from '../routes/loan.routes';
import database from '../database/connection';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();  
    this.port = process.env.PORT || '3001';
    this.listen();  // Para que se ejecute el servidor al iniciar la clase
    this.middlewares();  // Para que se ejecuten los middlewares al iniciar el servidor
    this.routes();  // Para que se ejecuten las rutas al iniciar el servidor 
    this.databaseConnect();  // Para que se conecte a la base de datos al iniciar el servidor
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion funcionando en el puerto: ${this.port}`);
    });
  }

  routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        message: 'API running'
      })
    })
    this.app.use ('/api/clients', RoutesClient);
    this.app.use ('/api/amounts', AmountClient); 
    this.app.use ('/api/time-periods', TimePeriodClient);
    this.app.use ('/api/loans', LoanClient);
  }

  middlewares() {
  // 
    this.app.use(express.json());

    this.app.use(cors());
  }

  async databaseConnect() {
    try {
      await database.authenticate()
      console.log('Base de datos conectada correctamente');
    } catch (error) {
      console.log(error);
      console.log('Error al conectar a la base de datos');
    }
  }



}

export default Server;