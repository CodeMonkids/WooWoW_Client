'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GuildInfoArea() {
  const [guildmemberCount, setGuildmemberCount] = useState<number>(0);

  let mounted = false;

  async function fetchGuildInfo() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/guild`,
      );
      // console.log(response);
      setGuildmemberCount(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!mounted) {
      // console.log("guild counter mounted");
      fetchGuildInfo();
      mounted = true;
    }
  }, []);

  return (
    <div className="flex ">
      <div className=" relative z-10">
        <p className="text-white">왁타버스 현재인원</p>
        <p className="text-white">1000/{guildmemberCount}명</p>
        <p className="text-red-600" />
        <br />
      </div>
    </div>
  );
}
