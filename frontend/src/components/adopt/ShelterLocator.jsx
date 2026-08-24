import React, { useState, useEffect, useRef } from 'react';
import geohash from 'ngeohash';
import ShelterList from './ShelterList';

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
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
  let openNow = true;
  if (poiData.poi && poiData.poi.openingHours && typeof poiData.poi.openingHours.isOpen === 'boolean') {
    openNow = poiData.poi.openingHours.isOpen;
  }
  
  return {
     id: poiData.id,
     name: poiData.poi?.name || 'Animal Shelter',
     phone: poiData.poi?.phone || null,
     address: poiData.address?.freeformAddress || null,
     municipality: poiData.address?.municipality || poiData.address?.localName || null,
     lat: poiData.position?.lat,
     lng: poiData.position?.lon,
     distance: distKm,
     specialties: [],
     isOpen: openNow,
     is247: false
  };
};

const MOCK_SHELTERS = [
  {
    id: "mock-shelter-1",
    name: "Happy Paws Rescue Shelter (Mock)",
    phone: "+91 22 2640 9999",
    address: "Carter Road Promenade, Bandra West",
    municipality: "Mumbai",
    lat: 19.0640,
    lng: 72.8257,
    specialties: [],
    isOpen: true,
    is247: false
  },
  {
    id: "mock-shelter-2",
    name: "Save Our Strays Center (Mock)",
    phone: "+91 22 2510 8888",
    address: "Lokhandwala Complex, Andheri West",
    municipality: "Mumbai",
    lat: 19.1380,
    lng: 72.8257,
    specialties: [],
    isOpen: true,
    is247: true
  },
  {
    id: "mock-shelter-3",
    name: "Mumbai Animal Sanctuary (Mock)",
    phone: "+91 22 2890 7777",
    address: "Vikhroli Parksite, Ghatkopar West",
    municipality: "Mumbai",
    lat: 19.0880,
    lng: 72.8657,
    specialties: [],
    isOpen: false,
    is247: false
  }
];

const ShelterLocator = ({ searchQuery = "" }) => {
  const [userLoc, setUserLoc] = useState({ lat: 19.0760, lng: 72.8777 }); 
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  
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
    
    // Request Deduplication
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      // Caching Layer
      const geoKey = geohash.encode(lat, lng, 5); 
      const cacheKey = `petconnect_shelters_cache_${geoKey}_${searchQuery}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData && !searchQuery) {
        const activeShelters = JSON.parse(cachedData).map(c => ({
            ...c,
            distance: getDistance(lat, lng, c.lat, c.lng)
        })).sort((a,b) => a.distance - b.distance);
        
        setShelters(activeShelters);
        setLoading(false);
        return; 
      }

      const API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;
      if (!API_KEY || API_KEY === "placeholder_key_replace_me" || API_KEY.startsWith("your_")) {
        throw new Error("Missing VITE_TOMTOM_API_KEY");
      }
      
      const fetchWithRadius = async (radius) => {
        const queryTerm = searchQuery || 'animal shelter';
        const finalRadius = searchQuery ? 100000 : radius; 
        // We use poiSearch and omit the veterinary category Set (9375) so it defaults to finding shelters
        const targetUrl = `https://api.tomtom.com/search/2/poiSearch/${encodeURIComponent(queryTerm)}.json?key=${API_KEY}&lat=${lat}&lon=${lng}&radius=${finalRadius}`;

        const executeFetchWithBackoff = async (retries = 3, delay = 1000) => {
          try {
            const res = await fetch(targetUrl, { method: 'GET', signal });
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
      console.error(err);
      if (err.message === "Missing VITE_TOMTOM_API_KEY") {
        setErrorMsg('VITE_TOMTOM_API_KEY is not configured in .env. Showing local mock shelters for demonstration purposes.');
        const activeShelters = MOCK_SHELTERS.map(c => ({
          ...c,
          lat: lat + (c.lat - 19.0760) * 0.1,
          lng: lng + (c.lng - 72.8777) * 0.1,
        })).map(c => ({
          ...c,
          distance: getDistance(lat, lng, c.lat, c.lng)
        })).sort((a,b) => a.distance - b.distance);
        setShelters(activeShelters);
      } else {
        setErrorMsg(`We're having trouble reaching the shelter database. Showing local mock shelters.`);
        const activeShelters = MOCK_SHELTERS.map(c => ({
          ...c,
          lat: lat + (c.lat - 19.0760) * 0.1,
          lng: lng + (c.lng - 72.8777) * 0.1,
        })).map(c => ({
          ...c,
          distance: getDistance(lat, lng, c.lat, c.lng)
        })).sort((a,b) => a.distance - b.distance);
        setShelters(activeShelters);
      }
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
  }, [searchQuery]); // Run fetch on searchQuery changes too!

  const filtered = shelters.filter(c => (c.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')));
  const visibleShelters = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="flex flex-col w-full h-full min-h-[400px]">
      {errorMsg && (
        <div className="mb-6 bg-amber-50 text-amber-700 px-4 py-3 border border-amber-100 rounded-2xl text-[14px] font-bold shadow-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
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
