/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    try {
      return res.status(200).json({
        redis: redisClient.isAlive(),
        db: dbClient.isAlive(),
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ redis: false, db: false });
    }
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    return res.status(200).json({ users, files });
  }
}

export default AppController;
