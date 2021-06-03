import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { getCookie } from '../util/getCookie'
import axios from 'axios'
import toastr from 'toastr'

export default function CreatePoll() {
    const [token, setToken] = useState('')

    const getToken = async () => {
        try {
            const cookieToken = getCookie('TOKEN')

            if (!cookieToken) {
                window.location.href = '/signin'
            }

            setToken(cookieToken)

        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getToken()
    }, [])

    const savePoll = async event => {
        try {
            event.preventDefault()
            await axios.post(
                '/api/polls',
                { title: event.target.title.value, answers: event.target.answers.value.split(',').map(answer => answer.trim()) },
                { headers: { authorization: token } }
            )
            toastr.success('poll created')
        } catch (error) {
            toastr.error(error.response.data)
        }
    }

    return <div>
        <Head>
            <title>Create</title>
        </Head>
        <h1>Create Your Own Poll</h1>
        <form onSubmit={savePoll}>
            <label htmlFor="name">Please Enter Your Question: </label>
            <input id='title' name='title' type="text" required />
            <br></br>
            <label htmlFor="name">Please Enter Your Answers Separated By Commas: </label>
            <input id='answers' name='answers' type="text" required />
            <br></br>
            <button type="submit"> Submit Your Poll </button>
        </form>

        <Link href='/profile'>
            &larr; Profile
      </Link>
        <footer>
            <Link href='/'>
                &larr; Home
      </Link>
        </footer>
    </div>
}

