'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { inputsContext } from '../components/Context';
import SmallItem from './SmallItem';
import Loading from './Loading';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AllCookingRecipes() {
  const [pageNumber, setPageNumber] = useState(1);
  const [allCookingRecipes, setAllCookingRecipes] = useState([]);
  const { dispatch, newRecipe, deletedRecipe } = useContext(inputsContext);
  const session = useSession();
  const router = useRouter();

  // console.log('pageNumber', pageNumber);

  useEffect(() => {
    fetchAllCookingRecipes();
  }, [newRecipe, deletedRecipe, pageNumber]);

  async function fetchAllCookingRecipes() {
    const response = await fetch('/api/allCookingRecipes');
    const json = await response?.json();
    if (response.ok) {
      // console.log(json);
      dispatch({ type: 'SET_RECIPES', payload: json });
      const startPage = (pageNumber - 1) * 10;
      const endPage = startPage + 10;
      setAllCookingRecipes(json.slice(startPage, endPage));
    }
  }

  return (
    <div className="flex flex-col w-full xl:w-[90%] 2xl:w-[70%] h-[1800px] px-2 sm:px-16 sm:py-8 rounded-lg bg-seven overflow-y-auto z-10">
      {allCookingRecipes?.length === 0 && <Loading />}
      {allCookingRecipes?.length > 0 &&
        allCookingRecipes.map((recipe, index) => (
          <div key={index}>
            <SmallItem recipe={recipe} index={index} />
          </div>
        ))}
      <div className="flex items-center justify-around my-4 mt-8">
        {allCookingRecipes?.length >= 10 && (
          <Link href={'#post1'}>
            <div
              className="flex items-center justify-around cursor-pointer"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <h1 className="text-gray-600 font-bold">الصفحة التالية</h1>
              <MdKeyboardDoubleArrowRight className="text-2xl animate-pulse" />
            </div>
          </Link>
        )}
        {pageNumber > 1 && (
          <Link href={'#post1'}>
            <div
              className="flex items-center justify-around cursor-pointer"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              <MdKeyboardDoubleArrowLeft className="text-2xl animate-pulse" />
              <h1 className="text-gray-600 font-bold">الصفحة السابقة</h1>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
