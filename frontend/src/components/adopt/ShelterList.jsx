import React from 'react';
import ShelterCard from './ShelterCard';
<<<<<<< HEAD
=======
import { motion, AnimatePresence } from 'motion/react';
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed

const ShelterList = ({ shelters, loading, hasMore, onLoadMore }) => {
  if (loading && shelters.length === 0) {
    return (
<<<<<<< HEAD
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-32 bg-gray-100 rounded-2xl animate-pulse" />
=======
      <div className="flex flex-col gap-4 py-10 w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 bg-gray-50 rounded-2xl animate-pulse w-full" />
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
        ))}
      </div>
    );
  }

  if (shelters.length === 0) {
    return (
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
        <h3 className="text-xl font-bold text-gray-400 mb-2">No shelters found matching your search.</h3>
        <p className="text-gray-400 max-w-sm">Try expanding your search query or enabling location services.</p>
=======
      <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[30px] my-4 w-full">
        <span className="text-gray-500 font-bold text-xl block mb-2">No shelters found nearby.</span>
        <p className="text-gray-400 font-medium text-sm">Try expanding your search query or changing your location.</p>
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col">
      <div className="flex flex-col bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden mb-10">
        {shelters.map(shelter => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pb-10">
          <button 
            onClick={onLoadMore}
            className="px-8 py-3 bg-white border-2 border-pastel-pink/20 text-pastel-pink rounded-2xl font-bold hover:bg-pastel-pink/10 transition-all shadow-sm flex items-center gap-2"
=======
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm mt-4 mb-20 w-full">
      <AnimatePresence mode="popLayout">
        {shelters.map((shelter) => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </AnimatePresence>

      {hasMore && (
        <div className="p-6 flex justify-center w-full">
          <button 
            onClick={onLoadMore}
            className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
          >
            Load More Shelters
          </button>
        </div>
      )}
    </div>
  );
};

export default ShelterList;
