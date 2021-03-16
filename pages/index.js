import path from "path";
import fs from "fs/promises";
import Link from "next/link";
function HomePage(props) {
  //
  const { products } = props;
  return (
    <ul>
      {products.map(prod => {
        return (
          <li key={prod.id}>
            <Link href={`/${prod.id}`}>
              <a>{prod.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// this is all ssr - it's never run on client
// it is run at build time to create 'static' / 'pre-rendered' pages (SSG)
export async function getStaticProps(context) {
  // next understands not to bundle libs/deps used here on client

  // cwd !== /pages
  // cwd === root dir - process.cwd()
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      //  no data found, go home.
      redirect: { destination: "/" }
    };
  }

  if (data.products.length === 0) {
    // set to 404
    return { notFound: true };
  }

  return {
    props: {
      products: data.products
    },
    notFound: false

    // redirect page
    // redirect:

    // INCREMENTAL STATIC GENERATION
    // in dev it will update everytime.
    // revalidate: 10 // seconds
  };
}

export default HomePage;
