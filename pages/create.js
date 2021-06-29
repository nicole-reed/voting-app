import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/Nav'
import { getCookie } from '../util/getCookie'
import axios from 'axios'
import toastr from 'toastr'
import fontStyles from '../styles/font.module.css'

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
            window.location.href = '/'
        } catch (error) {
            toastr.error(error.response.data)
        }
    }

    return <div className={fontStyles.font}>
        <Head>
            <title>Create</title>
        </Head>
        <Nav />
        <h1>Create A Poll</h1>
        <form onSubmit={savePoll}>
            <label htmlFor="name">Please Enter Your Question: </label>
            <input id='title' name='title' type="text" placeholder="What's Your Question?" required />
            <br></br>
            <label htmlFor="name">Please Enter Your Answers Separated By Commas: </label>
            <input id='answers' name='answers' type="text" placeholder='answer, answer, answer' required />
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

