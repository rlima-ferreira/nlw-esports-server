import { Ad } from '@prisma/client';
import prisma from '../services/prisma.service';

const repo = prisma.ad;

const ad = {
  findAll: async (): Promise<Ad[]> => repo.findMany(),
  findOne: async (id: string): Promise<Ad> =>
    repo.findUniqueOrThrow({ where: { id } }),
  findOnlyDiscord: async (id: string): Promise<any> =>
    repo.findUniqueOrThrow({
      where: { id },
      select: { discord: true },
    }),
  findByGame: async (gameId: string): Promise<any[]> =>
    repo.findMany({
      where: { gameId },
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  create: async (data: Ad): Promise<Ad> => repo.create({ data }),
  update: async (id: string, data: Ad): Promise<Ad> =>
    repo.update({ where: { id }, data: { ...data, id } }),
  delete: async (id: string): Promise<Ad> => repo.delete({ where: { id } }),
};

export default ad;
