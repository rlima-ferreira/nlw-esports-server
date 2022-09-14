import { Ad } from '@prisma/client';
import { Request, Response } from 'express';
import ad from './repositories/ad.repository';
import game from './repositories/game.repository';
import {
  convertHourStringToMinutes,
  convertMinutesToHourString,
} from './utils/time';

interface RouteType {
  path: string;
  method: string;
  middlewares: unknown[];
  handler: Function;
}

const routes: RouteType[] = [
  // Games
  {
    path: '/games',
    method: 'get',
    middlewares: [],
    handler: async (_: any, res: Response) => res.json(await game.findAll()),
  },

  // Ads
  {
    path: '/ads/:id/discord',
    method: 'get',
    middlewares: [],
    handler: async (req: Request, res: Response) => {
      const { params } = req;
      const data = await ad.findOnlyDiscord(params.id);
      return res.json(data);
    },
  },

  // GamesAndAds
  {
    path: '/games/:id/ads',
    method: 'get',
    middlewares: [],
    handler: async (req: Request, res: Response) => {
      const { params } = req;
      const ads = await ad.findByGame(params.id);
      return res.json(
        ads.map((ad) => ({
          ...ad,
          weekDays: ad.weekDays.split(','),
          hourStart: convertMinutesToHourString(ad.hourStart),
          hourEnd: convertMinutesToHourString(ad.hourEnd),
        }))
      );
    },
  },
  {
    path: '/games/:id/ads',
    method: 'post',
    middlewares: [],
    handler: async (req: Request, res: Response) => {
      const { body, params } = req;
      const data: Ad = {
        ...body,
        id: undefined,
        gameId: params.id,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
      };
      const result = await ad.create(data);
      return res.status(201).json(result);
    },
  },
];

export default routes;
