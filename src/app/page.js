"use client";

import { useState } from "react";
import Head from "next/head";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import arrow from "../images/icon-arrow.svg";
import Image from "next/image";

export default function Home() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");

  const today = new Date();
  const birthDate = new Date(years, months - 1, days); 
  
  const isValidDate = birthDate instanceof Date && !isNaN(birthDate.getTime()) && birthDate < today;
  
  const diffInYears = isValidDate ? differenceInYears(today, birthDate) : "--";
  const diffInMonths = isValidDate ? differenceInMonths(today, birthDate) % 12 : "--";

let diffInDays = "--";
if (isValidDate) {
  const yearPart = birthDate.getFullYear() + diffInYears;
  const monthPart = birthDate.getMonth() + diffInMonths;
  const monthAdjustedDate = new Date(yearPart, monthPart, birthDate.getDate());

  diffInDays = differenceInDays(today, monthAdjustedDate);
}

  return (
    <>
      <Head>
        <title>Age CAlculator</title>
        <link rel="icon" href="../images/favicon-32x32.png" />
      </Head>
      <main className="lg:flex lg:items-center lg:justify-center lg:h-screen">
        <div
          style={{
            borderBottomRightRadius: 100,
          }}
          className="max-w-lg mx-auto bg-white rounded-3xl shadow p-8"
        >
          <div>
            <form className="flex gap-4">
              <article>
                <label htmlFor="day" className={`${days > 31 && "text-rose-600"}`}>Day</label>
                <input
                  type="number"
                  name="day"
                  placeholder="DD"
                  min="1"
                  max="31"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
                {days > 31 && <small className="text-rose-600 block mt-2">Must be a valid day</small>}
              </article>

              <article>
                <label htmlFor="month" className={`${months > 12 && "text-rose-600"}`}>Month</label>
                <input
                  type="number"
                  name="month"
                  placeholder="MM"
                  min="1"
                  max="12"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
                {months > 12 && <small className="text-rose-600 block mt-2">Must be a valid month</small>}
              </article>

              <article>
                <label htmlFor="year" className={`${years > 2023 && "text-rose-600"}`}>Year</label>
                <input
                  type="number"
                  name="yaer"
                  placeholder="YYYY"
                  min="1900"
                  max="2023"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
                {years > 2023 && <small className="text-rose-600 block mt-2">Must be in the past</small>}
              </article>
            </form>
          </div>

          <div className="mt-10 relative">
            <article className="border-b border-slate-400">

            </article>
            <article className="absolute right-0 -top-6">
            <Image
              width={50}
              height={50}
              src={arrow}
              alt="Arrow Icon"
              className="bg-purple-600 p-2 rounded-full"
            />
            </article>
          </div>

          <div className="mt-10">
            <ul className="flex flex-col gap-2">
              <li className="text-5xl italic font-bold">
                <span className="text-purple-600"> {diffInYears}</span> Years
              </li>
              <li className="text-5xl italic font-bold">
                <span className="text-purple-600">{diffInMonths}</span> Months
              </li>
              <li className="text-5xl italic font-bold">
                <span className="text-purple-600">{diffInDays}</span> Days
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
