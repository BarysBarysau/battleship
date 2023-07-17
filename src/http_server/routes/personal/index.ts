import { Handler } from '../../utils/httphandler';
import { Users, Index } from '../../utils/usertype';

export const regUser: Handler = (req, res) => {
  const chunks: Buffer[] = [];
  req.on('data', (data: Buffer) => {
    chunks.push(data);
  });
  req.on('end', () => {
    const data = Buffer.concat(chunks).toString();
    const newdata: Users = JSON.parse(data);
    res.end(
      JSON.stringify({
        type: 'reg',
        data: {
          name: newdata.data.name,
          index: 1,
          error: false,
          errorText: 'no error',
        },
        id: 0,
      }),
    );
  });
};
