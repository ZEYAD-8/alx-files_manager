import sha1 from 'sha1';
import v4 from 'uuid';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AuthController {
  static async getConnect(req, res) {
    const header = req.headers.authorization;
    const authorization = header.split(' ')[1];
    if (!authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedString = Buffer.from(authorization, 'base64').toString('utf-8');
    const [email, password] = decodedString.split(':');

    if (!email || !password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await dbClient.db.collection('users').findOne({ email });
    if (!user || user.password !== sha1(password)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = v4();
    const hours = 24;
    await redisClient.setex(`auth_${token}`, user._id.toString(), hours * 3600);

    return res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    const result = await redisClient.del(`auth_${token}`);
    if (result === 0) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(204).send();
  }
}

export default AuthController;
