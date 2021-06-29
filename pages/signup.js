import axios from 'axios'
import toastr from 'toastr'
import Nav from '../components/Nav'
import fontStyles from '../styles/font.module.css'

export default function SignUpForm() {
    const registerUser = async event => {

        try {
            event.preventDefault()
            await axios.post('/api/signup', { email: event.target.email.value })
            toastr.success('user created')
            window.location.href = '/signin'
        } catch (error) {

            toastr.error(error.response.data)
        }
    }

    return (
        <div className={fontStyles.font}>
            <Nav />
            <h1>Enter Your Email To Sign Up:</h1>
            <form onSubmit={registerUser}>
                <label htmlFor="name">Please Enter Your Email: </label>
                <input id='email' name='email' type="text" placeholder='example@yopmail.com' required />
                <button type="submit"> Register </button>
            </form>
        </div>
    )
}
