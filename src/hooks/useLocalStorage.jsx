// const { useState, useEffect } = require("react");

// export const useLocalStorage = (key) => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedData = localStorage.getItem(key);
//       setData(storedData);
//     }
//   }, [key]);

//   return data;
// };

// export const useLogout = (key) => {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem(key);
//     }
//   }, []);
// };
