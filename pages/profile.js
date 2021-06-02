import Link from 'next/link'
import Head from 'next/head'

export default function Profile() {
    return <div>
        <Head>
            <title>My Polls</title>
        </Head>
        <h1>Here is the profile of the user!</h1>
        <p>polls by the user will be shown here</p>

        <footer>
            <Link href='/'>
                &larr; Home
      </Link>
        </footer>
    </div>
}