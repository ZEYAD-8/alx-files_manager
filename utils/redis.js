import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Class representing a Redis client.
 */
class RedisClient {
  constructor() {
    this.client = createClient();

    this.getAsync = promisify(this.client.get).bind(this.client);

    // this.client.on('connect', () => {
    //     console.log('redis client connected successfully');
    //     });

    this.client.on('error', (err) => {
      console.error(`error: ${err}`);
    });
  }

  /**
   * Checks if Redis client is connected
   * @return {boolean} true if connected, false otherwise
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Retrieves a value from Redis by key.
   * @param {string} key - The key to look up in Redis.
   * @returns {Promise<string | null>} - The value associated with the key, or null if not found.
   */
  async get(key) {
    return this.getAsync(key);
  }

  /**
   * Sets a key-value pair in Redis with expiration
   * @param {string} key - Key to set in Redis
   * @param {number} duration - Expiration time in seconds -- TTL
   * @param {string} value - Value to store
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Deletes a key from Redis
   * @param {string} key - Key to remove from Redis
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
