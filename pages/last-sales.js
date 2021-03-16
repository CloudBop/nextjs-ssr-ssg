import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage() {
  const [sales, setSales] = useState(null);
  // const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    "https://my-nextjs-db-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const intoArray = [];

      for (const key in data) {
        // if (Object.hasOwnProperty.call(object, key)) {
        intoArray.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        });
        // }
      }

      setSales(intoArray);
    }
    // return () => {
    //   cleanup
    // }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales === null) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h2>Testing {sales.length}</h2>
      <ul>
        {sales.map(sale => (
          <li key={sale.id}>
            {sale.username} - {sale.volume}
          </li>
        ))}
      </ul>
    </>
  );
}

export default LastSalesPage;

// useEffect(() => {
//   if (document) {
//     // warning dummy. will break after 30 days
//     fetch("https://my-nextjs-db-default-rtdb.firebaseio.com/sales.json")
//       .then(response => response.json())
//       .then(data => {
//         if (data) {
//           console.log(`data`, data);
//           const intoArray = [];

//           for (const key in data) {
//             // if (Object.hasOwnProperty.call(object, key)) {
//             intoArray.push({
//               id: key,
//               username: data[key].username,
//               volume: data[key].volume
//             });
//             // }
//           }

//           setSales(intoArray);
//           setLoading(false);
//         }
//       });
//   }
// }, []);
