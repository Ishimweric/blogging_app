import {Ratelimit} from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config(); //load environment variables

const rateLimit = new Ratelimit({
  redis : Redis.fromEnv(),
  limiter : Ratelimit.slidingWindow(20, "10 s") // 20 req in 10s
});

export default rateLimit