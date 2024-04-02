'use client'

import BookingForm from './components/BookingForm';
import Image from "next/image";
import { submitAPI } from './components/mockapi';

const submitForm = async(formData: Object) => {
  const formSubmission = await submitAPI(formData)
    .then(() => {
      return true
    })
    .catch((error) => {
      console.log(error)
      return false
    });
}

export default function Home() {

  return (
    <>
      <main className="flex justify-center lg:flex-row">
        <div className="m-3 p-5 bg-slate-100 rounded-xl md:w-8/12 lg:w-6/12">

          <BookingForm
            submitForm={submitForm}
          />
        </div>
        <div className="flex flex-col">
          <Image
            src="/restauranfood.png"
            width={200}
            height={200}
            style={{ width: "auto", height: "65%" }}
            alt="Picture of food from Little Lemon restaurant"
            className="hidden sm:hidden md:flex m-3 rounded-xl border-slate-100 border-2"
          ></Image>
          <Image
            src="/restaurant.png"
            width={200}
            height={100}
            style={{ width: "auto", height: "30%" }}
            alt="Picture of the Little Lemon restaurant"
            className="hidden sm:hidden md:flex m-3 rounded-xl border-slate-100 border-2"
          ></Image>
        </div>
      </main>
    </>
  );
}