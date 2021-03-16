import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
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

  if (!data && !sales) {
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

// example of SSR prefecting
export async function getStaticProps() {
  const response = await fetch(
    "https://my-nextjs-db-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const intoArray = [];

  if (data) {
    for (const key in data) {
      // if (Object.hasOwnProperty.call(object, key)) {
      intoArray.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume
      });
    }
  }

  return { props: { sales: intoArray }, revalidate: 3000000 };

  // - chained promises
  // return fetch("https://my-nextjs-db-default-rtdb.firebaseio.com/sales.json")
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data) {
  //       const intoArray = [];

  //       for (const key in data) {
  //         // if (Object.hasOwnProperty.call(object, key)) {
  //         intoArray.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume
  //         });
  //       }
  //     }

  //     return { props: { sales: intoArray }, revalidate: 100 };
  //   });
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
