
'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div className=" flex flex-row justify-start items-center font-semibold  text-sm mt-2 -ml-10 ">
<Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer p-0  m-2 " 
      src="/images/logo2.png" 
      height="100" 
      width="100" 
      alt="ACE BOOKING" 
    />
    <p className="-ml-8 -mt-5 text-gray-500">
ROOMS 

    </p>

    </div>
 
    
   );
}
 
export default Logo;
