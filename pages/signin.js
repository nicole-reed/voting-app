import axios from 'axios'
import toastr from 'toastr'
import Link from 'next/link'

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
        <div>
            <h1>Please Enter Your Email to Sign In</h1>
            <form onSubmit={registerUser}>
                <label htmlFor="name">Please Enter Your Email: </label>
                <input id='email' name='email' type="text" required />
                <button type="submit"> Sign In </button>
            </form>

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