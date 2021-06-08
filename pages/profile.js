import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Polls from '../components/Polls'
import { getCookie } from '../util/getCookie'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import Nav from '../components/Nav'

export default function Profile() {

    const [polls, setPolls] = useState([])
    const [token, setToken] = useState('')


    const getPolls = async () => {
        try {
            const cookieToken = getCookie('TOKEN')

            if (!cookieToken) {
                window.location.href = '/signin'
            }

            setToken(cookieToken)

            const decodedToken = jwt.decode(cookieToken)

            const res = await axios.get('/api/polls', { params: { createdBy: decodedToken.email } })

            setPolls(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getPolls()
    }, [])

    return <div>
        <Head>
            <title>Profile</title>
        </Head>
        <Nav />
        <h1>My Polls</h1>
        <Polls polls={polls} />

        <Link href='/create'>
            Create A Poll
      </Link>

        <footer>
            <Link href='/'>
                &larr; Home
      </Link>
        </footer>
    </div>
}