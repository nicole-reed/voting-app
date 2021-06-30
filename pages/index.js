import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Polls from '../components/Polls'
import axios from 'axios'
import Nav from '../components/Nav'

export default function Home() {

  const [polls, setPolls] = useState([])

  const getPolls = async () => {
    try {
      const res = await axios.get('/api/polls')

      setPolls(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getPolls()
  }, [])

  return <div className="container">
    <Head>
      <title>Home</title>
    </Head>
    <Nav />
    <main>
      <h1 className="title">
        Welcome to Nicky's Pointless Polls!
        </h1>

      <p className="description">
        We can't wait to hear your opinions.
        </p>

      <div className="grid">
        <Polls polls={polls} setPolls={setPolls} />

        <Link href="/profile">
          <a className="card">
            <h3>My Profile &rarr;</h3>
            <p>See all of your polls.</p>
          </a>
        </Link>

        <Link href='/create'>
          <a className="card">
            <h3>Create A Poll &rarr;</h3>
            <p>Click here to create a new poll.</p>
          </a>
        </Link>

      </div>

    </main>

    <footer>

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

        footer img {
          margin-left: 0.5rem;
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

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
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

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        @media (max-width: 600px) {
          .title {
            font-size: 2rem;
          }
          .description {
            font-size: 1rem;
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
}
