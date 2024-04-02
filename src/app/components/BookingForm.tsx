'use client'

import React, { FormEvent, useState, createRef } from 'react'
import { markazi } from '../fonts';
import { fetchAPI } from './mockapi'
import ConfirmedBooking from './ConfirmedBooking';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReservationSchema } from '../models/Reservation';
import type { ReservationType } from '../models/Reservation';
import { zodResolver } from '@hookform/resolvers/zod';

type BookingFormProps = {
  submitForm: (formData: Object) => Promise<any>
};

export default function BookingForm({ submitForm } : BookingFormProps) {

  const [showConfirm, setShowConfirm] = useState(false)
  const [timesData, setTimesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const todaysDate = new Date().toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
    resetField,
  } = useForm<ReservationType>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      date: todaysDate,
      time: '',
      guests: '',
      occasion: '',
      comments: '',
    }
  });

  const onSubmit: SubmitHandler<ReservationType> = async (data) => {
    setIsLoading(true)
    const submission = await submitForm(getValues())
    .then(() => {
      console.log(data);
      setShowConfirm(false);
      reset();
      setIsLoading(false)
    })
    .catch((error) => { console.log(error)})
  }

  const handleNextClick = async (event : FormEvent<HTMLFormElement>) => {
    const output = await trigger()
    event.preventDefault()
    if(!output) return
    setShowConfirm(true)
  }

  const handleChangeDate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let newDate = event.target.value
    const _timesData = await fetchAPI(newDate)
      .catch((error) => console.log(error))
    setTimesData(_timesData)
    resetField("time")
  }

  const checkForTimes = () => {
    if(timesData === undefined){
      return false
    }
    else if(timesData.length < 1){
      return false
    }
    else{
      return true
    }
  }

  return (
    <>
      <div className="text-4xl font-bold">
        <h1 className={markazi.className}>Reserve Table</h1>
      </div>
      <p>Please fill out this form to reserve a table.</p>
      <hr style={{ borderTop: "1px solid #495E57" }} className="mt-4"></hr>
      <form
        id="res-form"
        onSubmit={handleNextClick}
        className="flex flex-col md:grid md:grid-cols-6 gap-4 pt-5 text-md"
        noValidate
      >
        {showConfirm && (
          <ConfirmedBooking
            setShowConfirm={setShowConfirm}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            getValues={getValues}
            isLoading={isLoading}
          />
        )}
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="first" className="font-bold">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="text"
            placeholder="Enter first name"
            id="first"
            autoComplete="on"
            required
          />
          {errors.firstName?.message && (
            <p className="text-sm text-red-500 font-bold mt-1">
              {errors.firstName.message}
            </p>
          )}
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="last" className="font-bold">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="text"
            placeholder="Enter last name"
            id="last"
            autoComplete="on"
            required
          />
          {errors.lastName?.message && (
            <p className="text-sm text-red-500 font-bold mt-1">
              {errors.lastName.message}
            </p>
          )}
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            {...register("email")}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="email"
            placeholder="Enter email address"
            id="email"
            autoComplete="on"
            required
          />
          {errors.email?.message && (
            <p className="text-sm text-red-500 font-bold mt-1">
              {errors.email.message}
            </p>
          )}
        </section>
        <hr
          style={{ borderTop: "1px solid #495E57" }}
          className="my-2 md:col-span-8 md:mt-3"
        ></hr>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="date" className="font-bold">
            Date
          </label>
          <input
            {...register("date", {
              onChange: (e) => handleChangeDate(e)
            })}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="date"
            id="date"
            autoComplete="on"
            defaultValue={todaysDate}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          {errors.date?.message && (
            <p className="text-sm text-red-500 font-bold mt-1">
              {errors.date.message}
            </p>
          )}
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="time" className="font-bold">
            Time
          </label>
          <select
            {...register("time")}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2.5 invalid:text-gray-400 focus:outline-LLyellow"
            id="time"
            required
            defaultValue=""
          >
            <option value="" disabled>
              - Select a time -
            </option>
            {checkForTimes() ? (
              <>
                {timesData[0] ? (
                  <option className="text-black" value={timesData[0]}>
                    {timesData[0]}
                  </option>
                ) : (
                  <></>
                )}
                {timesData[1] ? (
                  <option className="text-black" value={timesData[1]}>
                    {timesData[1]}
                  </option>
                ) : (
                  <></>
                )}
                {timesData[2] ? (
                  <option className="text-black" value={timesData[2]}>
                    {timesData[2]}
                  </option>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <option disabled>No times available</option>
            )}
          </select>
          {errors.time?.message && (
            <p className="text-sm text-red-500 font-bold mt-1">
              {errors.time.message}
            </p>
          )}
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="guests" className="font-bold">
            Guests
          </label>
          <input
            {...register("guests")}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="number"
            id="guests"
            placeholder="Enter amount of guests"
            min={1}
            max={25}
            required
          />
          {errors.guests?.message && (
            <p className="text-sm text-red-500 font-bold mt-1">
              {errors.guests.message}
            </p>
          )}
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="occasion" className="font-bold">
            Occasion (optional)
          </label>
          <select
            {...register("occasion")}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2.5 focus:outline-LLyellow"
            id="occasion"
            defaultValue=""
          >
            <option value="" className="text-gray-400">
              - Select an occasion -
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Engagement">Engagement</option>
            <option value="Other">Other</option>
          </select>
        </section>
        <section className="flex flex-col md:col-span-6">
          <label htmlFor="comments" className="font-bold">
            Additional Comments (optional)
          </label>
          <textarea
            {...register("comments")}
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            id="comments"
            placeholder="Enter any additional comments"
            rows={5}
            style={{ resize: "none" }}
          ></textarea>
        </section>
        <br className="md:hidden" />
        <div className="md:col-span-6">
          <button
            className="bg-black w-full text-white p-2 rounded-xl col-span-6 md:w-1/2 md:mt-5 hover:bg-neutral-800 active:bg-black disabled:bg-gray-500"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
}

