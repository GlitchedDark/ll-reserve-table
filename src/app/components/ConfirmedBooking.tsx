"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { markazi } from '../fonts';
import { Reservation } from '../page';

type ConfirmedBookingProps = {
  resInfo: Reservation;
  setResInfo: Dispatch<
    SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      date: string;
      time: string;
      guests: string;
      occasion: string;
      comments: string;
    }>
  >
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>
  submitForm: (formData: Object) => Promise<any>
  formRef: React.RefObject<HTMLFormElement>
}

export default function ConfirmedBooking({ resInfo, setShowConfirm, submitForm, setResInfo, formRef } : ConfirmedBookingProps) {

  const closeConfirm = () => {
    setShowConfirm(false);
  }

  const handleConfirmButton = () => {
    if (!!submitForm(resInfo)) {
      console.log("submitted successfully");
      closeConfirm();
      formRef.current?.reset()
      setResInfo({
        ...resInfo,
        occasion: "",
        comments: "",
      });
    }

    if (!submitForm(resInfo)) {
      console.log("something went wrong");
    }
  };

  return (
    <>

        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-slate-100 rounded-xl p-8 w-10/12 md:w-7/12 lg:w-6/12">
            <div className="text-3xl font-bold">
              <h3 className={markazi.className}>Confirm Reservation</h3>
            </div>
            <br />

            <p className="font-bold">Name:</p>
            <p>
              {resInfo.firstName} {resInfo.lastName}
            </p>

            <p className="font-bold">Email:</p>
            <p>{resInfo.email}</p>

            <p className="font-bold">Date:</p>
            <p>{resInfo.date}</p>

            <p className="font-bold">Time:</p>
            <p>{resInfo.time}</p>

            <p className="font-bold">Guests:</p>
            <p>{resInfo.guests}</p>

            {resInfo.occasion && (
              <div>
                <p className="font-bold">Occasion:</p>
                <p>{resInfo.occasion}</p>
              </div>
            )}

            {resInfo.comments && (
              <div>
                <p className="font-bold">Comments:</p>
                <p>{resInfo.comments}</p>
              </div>
            )}

            <br />
            <div className="flex justify-center w-full md:w-3/4 gap-5">

                <button
                  type="button"
                  className="rounded-xl bg-red-500 text-white p-2 w-full"
                  onClick={closeConfirm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="res-form"
                  className="bg-LLyellow rounded-xl text-black font-bold p-2 w-full"
                  onClick={handleConfirmButton}
                >
                  Confirm
                </button>

            </div>
          </div>
        </dialog>

    </>
  );
}
