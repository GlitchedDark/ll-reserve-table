'use client'

import React, { FormEvent, useState, Dispatch, SetStateAction, useEffect, createRef } from 'react'
import { markazi } from '../fonts';
import { fetchAPI } from './mockapi'
import { Reservation } from '../page';
import ConfirmedBooking from './ConfirmedBooking';

type BookingFormProps = {
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
  >;
  submitForm: (formData: Object) => Promise<any>
};

export default function BookingForm({ resInfo, setResInfo, submitForm } : BookingFormProps) {

  const [showConfirm, setShowConfirm] = useState(false)

  const todaysDate = new Date().toISOString().split('T')[0]
  const formRef = createRef<HTMLFormElement>();

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowConfirm(true)
  }

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value
    setResInfo({...resInfo, date: newDate})
  }

  const [timesData, setTimesData] = useState([])

  useEffect(() => {
    const init = async() => {
      let newDate = resInfo.date
      const _timesData = await fetchAPI(newDate)
        .catch((error) => console.log(error))

      setTimesData(_timesData);
    };
    init();
  }, [resInfo.date]);

  return (
    <>
      <div className="text-4xl font-bold">
        <h1 className={markazi.className}>Reserve Table</h1>
      </div>
      <p>Please fill out this form to reserve a table.</p>
      <hr style={{ borderTop: "1px solid #495E57" }} className="mt-4"></hr>
      <form
        id="res-form"
        onSubmit={handleSubmit}
        className="flex flex-col md:grid md:grid-cols-6 gap-4 pt-5 text-md"
        ref={formRef}
      >
        {showConfirm && (
          <ConfirmedBooking
            resInfo={resInfo}
            setResInfo={setResInfo}
            setShowConfirm={setShowConfirm}
            submitForm={submitForm}
            formRef={formRef}
          />
        )}
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="first" className="font-bold">
            First Name
          </label>
          <input
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="text"
            placeholder="Enter first name"
            id="first"
            autoComplete="on"
            onChange={(e) =>
              setResInfo({ ...resInfo, firstName: e.target.value })
            }
            required
          />
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="last" className="font-bold">
            Last Name
          </label>
          <input
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="text"
            placeholder="Enter last name"
            id="last"
            autoComplete="on"
            onChange={(e) =>
              setResInfo({ ...resInfo, lastName: e.target.value })
            }
            required
          />
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="email"
            placeholder="Enter email address"
            id="email"
            autoComplete="on"
            onChange={(e) => setResInfo({ ...resInfo, email: e.target.value })}
            required
          />
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
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="date"
            id="date"
            autoComplete="on"
            defaultValue={todaysDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChangeDate}
            required
          />
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="time" className="font-bold">
            Time
          </label>
          <select
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2.5 invalid:text-gray-400 focus:outline-LLyellow"
            id="time"
            onChange={(e) => setResInfo({ ...resInfo, time: e.target.value })}
            required
            defaultValue=""
          >
            <option value="" disabled>
              - Select a time -
            </option>
            {timesData ? (
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
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="guests" className="font-bold">
            Guests
          </label>
          <input
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            type="number"
            id="guests"
            placeholder="Enter amount of guests"
            min={1}
            max={25}
            onChange={(e) => setResInfo({ ...resInfo, guests: e.target.value })}
            required
          />
        </section>
        <section className="flex flex-col md:col-span-3">
          <label htmlFor="occasion" className="font-bold">
            Occasion (optional)
          </label>
          <select
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2.5 focus:outline-LLyellow"
            id="occasion"
            defaultValue=""
            onChange={(e) =>
              setResInfo({ ...resInfo, occasion: e.target.value })
            }
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
            className="w-auto border-2 border-LLgreen rounded-lg px-2 py-2 focus:outline-LLyellow"
            id="comments"
            placeholder="Enter any additional comments"
            rows={5}
            style={{ resize: "none" }}
            onChange={(e) =>
              setResInfo({ ...resInfo, comments: e.target.value })
            }
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

