// import getToken from "../../apiFuntions/getAccessToken";
// import NodeCache, { Key } from "node-cache";
// import axios from "axios";
// import { NextApiRequest, NextApiResponse } from "next";
// import WoWCharacterProfile from "@/model/WoWCharacterProfile ";

// const redis = require("redis");
// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
//   legacyMode: true,
// });
// redisClient.on("connect", () => {
//   console.info("Redis connected!");
// });
// redisClient.on("error", (err: any) => {
//   console.error("Redis Client Error", err);
// });
// redisClient.connect().then(); // redis v4 연결 (비동기)
// const redisCli = redisClient.v4;

// const cache = new NodeCache({ stdTTL: 60 * 1 });
// // prettier-ignore
// export default async function handler(req: NextApiRequest,res: NextApiResponse) {
//   const accessToken = await getToken();
//   const charactername = req.query.charactername as string;
//   const localCache : WoWCharacterProfile | undefined = cache.get(`charData_${charactername}`);
//   const redisCache = await redisCli.get(`Redis_character_${charactername}`);

//   if (localCache) {
//     res.status(200).json(localCache)
//     return
//   }

//   if (redisCache) {
//     console.log(`❌로컬 ${charactername} 스태스틱스 캐시없음`);
//     cache.set(`local_stastics_${charactername}`,redisCache)
//     res.status(200).json(redisCache)
//     return
//   }
//   console.log(`❌Redis ${charactername} 스태스틱스 캐시없음`);
//   try {
//     const response  = await axios.get(
//       // prettier-ignore
//       `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodeURIComponent(charactername)}/statistics`,
//       {
//         params: {
//           namespace: "profile-classic1x-kr",
//           locale: "ko_kr",
//           access_token: accessToken,
//         },
//       }
//     );
//     if (response.status === 404) {
//       res.status(500).json("error");
//       return;
//     }
//     const characterData : WoWCharacterProfile = response.data;
//     cache.set(`local_stastics_${charactername}`, response.data);
//     redisCli.set(`Redia_stastics_${charactername}`)
//     res.status(200).json(response.data);
//     return;
//   } catch (error) {
//     console.log(`${charactername} 스태스틱스 호출실패`);
//     res.status(500).json(error);
//     return;
//   }
// }
