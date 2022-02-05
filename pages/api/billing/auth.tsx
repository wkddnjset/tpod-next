import { instance } from '../config';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'POST':
        handlePOST(req, res);
        break;
      default:
        res.status(405).json({ message: `${req.method} method is not supported at this route.` });
    }
  } catch (error) {
    res.status(500).json({});
  }
};

// POST /api/apply
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, ...form } = req.body;

  const data = {
    ...form,
    customerKey: `${uid}/${moment().unix()}`,
  };
  console.log(data);
  instance
    .post(`/billing/authorizations/card`, data)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

export const config = {
  api: { externalResolver: true },
};
