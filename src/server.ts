import express, { Router } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Configurações
app.use(cors());
app.use(express.json());

// Rotas
routes.forEach((route) =>
  app.use(
    '/api',
    (Router() as any)[route.method](
      route.path,
      route.middlewares,
      route.handler
    )
  )
);

// Início
app.listen(3000, () => console.log('Server running'));
