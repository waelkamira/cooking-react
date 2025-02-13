'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';
import Image from 'next/image';
import CurrentUser from './CurrentUser';
import TheGarden from './Garden';
import Categories from './Categories';
import NewRecipeButton from './NewRecipeButton';

export default function SideBar() {
  const router = useRouter();
  const session = useSession();
  const [newImage, setNewImage] = useState('');
  const user = CurrentUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ima = localStorage.getItem('image');
      setNewImage(ima);
    }
  }, []);

  return (
    <div className="hidden xl:block w-80 h-fit border-l-[16px] border-one">
      <div className="w-full bg-four rounded-r-lg">
        {session?.status === 'authenticated' && (
          <div className="flex flex-col justify-between items-center p-4 rounded-r-lg w-full">
            <div
              className="flex justify-start items-center w-full cursor-pointer gap-2 line-clamp-1"
              onClick={() => router.push('/profile?username')}
            >
              <div className="relative size-14 overflow-hidden rounded-full">
                <Image src={user?.image} fill alt={user?.name} />
              </div>
              <h1 className=" text-white text-nowrap">{user?.name} </h1>
            </div>

            <div className="w-full">
              <Button
                title={'تسجيل الخروج'}
                style={' '}
                onClick={() => signOut()}
              />
            </div>
          </div>
        )}

        {session?.status === 'unauthenticated' && (
          <div className="px-4">
            <Button title={'تسجيل دخول'} style={' '} path="/login" />
          </div>
        )}
      </div>
      {session?.status === 'authenticated' && (
        <div className="w-full rounded-r-lg my-4">
          <div className="p-4 rounded-r-lg bg-four overflow-hidden my-4">
            <div className=" relative w-full h-32">
              <Image
                priority
                src={
                  'https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716955/cooking/nasoh_and_bahiga_cn3e7h.png'
                }
                layout="fill"
                objectFit="contain"
                alt="photo"
              />
            </div>
            <div className="hidden lg:flex flex-col justify-between items-center w-full h-full rounded-r-lg">
              <NewRecipeButton />
            </div>

            <Button
              title={'شو أطبخ اليوم؟'}
              style={' '}
              path="/whatToCookToday"
            />

            <Button title={'طبخاتي'} style={' '} path="/myRecipes" />
            <Button title={'وصفات أعجبتني'} style={' '} path="/favoritePosts" />
            <Button title={'الجوائز'} style={' '} path="/myGarden" />

            {session?.status === 'authenticated' && user?.isAdmin && (
              <Button title={'المستخدمين'} style={' '} path="/users" />
            )}
          </div>

          <div className="p-4 rounded-r-lg bg-four overflow-hidden my-4">
            <TheGarden />
          </div>
          <div className="px-2 rounded-r-lg bg-four overflow-hidden my-4">
            <Categories />
          </div>
        </div>
      )}
    </div>
  );
}
