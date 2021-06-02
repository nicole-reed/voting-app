import Link from 'next/link'
import Head from 'next/head'

export default function CreatePoll() {
    return <div>
        <Head>
            <title>Create A Poll</title>
        </Head>
        <h1>Create Your Own Poll</h1>
        <p>poll form will go here</p>

        <footer>
            <Link href='/'>
                &larr; Home
      </Link>
        </footer>
    </div>
}