"use client"

import React from 'react'
import { markazi } from '../fonts';
import { SubmitHandler, UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';

type ConfirmedBookingProps = {
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: SubmitHandler<{
    firstName: string;
    lastName: string;
    email: string;
    date: string;
    time: string;
    guests: string;
    occasion?: string | undefined;
    comments?: string | undefined;
  }>
  handleSubmit: UseFormHandleSubmit<{
    date: string;
    time: string;
    firstName: string;
    lastName: string;
    email: string;
    guests: string;
    occasion?: string | undefined;
    comments?: string | undefined;
  }, undefined>
  getValues: UseFormGetValues<{
    firstName: string;
    lastName: string;
    email: string;
    date: string;
    time: string;
    guests: string;
    occasion?: string | undefined;
    comments?: string | undefined;
  }>
  isLoading: boolean
}

export default function ConfirmedBooking({ setShowConfirm, onSubmit, handleSubmit, getValues, isLoading } : ConfirmedBookingProps) {

  const closeConfirm = () => {
    setShowConfirm(false);
  }

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
              {getValues().firstName} {getValues().lastName}
            </p>

            <p className="font-bold">Email:</p>
            <p>{getValues().email}</p>

            <p className="font-bold">Date:</p>
            <p>{getValues().date}</p>

            <p className="font-bold">Time:</p>
            <p>{getValues().time}</p>

            <p className="font-bold">Guests:</p>
            <p>{getValues().guests}</p>

            {getValues().occasion && (
              <div>
                <p className="font-bold">Occasion:</p>
                <p>{getValues().occasion}</p>
              </div>
            )}

            {getValues().comments && (
              <div>
                <p className="font-bold">Comments:</p>
                <p>{getValues().comments}</p>
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
                  onClick={handleSubmit(onSubmit)}
                >
                  {isLoading ? "Confirming..." : "Confirm"}
                </button>

            </div>
          </div>
        </dialog>

    </>
  );
}
