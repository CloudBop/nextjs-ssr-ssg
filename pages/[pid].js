import React from "react";
import path from "path";
import fs from "fs/promises";

function ProductPage({ product }) {
  //(1) - see comment @fallback
  if (!product) {
    return <p>Loading...</p>;
  }

  const { title, description } = product;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

//  SSR + SSG of dynamic pages
export async function getStaticPaths() {
  return {
    // list all known paths to be SSG
    paths: [
      // these get passed into getStaticProps( context )
      { params: { pid: "p1" } },
      { params: { pid: "p2" } }
      // { params: { pid: "p3" } }
    ],
    // tell nextjs to load on request if they're not pre-rendered
    // will error if page is refreshed as data will not be there.
    // requires defensive rendering on client component (1)
    fallback: true
    // useful for not pre-rendering pages that are not frequently visited

    // similar to above will block render until req has res - means we can ignore defensive hydration component
    // fallback: "blocking"
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find(p => p.id === productId);

  return {
    props: {
      product
    }
  };
}

export default ProductPage;
