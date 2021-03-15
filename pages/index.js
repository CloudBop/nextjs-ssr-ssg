import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  //
  const { products } = props;
  return (
    <ul>
      {products.map(prod => {
        return <li key={prod.id}>{prod.title}</li>;
      })}
    </ul>
  );
}

// this is all ssr - it's never run on client
// it is run at build time to create 'static' / 'pre-rendered' pages (SSG)
export async function getStaticProps() {
  // next understands not to bundle libs/deps used here on client

  // cwd !== /pages
  // cwd === root dir - process.cwd()
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products
    }
  };
}

export default HomePage;
