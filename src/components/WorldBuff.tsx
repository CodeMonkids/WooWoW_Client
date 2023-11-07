import axios from 'axios';
import { useEffect, useState } from 'react';

export default function WorldBuff(): JSX.Element {
  const [buffData, setBuffData] = useState<string>();
  async function getWorldbuff() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worldbuff`,
      );
      setBuffData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWorldbuff();
  });
  return (
    <div>
      {buffData &&
        JSON.parse(buffData).map((ele: string, idx: number) => (
          <p className="text-white text-2xl" key={idx}>
            {ele}
          </p>
        ))}
      {/* {buffData && <p className="text-white text-2xl">{buffData}</p>} */}
      {!buffData && <p className="text-2xl text-white">월드버프정보 없음</p>}
    </div>
  );
}
