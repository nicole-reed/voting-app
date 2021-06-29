import axios from 'axios'
import toastr from 'toastr'
import Link from 'next/link'
import Nav from '../components/Nav'
import fontStyles from '../styles/font.module.css'


export default function SignIn() {
    const registerUser = async event => {

        try {
            event.preventDefault()
            await axios.post('/api/signin', { email: event.target.email.value })
            window.location.href = '/confirm'
        } catch (error) {

            toastr.error(error.response.data)
            window.location.href = '/signup'

        }


    }

    return (
        <div className={fontStyles.font}>
            <Nav />
            <main>
                <h1>Please Enter Your Email to Sign In</h1>
                <form onSubmit={registerUser}>
                    <label htmlFor="name">Please Enter Your Email: </label>
                    <input id='email' name='email' type="text" required />
                    <button type="submit"> Sign In </button>
                </form>
            </main>

            <footer>
                <p>Don't have an account?
                    <br></br>
                    <Link href='/signup'>
                        Sign up here.
                </Link>
                </p>
            </footer>
        </div>
    )
}