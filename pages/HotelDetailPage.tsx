import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { StarIcon, DollarSignIcon } from '../components/icons';
import { hotels as allHotels } from '../data/hotels';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon 
          key={index} 
          className={`w-6 h-6 ${index < Math.round(rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
          solid={index < Math.round(rating)}
        />
      ))}
      <span className="ml-2 text-slate-600 dark:text-slate-300 font-semibold">{rating.toFixed(1)}</span>
      <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">/ 5</span>
    </div>
  );
};

export const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const hotel = useMemo(() => allHotels.find(h => h.id === id), [id]);

  if (!hotel) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Hotel not found</h1>
        <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
          &larr; Back to all hotels
        </Link>
      </div>
    );
  }

  const isClean = hotel.status === 'Clean';
  const statusColor = isClean ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
  const statusBgColor = isClean ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-red-100 dark:bg-red-900';
  
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${hotel.name}, ${hotel.city}`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <Seo 
        title={hotel.name}
        description={`Pest report details for ${hotel.name}, ${hotel.city}. Current status: ${hotel.status}.`}
      />
      <JsonLd hotel={hotel} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img className="h-64 w-full object-cover md:w-80" src={hotel.image} alt={hotel.name} />
                </div>
                <div className="p-8 flex-grow">
                    <div>
                      <div className="uppercase tracking-wide text-sm text-emerald-500 font-semibold">{hotel.city}</div>
                      <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-black dark:text-white">{hotel.name}</h1>
                    </div>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Last updated: {hotel.lastUpdated}</p>
                    <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${statusColor} ${statusBgColor}`}>
                      {isClean ? '✅' : '⚠️'}
                      <span className="ml-3">{hotel.status}</span>
                    </div>
                </div>
              </div>
              
              <div className="p-8 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Highlights</h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
                    <div className="flex items-center">
                        <StarRating rating={hotel.avgRating} />
                    </div>
                    <div className="flex items-center">
                        <DollarSignIcon className="w-6 h-6 mr-2 text-emerald-500" />
                        <div>
                          <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">{hotel.priceRange}</span>
                          <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">Price Range</span>
                        </div>
                    </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Description & Details</h2>
                <div className="text-slate-600 dark:text-slate-300 prose dark:prose-invert max-w-none">
                  {hotel.description.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </div>

              <div className="p-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Pest Report Details</h2>
                {hotel.reports.length > 0 ? (
                  <div className="space-y-6">
                    {hotel.reports.map((report, index) => (
                      <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-lg font-semibold text-red-700 dark:text-red-400">{report.type}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{report.date}</p>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300"><strong>Notes:</strong> {report.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 px-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                    <p className="text-slate-600 dark:text-slate-400">No pest issues have been reported for this hotel. All clear!</p>
                  </div>
                )}
                <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 italic">
                  <p>All reports are submitted by the community and are not independently verified.</p>
                  <p>
                    Think this is incorrect? You can help by{' '}
                    <Link to="/report" className="text-emerald-600 hover:underline font-semibold">
                      contributing a report
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Location</h2>
              <div 
                className="relative w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700" 
                style={{paddingTop: '75%' /* 4:3 Aspect Ratio */}}
              >
                <iframe
                  src={mapSrc}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                  // FIX: The allowFullScreen prop expects a boolean, not a string.
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${hotel.name}`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
         <div className="text-center mt-8">
          <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block font-semibold">
            &larr; Back to all hotels
          </Link>
        </div>
      </main>
    </>
  );
};
