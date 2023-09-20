import { Request, Response, NextFunction } from "express";

export const jsonErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === 'entity.parse.failed') {
        res.status(400).send({ success: false, message: 'Bad JSON format' });
        return;
    } else {
        next(err);
        return;
    }
}