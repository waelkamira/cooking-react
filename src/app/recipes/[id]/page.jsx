'use client';
import { useParams } from 'next/navigation';
import Item from '../../../../components/Item';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [oneCookingRecipe, setOneCookingRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchOneCookingRecipe();
  }, []);

  async function fetchOneCookingRecipe() {
    const response = await fetch('/api/allCookingRecipes');
    const json = await response?.json();
    if (response.ok) {
      const res = await json?.filter((item) => item?._id === id);
      setOneCookingRecipe(res[0]);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Item {...oneCookingRecipe} />
    </div>
  );
}
