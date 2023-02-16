// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { ErrorInterface } from '@/types';
import { validateCookie } from '@/helpers/users';

type Data = {
    user: string;
};

interface JWTPayload {
    email: string;
    exp: number;
    iat: number;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorInterface>
) {
    const cookie = validateCookie(req);
    if (cookie === false)
        return res.status(403).json({
            errorStatus: 403,
            errorDescription: 'Invalid token',
            errorKey: 'token'
        });


    return res.status(200).json({ user: cookie });
}
