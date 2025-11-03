import React from 'react';
import { Seo } from '../components/Seo';

export const ReportPage: React.FC = () => {
  // NOTE: This is a placeholder URL. Replace with your actual Google Form embed URL.
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScnCZOk-cdnCTW25WBhnWDR3MOcQ0HsaGv_Id5gbQA7OV-qyw/viewform?usp=sharing&ouid=106912382513073938869";

  return (
    <>
      <Seo 
        title="Contribute a Report"
        description="Help the community by submitting a hotel pest report through our simple form. Your contribution helps travelers stay safe."
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Contribute a Hotel Report</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-8">
            <p>
              Thank you for helping keep our travel community safe! Your contribution is vital to our mission/Project. Please use the form below to report a new pest issue, confirm a hotel is clean, or update existing hotel details.
            </p>
            <p>
              All submissions are reviewed by our volunteer maintainers before being added to the public dataset on GitHub. This helps us ensure the data is as accurate and helpful as possible.
            </p>
          </div>
          
          <div className="relative h-[800px] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
            <iframe
              src={googleFormUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Hotel Report Form"
              className="absolute top-0 left-0 w-full h-full"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>
    </>
  );
};