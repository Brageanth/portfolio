import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Home from "./home";
import FrameBorder from "../components/FrameBorder";

const App: NextPage = () => {
  useEffect(() => {}, []);

  return (
    <div className="dark:bg-p-gray bg-p-white">
      <Head>
        <title>Brageanth Palencia</title>
        <meta
          name="description"
          content="Developer building apps that are utils for the final users and simplify your live"
          lang="en"
        />
        <meta
          name="description"
          content="Desarrollador construyendo aplicaciones que son utiles para el usuario final y simplifica su vida"
          lang="es"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <main>
        <FrameBorder>
          <Home />
        </FrameBorder>
      </main>
    </div>
  );
};

export default App;
