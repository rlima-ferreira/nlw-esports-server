import { Game } from '@prisma/client';
import prisma from '../services/prisma.service';

const repo = prisma.game;

const game = {
  findAll: async (): Promise<Game[]> => repo.findMany(),
  findOne: async (id: string): Promise<Game> =>
    repo.findUniqueOrThrow({ where: { id } }),
  create: async (data: Game): Promise<Game> => repo.create({ data }),
  update: async (id: string, data: Game): Promise<Game> =>
    repo.update({ where: { id }, data: { ...data, id } }),
  delete: async (id: string): Promise<Game> => repo.delete({ where: { id } }),
};

export default game;
