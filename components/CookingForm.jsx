'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import SelectComponent from './SelectComponent';
import { inputsContext } from './Context';
import { useSession } from 'next-auth/react';
import CurrentUser from './CurrentUser';
import CustomToast from './CustomToast';
import { Confetti } from './SuccessComponent';
import { getYoutubeVideoId } from './youtubeUtils';

export default function CookingForm({
  setIsVisible,
  isVisible,
  cancel = true,
}) {
  const [url, setUrl] = useState('');
  const [embedLink, setEmbedLink] = useState('');
  const [error, setError] = useState('');
  const session = useSession();
  const userName = CurrentUser()?.name;
  const userImage = CurrentUser()?.image || session?.data?.user?.image;
  const createdBy = CurrentUser()?.email;
  const [errors, setErrors] = useState({
    mealName: false,
    mealNameErrorMessage: 'حقل المقادير مطلوب',
    selectedValue: false,
    selectedValueErrorMessage: 'اختيار النوع مطلوب',
    ingredients: false,
    ingredientsErrorMessage: 'حقل المقادير مطلوب',
    theWay: false,
    theWayErrorMessage: 'حقل الطريقة مطلوب',
  });

  const [inputs, setInputs] = useState({
    mealName: '',
    selectedValue: '',
    image: '',
    ingredients: '',
    theWay: '',
    advise: '',
    link: '',
  });
  const { data, dispatch } = useContext(inputsContext);

  useEffect(() => {
    setInputs({
      ...inputs,
      selectedValue: data?.selectedValue?.label,
      image: data?.image,
    });
    handleGenerateEmbed();
  }, [url, data?.selectedValue, data?.image]);

  if ((isVisible = false)) {
    setErrors({ mealName: false, ingredients: false, theWay: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      inputs.mealName &&
      inputs.ingredients &&
      inputs.theWay &&
      inputs.selectedValue &&
      inputs.image &&
      userImage &&
      userName &&
      createdBy
    ) {
      try {
        const response = await fetch('/api/createMeal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...inputs,
            userName,
            userImage,
            createdBy,
          }),
        });

        if (response.ok) {
          dispatch({ type: 'New_RECIPE', payload: inputs });
          setIsVisible(false);
          toast.custom((t) => (
            <CustomToast
              t={t}
              emoji={'🧀'}
              message={'تم إنشاء وصفة جديدة'}
              greenEmoji={'✔'}
            />
          ));
          handleClick();
          setErrors({
            mealName: false,
            selectedValue: false,
            ingredients: false,
            theWay: false,
          });
          setInputs({
            mealName: '',
            selectedValue: '',
            image: '',
            ingredients: '',
            theWay: '',
            advise: '',
            link: '',
          });
        } else {
          console.log('something went wrong!');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!inputs.image) {
        setErrors({ ...errors, image: true });

        toast.custom((t) => (
          <CustomToast t={t} message={'صورة الطبخة مطلوبة 😐'} />
        ));
        dispatch({
          type: 'IMAGE_ERROR',
          payload: { imageError: true, message: 'صورة الطبخة مطلوبة' },
        });
      } else if (!inputs.mealName) {
        setErrors({ ...errors, mealName: true });

        toast.custom((t) => (
          <CustomToast t={t} message={'اسم الطبخة مطلوب 😐'} />
        ));
      } else if (!inputs.selectedValue) {
        setErrors({ ...errors, selectedValue: true });
        toast.custom((t) => (
          <CustomToast t={t} message={'اختيار الصنف مطلوب 😐'} />
        ));
      } else if (!inputs.ingredients) {
        setErrors({ ...errors, ingredients: true });
        toast.custom((t) => (
          <CustomToast t={t} message={'حقل المقادير مطلوب 😐'} />
        ));
      } else if (!inputs.theWay) {
        setErrors({ ...errors, theWay: true });
        toast.custom((t) => (
          <CustomToast t={t} message={'حقل الطريقة مطلوب 😐'} />
        ));
      }
    }
  }

  //? هذه دالة يتم تفعيلها عند نجاح انشاء وصفة للاحتفال
  const handleClick = () => {
    const end = Date.now() + 4 * 1000; // 3 seconds
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

    const frame = () => {
      if (Date.now() > end) return;

      Confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      Confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  //? embed link هاتان الدالاتان للتعامل مع رابط اليويتوب الذي يقوم المستخدم بنسخه لتحويله الى
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUrl(inputValue);
    handleGenerateEmbed(inputValue); // Pass inputValue to generate embed link
  };

  const handleGenerateEmbed = (inputValue) => {
    const videoId = getYoutubeVideoId(inputValue);

    if (videoId) {
      const youtubeEmbedLink = `https://www.youtube.com/embed/${videoId}`;

      setEmbedLink(youtubeEmbedLink);
      setInputs({ ...inputs, link: youtubeEmbedLink });
      setError('');
    } else {
      setEmbedLink('');
      setError('Invalid YouTube URL');
    }
  };
  return (
    <div className="w-full p-2 sm:p-8 h-fit ">
      <form
        className="flex flex-col justify-center items-start h-fit w-full mt-4 "
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <div className="flex flex-col gap-8 md:flex-row w-full ">
            <div className="flex flex-col items-center justify-center w-full">
              {errors.selectedValue && (
                <h1 className="text-one text-2xl text-start my-2 w-full animate-bounce font-bold opacity-0">
                  اختيار الصنف مطلوب
                </h1>
              )}
              {errors.mealName && (
                <h1 className="text-one text-2xl text-start my-2 w-full animate-bounce font-bold">
                  اسم الطبخة مطلوب
                </h1>
              )}
              <div className="flex items-center gap-2 w-full justify-start">
                <h1 className="text-right text-xl text-white font-bold my-2 ">
                  <span className="text-one font-bold text-2xl ml-2">#</span>
                  اسم الطبخة:
                </h1>
              </div>

              <input
                value={inputs.mealName}
                onChange={(e) =>
                  setInputs({ ...inputs, mealName: e.target.value })
                }
                type="text"
                id="اسم الطبخة"
                name="اسم الطبخة"
                placeholder="... شاورما الدجاج"
                autoFocus
                className="text-right w-full p-2 rounded-lg text-lg outline-2 focus:outline-one h-10"
              />
              {/* <div className="flex items-center gap-2 w-full justify-start">
                <h1 className="text-right text-xl text-white font-bold my-2 ">
                  <span className="text-one font-bold text-2xl ml-2">#</span>
                  رابط الصورة:{' '}
                </h1>
              </div>

              <input
                value={inputs.image}
                onChange={(e) =>
                  setInputs({ ...inputs, image: e.target.value })
                }
                type="text"
                id="رابط الصورة"
                name="رابط الصورة"
                placeholder="...رابط الصورة"
                autoFocus
                className="text-right w-full p-2 rounded-lg text-lg outline-2 focus:outline-one h-10"
              /> */}
            </div>
            <div className="flex flex-col items-center justify-center w-full my-2 ">
              {errors.mealName && (
                <h1 className="text-one text-2xl text-start my-2 w-full animate-bounce font-bold opacity-0 ">
                  اسم الطبخة مطلوب
                </h1>
              )}
              {errors.selectedValue && (
                <h1 className="text-one text-2xl text-start my-2 w-full animate-bounce font-bold">
                  اختيار الصنف مطلوب
                </h1>
              )}
              <div className="flex items-center gap-2 w-full justify-start">
                <h1 className="text-right text-xl text-white font-bold my-2">
                  <span className="text-one font-bold text-2xl ml-2">#</span>
                  اختر الصنف:
                </h1>
              </div>

              <SelectComponent />
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <div className="relative w-full h-28">
            <Image
              src={
                'https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716954/cooking/vege1_jvpnhw.png'
              }
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
          {errors.ingredients && (
            <h1 className="text-one text-2xl text-start my-2 w-full animate-bounce font-bold">
              حقل المقادير مطلوب
            </h1>
          )}
          <div className="flex items-center gap-2 w-full justify-start">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              <span className="text-one font-bold text-2xl ml-2">#</span>
              المقادير:
            </h1>
          </div>

          <textarea
            value={inputs.ingredients}
            onChange={(e) =>
              setInputs({ ...inputs, ingredients: e.target.value })
            }
            dir="rtl"
            rows={'6'}
            name="المقادير"
            id="المقادير"
            className="scrollBar text-right w-full p-2 rounded-lg text-xl h-36 outline-2 focus:outline-one"
            placeholder={`١- خبز توست حسب الرغبة
٢- جبن شرائح
٣- ٥ بيضات مخفوقة
٤- ملح وفلفل
٥- بقدونس مفروم ناعماً للتزيين
                `}
          ></textarea>
        </div>
        <div className="w-full my-4">
          <div className="relative w-full h-28">
            <Image
              src={
                'https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716956/cooking/spices_v4n9lm.png'
              }
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
          {errors.theWay && (
            <h1 className="text-one text-2xl text-start my-2 w-full animate-bounce font-bold">
              حقل الطريقة مطلوب
            </h1>
          )}
          <div className="flex items-center gap-2 w-full justify-start">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              <span className="text-one font-bold text-2xl ml-2">#</span>
              الطريقة:
            </h1>
          </div>

          <textarea
            value={inputs.theWay}
            onChange={(e) => setInputs({ ...inputs, theWay: e.target.value })}
            dir="rtl"
            rows={'6'}
            name="المقادير"
            id="المقادير"
            placeholder={`١- يخفق البيض مع الملح والفلفل
٢- يوضع في آل خبزة شريحة من الجبن ثم تغطى بقطعة أخرى من الخبز على شكل
سندويتشات ثم تقطع على شكل مثلثات
٣- تغمس السندويتشات في البيض المخفوق من الجهتين وتوضع في الزيت وتضاف
الزبدة مع الزيت لإعطاء نكهة طيبة وذلك حسب الرغبة
٤- تحمر على نار هادئة إلى متوسطة
٥- توضع على شبك حتى تصفى من الزيت أو على ورق نشاف وتقدم مع الحليب أو
العصير
                `}
            className="text-right w-full p-2 rounded-lg text-xl h-36 outline-2 focus:outline-one"
          ></textarea>
        </div>
        <div className="w-full my-4">
          <div className="flex items-center gap-2 w-full justify-start">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              <span className="text-one font-bold text-2xl ml-2">#</span>
              نصائح لتحضير :
            </h1>
          </div>
          <textarea
            value={inputs.advise}
            onChange={(e) => setInputs({ ...inputs, advise: e.target.value })}
            dir="rtl"
            rows={'6'}
            name="المقادير"
            id="المقادير"
            placeholder={`اكتب بعض النصائح عن تحضير هذه الطبخة
                `}
            className="text-right w-full p-2 rounded-lg text-xl h-24 outline-2 focus:outline-one"
          ></textarea>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 w-full justify-start ">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              <span className="text-one font-bold text-2xl ml-2">#</span>
              أضف رابط الطبخة من يوتيوب:.
            </h1>
          </div>
          {/* <YoutubeEmbedder /> */}

          <input
            type="text"
            placeholder="... ضع رابط الفيديو هنا"
            value={url}
            onChange={handleInputChange}
            className="text-right mt-4 mb-8 w-full p-2 rounded-lg text-lg outline-2 focus:outline-one h-10"
          />
          {inputs?.link && (
            <div>
              <iframe
                width="560"
                height="315"
                src={inputs?.link}
                frameBorder="0"
                allowFullScreen
                title="Embedded YouTube Video"
                className="rounded-lg w-full h-44 sm:h-96 lg:h-[470px] xl:h-[500px] 2xl:h-[560px]"
              />
            </div>
          )}
          {/* <input
            value={inputs.link}
            onChange={(e) => setInputs({ ...inputs, link: e.target.value })}
            type="text"
            id="رابط الفيديو"
            name="رابط الفيديو"
            placeholder="... رابط الفيديو"
            className="text-right w-full p-2 rounded-lg text-xl outline-2 focus:outline-one"
          /> */}
        </div>
        {/* <div className="w-full flex flex-col items-start justify-center lg:flex-row gap-4 my-10 rounded-lg">
          <div className="w-full bg-four p-4 rounded-lg mb-4 border border-one">
            <h1 className="text-one md:text-xl font-bold w-full">
              {' '}
              لا تقم بنسخ رابط الفيديو من يوتيوب مباشرة لأنه لن يعمل
            </h1>
            <pre className="text-white font-sans w-full text-start md:text-xl select-none">
              لوضع الرابط من يوتيوب بشكل صحيح اتبع الخطوات التالية:
            </pre>
            <pre className="text-white font-sans w-full text-start md:text-xl select-none">
              1- قم بالضغط على زر مشاركة أسفل الفيديو
            </pre>{' '}
            <pre className="text-white font-sans w-full text-start md:text-xl select-none">
              2- اضغط على كلمة embed
            </pre>
            <pre className="text-white font-sans w-full text-start md:text-xl select-none">
              3- اضغط على كلمة نسخ copy
            </pre>
            <pre className="text-white font-sans w-full text-start md:text-xl select-none">
              ثم الصق الرابط في حقل رابط الفيديو هنا
            </pre>
          </div>
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={
                'https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716953/cooking/info_ci1rzp.png'
              }
              fill
              alt="photo"
            />
          </div>
        </div> */}
        <div className="flex flex-col sm:flex-row justify-around items-center gap-8 w-full my-12">
          <button
            type="submit"
            className="btn bg-five rounded-lg text-white shadow-lg hover:outline outline-one text-xl hover:font-bold py-2 px-16 w-full"
          >
            حفظ
          </button>
          {cancel && (
            <button
              type="text"
              className="btn bg-five rounded-lg text-white shadow-lg hover:outline  outline-one text-xl hover:font-bold py-2 px-16 w-full"
              onClick={() => {
                setIsVisible(false);
                setInputs({
                  mealName: '',
                  selectedValue: '',
                  image: '',
                  ingredients: '',
                  theWay: '',
                  advise: '',
                  link: '',
                });
              }}
            >
              إلغاء
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
