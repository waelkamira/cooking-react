'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CurrentUser from './CurrentUser';
export default function CustomToast({
  t,
  message,
  emoji,
  greenEmoji,
  redEmoji,
}) {
  // console.log(CurrentUser());
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-four border-[3px] border-one text-white shadow-lg rounded-lg pointer-events-auto flex-2 items-center justify-center p-4`}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1 w-full">
          <div className="flex justify-center items-center gap-2">
            <div className="relative w-14 h-14 flex-shrink-0 pt-0.5 rounded-full ">
              <Image
                className="h-10 w-10 rounded-full"
                src="https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716951/cooking/bahiga_cmzcf4.png"
                alt="photo"
                fill
              />
            </div>
            <div className="ml-3 flex-1">
              <h1 className="text-sm text-white font-bold">بهيجة اشرق لبن</h1>
            </div>
          </div>
        </div>

        {/* {!CurrentUser()?.email && (
          <Link href={'/login'}>
            {' '}
            <div className="">
              <h1 className="flex justify-center items-center cursor-pointer text-white h-10 font-bold text-sm hover:scale-[101%] bg-five hover:bg-one text-center p-1 rounded-lg ">
                تسجيل الدخول
              </h1>
            </div>
          </Link>
        )} */}
      </div>
      <div>
        <div>
          <h1 className="mt-4 text-sm text-white s:text-nowrap text-center">
            <span className="text-green-400 text-xl font-bold">
              {greenEmoji}
            </span>
            <span className="text-one text-xl mx-1 font-bold">{redEmoji}</span>

            {message}
            <span className="text-green-400 text-xl mx-1 font-bold">
              {emoji}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
