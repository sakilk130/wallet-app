import { NextFunction, Response, Request } from 'express';

import ratelimit from '../config/upstash';

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { success } = await ratelimit.limit('my-rate-limit');

    if (!success) {
      return res.status(429).json({
        message: 'Too many requests, please try again later.',
        data: null,
      });
    }

    next();
  } catch (error) {
    return res.status(429).json({
      message: 'Rate limit exceeded',
      data: null,
    });
  }
};

export default rateLimiter;
