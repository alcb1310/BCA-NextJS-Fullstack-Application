// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ErrorInterface } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

interface LoginInterface {
    email?: string;
    password?: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorInterface>
) {
    const { method, body } = req;

    if (method === 'POST') {
        const { email, password } = body as LoginInterface;

        if (email === undefined)
            return res.status(400).json({
                errorStatus: 400,
                errorKey: 'email',
                errorDescription: `Need to provide an email to login`,
            });

        if (password === undefined)
            return res.status(400).json({
                errorStatus: 400,
                errorKey: 'password',
                errorDescription: `Need to provide an password to login`,
            });

        return res.status(200).json({ name: 'John Doe' });
    }

    return res.status(404).json({
        errorStatus: 404,
        errorKey: 'method',
        errorDescription: `No implementation of the ${method} request`,
    });
}
