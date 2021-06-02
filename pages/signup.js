import axios from 'axios'
import toastr from 'toastr'

export default function SignUpForm() {
    const registerUser = async event => {

        try {
            event.preventDefault()
            await axios.post('/api/signup', { email: event.target.email.value })
            toastr.success('user created')
        } catch (error) {

            toastr.error(error.response.data)
        }
    }

    return (
        <form onSubmit={registerUser}>
            <label htmlFor="name">Pleae Enter Your Email: </label>
            <input id='email' name='email' type="text" required />
            <button type="submit"> Register </button>
        </form>
    )
}
