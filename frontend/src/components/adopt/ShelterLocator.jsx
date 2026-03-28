import React, { useState, useEffect, useRef } from 'react';
import geohash from 'ngeohash';
import ShelterList from './ShelterList';

function getDistance(lat1, lon1, lat2, lon2) {
<<<<<<< HEAD
  const R = 6371;
=======
  const R = 6371; // Radius of the Earth in km
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
}

const mapTomTomData = (poiData) => {
  const distKm = poiData.dist ? (poiData.dist / 1000) : 0;
<<<<<<< HEAD
  let openNow = true;
  if (poiData.poi && poiData.poi.openingHours && typeof poiData.poi.openingHours.isOpen === 'boolean') {
    openNow = poiData.poi.openingHours.isOpen;
  }
=======
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
  
  return {
     id: poiData.id,
     name: poiData.poi?.name || 'Animal Shelter',
     phone: poiData.poi?.phone || null,
     address: poiData.address?.freeformAddress || null,
     municipality: poiData.address?.municipality || poiData.address?.localName || null,
     lat: poiData.position?.lat,
     lng: poiData.position?.lon,
     distance: distKm,
<<<<<<< HEAD
     specialties: [],
     isOpen: openNow,
     is247: false
  };
};

const ShelterLocator = ({ searchQuery }) => {
=======
  };
};

const ShelterLocator = ({ searchQuery = "" }) => {
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
  const [userLoc, setUserLoc] = useState({ lat: 19.0760, lng: 72.8777 }); 
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
<<<<<<< HEAD
=======

>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
  const abortControllerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const triggerFetch = (lat, lng, source) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
        fetchLocalShelters(lat, lng, source);
    }, 500);
  };

  const fetchLocalShelters = async (lat, lng, source = "Initial Page Load") => {
    setLoading(true);
    setErrorMsg('');
    setVisibleCount(10);
    
<<<<<<< HEAD
    if (abortControllerRef.current) abortControllerRef.current.abort();
=======
    // Request Deduplication
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
<<<<<<< HEAD
=======
      // Caching Layer
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
      const geoKey = geohash.encode(lat, lng, 5); 
      const cacheKey = `petconnect_shelters_cache_${geoKey}_${searchQuery}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData && !searchQuery) {
        const activeShelters = JSON.parse(cachedData).map(c => ({
<<<<<<< HEAD
            ...c, distance: getDistance(lat, lng, c.lat, c.lng)
        })).sort((a,b) => a.distance - b.distance);
=======
            ...c,
            distance: getDistance(lat, lng, c.lat, c.lng)
        })).sort((a,b) => a.distance - b.distance);
        
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
        setShelters(activeShelters);
        setLoading(false);
        return; 
      }

      const API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;
      if (!API_KEY) throw new Error("Missing VITE_TOMTOM_API_KEY");
      
      const fetchWithRadius = async (radius) => {
<<<<<<< HEAD
        const queryTerm = searchQuery || 'animal shelter';
        const finalRadius = searchQuery ? 100000 : radius; 
        // We use poiSearch and omit the veterinary category Set (9375) so it defaults to finding shelters
        const targetUrl = `https://api.tomtom.com/search/2/poiSearch/${encodeURIComponent(queryTerm)}.json?key=${API_KEY}&lat=${lat}&lon=${lng}&radius=${finalRadius}`;

        const executeFetchWithBackoff = async (retries = 3, delay = 1000) => {
          try {
            const res = await fetch(targetUrl, { signal });
=======
        const queryTerm = searchQuery ? `${searchQuery} animal shelter rescue` : 'animal shelter rescue';
        const finalRadius = searchQuery ? 100000 : radius; 
        const targetUrl = `https://api.tomtom.com/search/2/search/${encodeURIComponent(queryTerm)}.json?key=${API_KEY}&lat=${lat}&lon=${lng}&radius=${finalRadius}`;
        
        const executeFetchWithBackoff = async (retries = 3, delay = 1000) => {
          try {
            const res = await fetch(targetUrl, { method: 'GET', signal });
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
            if (res.status === 429 && retries > 0) {
              await new Promise(r => setTimeout(r, delay));
              return executeFetchWithBackoff(retries - 1, delay * 2); 
            }
            if (!res.ok) throw new Error(`API failed. Status: ${res.status}`);
            return res;
          } catch (err) {
            if (err.name === 'AbortError') throw err; 
            if (retries > 0) {
              await new Promise(r => setTimeout(r, delay));
              return executeFetchWithBackoff(retries - 1, delay * 2);
            }
            throw err;
          }
        };

        const res = await executeFetchWithBackoff();
        return await res.json();
      };

<<<<<<< HEAD
      let data = await fetchWithRadius(25000); // 25km radius for shelters since they are sparser

      if (!data.results || data.results.length === 0) {
        setErrorMsg("No verified shelters found in your immediate area.");
        setShelters([]);
      } else {
        const realShelters = data.results.map(mapTomTomData);
        realShelters.sort((a,b) => a.distance - b.distance);
        
        if (!searchQuery) sessionStorage.setItem(cacheKey, JSON.stringify(realShelters));
        setShelters(realShelters);
      }
    } catch(err) {
      if (err.name === 'AbortError') return;
      if (err.message === "Missing VITE_TOMTOM_API_KEY") {
        setErrorMsg('Invalid API Key Detected - Please check .env formatting.');
      } else {
        setErrorMsg(`We're having trouble reaching the shelter database.`);
      }
=======
      let data = await fetchWithRadius(25000);

      if (!data.results || data.results.length === 0) {
         setErrorMsg("No animal shelters found nearby.");
         setShelters([]);
      } else {
        const mapped = data.results.map(mapTomTomData);
        mapped.sort((a,b) => a.distance - b.distance);
        
        if (!searchQuery) sessionStorage.setItem(cacheKey, JSON.stringify(mapped));
        setShelters(mapped);
      }
    } catch(err) {
      if (err.name === 'AbortError') return;
      console.error(err);
      setErrorMsg(`We're having trouble reaching the shelter database.`);
      setShelters([]);
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLoc(loc);
          triggerFetch(loc.lat, loc.lng, "Geolocation Success");
        },
        (err) => {
          triggerFetch(userLoc.lat, userLoc.lng, "Geolocation Fallback");
        }
      );
    } else {
      triggerFetch(userLoc.lat, userLoc.lng, "Geolocation Unsupported");
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
<<<<<<< HEAD
  }, [searchQuery]); // Run fetch on searchQuery changes too!

  const filtered = shelters.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]); // Re-fetch when searchQuery changes

  const filtered = shelters.filter(c => 
    (c.name.toLowerCase().includes(searchQuery?.toLowerCase() || ''))
  );

>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
  const visibleShelters = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
<<<<<<< HEAD
    <div className="w-full">
      {errorMsg && (
        <div className="mb-6 bg-amber-50 text-amber-700 px-4 py-3 border border-amber-100 rounded-2xl text-[14px] font-bold shadow-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
=======
    <div className="flex flex-col w-full h-full min-h-[400px]">

      {errorMsg && (
        <div className="mb-6 bg-amber-50 text-amber-700 px-4 py-3 border border-amber-100 rounded-2xl text-[14px] font-bold shadow-sm flex items-center gap-2">
>>>>>>> d5c2d4f8f26d1e93eb9d54255540adb74f3e08ed
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          {errorMsg}
        </div>
      )}

      <ShelterList 
        shelters={visibleShelters} 
        loading={loading} 
        hasMore={hasMore} 
        onLoadMore={() => setVisibleCount(prev => prev + 10)} 
      />
    </div>
  );
};

export default ShelterLocator;
