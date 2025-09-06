"use client";
import Link from "next/link";
import DynamicHero from "./DynamicHero";
import { faqData } from "../data/faqData";

export default function Faq() {
  return (
    <>
      <div className="w-full m-0 p-0">
        <DynamicHero backgroundImage="/heroes.jpeg" />
      </div>
      <section
        id="faq"
        className="w-full flex justify-center items-center bg-transparent"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        <div className="w-full max-w-2xl px-4 md:px-8 py-14 flex flex-col items-center">
          <h3 className="text-center text-2xl font-bold text-orange-600 tracking-wide mb-8 uppercase">
            Foire aux questions
          </h3>
          <div className="w-full flex flex-col gap-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-orange-400"
              >
                <Link
                  href={`/faq/${item.slug}`}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl"
                >
                  <span className="text-lg font-medium text-gray-800 dark:text-white first-letter:uppercase">
                    {item.question.toLowerCase()}
                  </span>
                  <svg
                    className="w-5 h-5 ml-4 text-orange-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}