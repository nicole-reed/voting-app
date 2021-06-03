import axios from 'axios'
import toastr from 'toastr'

export default function SignUpForm() {
    const registerUser = async event => {

        try {
            event.preventDefault()
            await axios.post('/api/signin', { email: event.target.email.value })
            window.location.href = '/confirm'
        } catch (error) {

            toastr.error(error.response.data)

        }


    }

    return (
        <form onSubmit={registerUser}>
            <label htmlFor="name">Please Enter Your Email: </label>
            <input id='email' name='email' type="text" required />
            <button type="submit"> Sign In </button>
        </form>
    )
}