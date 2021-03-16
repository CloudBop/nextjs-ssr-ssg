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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}
//
//  SSR + SSG of dynamic pages
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map(product => product.id);
  const pathsWithParams = ids.map(id => ({ params: { pid: id } }));
  return {
    // list all known paths to be SSG
    // these get passed into getStaticProps( context )
    paths: pathsWithParams,
    // see notes below.
    fallback: false
    // if true -> try and render page anyway, make request. -> remember to check !product in getStaticProps
    // - notes
    // useful for not pre-rendering pages that are not frequently visited || if we don't know excatly how many to pre-render
    // tell nextjs to load on request if they're not pre-rendered
    // will error if page is refreshed as data will not be there.
    // requires defensive rendering on client component (1)
    // fallback: true

    // similar to above will block render until req has res - means we can ignore defensive hydration component
    // fallback: "blocking"
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find(p => p.id === productId);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    }
  };
}

export default ProductPage;
