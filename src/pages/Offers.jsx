import React from "react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "./ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get a reference
        const listingsRef = collection(db, "listings");
        //create a query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(5)
        );


         // Execute the Query
         const querySnap = await getDocs(q);
         // this querySnap doc starts from 0,, thats why [querySnap.docs.length -1]
       const lastVisible = querySnap.docs[querySnap.docs.length -1];
       setLastFetchedListing(lastVisible);

        
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Sorry Could not fetch the Data");
      }
    };

    fetchListing();
  },[]);



// Pagination   /Load More Listings 

const onFetchMoreListings = async () => {
  try {
    //get a reference
    const listingsRef = collection(db, "listings");
    //create a query
    const q = query(
      listingsRef,
      where("offer", "==", true),
      orderBy("timestamp", "desc"),
      startAfter(lastFetchedListing),
      limit(10)
    );

    // Execute the Query
    const querySnap = await getDocs(q);
      // this querySnap doc starts from 0,, thats why [querySnap.docs.length -1]
    const lastVisible = querySnap.docs[querySnap.docs.length -1];
    setLastFetchedListing(lastVisible);

    const listings = [];
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });


    setListings((prevState)=>[...prevState, ...listings]);
    setLoading(false);
  } catch (error) {
    toast.error("Sorry Could not fetch the Data");
  }
};


  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListing">
              {listings.map((listing) => (
                 <ListingItem
                 listing={listing.data}
                 id={listing.id}
                 key={listing.id}
               />
              ))}
            </ul>
          </main>
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
             Load More
            </p>
          )}
        </>
      ) : (
        <p> No Offers Going..</p>
      )}
    </div>
  );
}

export default Offers;
