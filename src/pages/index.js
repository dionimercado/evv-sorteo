import { useState } from "react";
import useSound from "use-sound";
import Head from "next/head";

const placeholder = [
  "Pablo Darcangelo 2",
  "Adrian Gabriel Nanni 2",
  "Joaquin Lorenzo 1 ",
  "Yaco Chalu 1 ",
  "Dioni Mercado 1 ",
  "Angel Garcia Fleitas 1 ",
  "Hernan benitez 1 ",
  "Federico Bayley 2 ",
  "Lucas Vazquez 1",
  "Pablo Diurno 1 ",
  "Juan Taboada 1 ",
  "Sebastian Martinez",
  "Eric Daniel Derman",
  "Nata Scolari ",
  "Julian Barki",
  "Kike St ",
  "Alejandro Marias"
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState("");
  const [participants, setParticipants] = useState(placeholder);

  const [playWinning] = useSound("/sounds/winning.mp3", { volume: 0.25 });

  const findWinner = e => {
    e.preventDefault();
    setLoading(true);

    const ganador =
      participants[Math.floor(Math.random() * participants.length)];

    setWinner(ganador);
    setTimeout(() => {
      playWinning();
      setLoading(false);
    }, 3000);
  };

  const getNumber = val => {
    return val.match(/\d+/g);
  };

  const createDuplicates = e => {
    e.preventDefault();

    let fixedList = [];
    participants.map((item, i) => {
      const isDuplicate = getNumber(item);

      if (isDuplicate) {
        for (let index = 0; index < Number(isDuplicate[0]); index++) {
          // console.log(participants[i]);
          fixedList = [
            ...fixedList,
            participants[i].replace(/[0-9]/g, "").trim()
          ];
        }
      } else {
        fixedList = [...fixedList, item];
      }
    });

    setParticipants(fixedList);
  };

  return (
    <div className="container">
      <Head>
        <title>Sorteo - Escuela de Vuelo Virtual</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        />
      </Head>

      <main>
        <img
          width="300"
          className="img-fluid logo"
          src="/images/logo.jpg"
          alt="E.V.V."
        />
        <h1 className="title mt-5 mb-4">Sorteo</h1>

        <p className="description">
          Introduzca la lista de opciones <code>en cada linea</code> por
          separado
        </p>

        <form
          onSubmit={findWinner}
          className="w-100 shadow p-3 p-md-5 mt-5 rounded"
        >
          <h4 className="mb-3 d-flex justify-content-between">
            <span>
              Total de participantes:{" "}
              <span className="badge badge-dark">{participants.length}</span>
            </span>
            <button
              className="btn btn-sm btn-secondary"
              onClick={createDuplicates}
            >
              Corregir duplicados
            </button>
          </h4>
          <div className="form-group">
            <textarea
              name="options"
              id="options"
              cols="30"
              rows="20"
              className="form-control"
              value={participants.join("\n")}
              onChange={e => setParticipants(e.target.value.split("\n"))}
            />
          </div>

          <div className="form-group text-center mt-5 mb-5">
            <button
              className={`btn btn-dark btn-lg ${loading ? "disabled" : ""}`}
              disabled={loading}
            >
              ENCONTRAR GANADOR!
              {loading && (
                <div
                  className="spinner-grow spinner-grow-sm ml-3"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </div>
          {winner && (
            <>
              <div className="alert alert-success text-center">
                {loading ? (
                  <div className="d-block">
                    <h5 className="text-center text-uppercase">
                      Y el ganador es:
                    </h5>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-block">
                    <h5 className="text-center text-uppercase">
                      Y el ganador es:
                    </h5>
                    <h3 className="font-weght-bold display-5">{winner}</h3>
                  </div>
                )}
              </div>
            </>
          )}
        </form>
      </main>

      <footer>
        <a
          href="https://dionimercado.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Made with ❤️ by Dioni Mercado"}
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        @media screen and (max-width: 768px) {
          main {
            padding-top: 2rem;
          }

          .logo {
            max-width: 160px;
          }

          .title {
            font-size: 3rem;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
