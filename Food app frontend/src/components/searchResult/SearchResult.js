import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './searchresult.css';
import { StoreContext } from '../StoreContext/StoreContext';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext); // Get URL from StoreContext

  // Ensure state is not undefined
  const { filteredFoods = [], filteredCategories = [] } = location.state || { filteredFoods: [], filteredCategories: [] };

  // Redirect if no search data is present (handles direct page access)
  useEffect(() => {
    if (!location.state) {
      console.warn('No search results found, redirecting...');
      navigate('/'); // Redirect to home or search page
    }
  }, [location.state, navigate]);

  return (
    <div className="search-results">
      <h2>Search Results</h2>

      {/* Debugging logs */}
      {console.log('Filtered Categories:', filteredCategories)}
      {console.log('Filtered Foods:', filteredFoods)}

      {filteredFoods.length === 0 && filteredCategories.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <>
          {filteredCategories.length > 0 && (
            <div>
              <h3>Categories</h3>
              <ul>
                {filteredCategories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </div>
          )}

          {filteredFoods.length > 0 && (
            <div className="food-results">
              <h3>Food Items</h3>
              <ul className="food-list">
                {filteredFoods.map((food) => (
                  <li key={food.id} className="food-item">
                    {/* Display Image */}
                    <img 
                      src={`${url}/images/${food.image}`} 
                      alt={food.name} 
                      className="food-image" 
                      onError={(e) => {
                        console.error(`Image not found: ${food.image}`);
                        e.target.style.display = 'none';
                      }} 
                    />

                    {/* Food Details */}
                    <div className="food-details">
                      <p className="food-name">{food.name}</p>
                      <p className="food-price">₹{food.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;

// import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import './searchresult.css';
// import { StoreContext } from '../StoreContext/StoreContext';

// const SearchResults = () => {
//   const location = useLocation();
//   const { filteredFoods = [], filteredCategories = [] } = location.state || {};
//   const { url } = useContext(StoreContext); // Get URL from StoreContext

//   return (
//     <div className="search-results">
//       <h2>Search Results</h2>

//       {filteredFoods.length === 0 && filteredCategories.length === 0 ? (
//         <p>No results found.</p>
//       ) : (
//         <>
//           {filteredCategories.length > 0 && (
//             <div>
//               <h3>Categories</h3>
//               <ul>
//                 {filteredCategories.map((category) => (
//                   <li key={category.id}>{category.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {filteredFoods.length > 0 && (
//             <div className="food-results">
//               <h3>Food Items</h3>
//               <ul className="food-list">
//                 {filteredFoods.map((food) => (
//                   <li key={food.id} className="food-item">
//                     {/* Display Image */}
//                     <img 
//                       src={`${url}/images/${food.image}`} 
//                       alt={food.name} 
//                       className="food-image" 
//                       onError={(e) => e.target.style.display = 'none'} 
//                     />

//                     {/* Food Details */}
//                     <div className="food-details">
//                       <p className="food-name">{food.name}</p>
//                       <p className="food-price">₹{food.price}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
