import axios from 'axios'
import toastr from 'toastr'


export default function Confirm() {
    const registerUser = async event => {
        try {
            event.preventDefault()
            const res = await axios.post('/api/confirm', { email: event.target.email.value, loginCode: event.target.loginCode.value })
            document.cookie = `TOKEN=${res.data.token}`
            window.location.href = '/profile'
        } catch (error) {
            toastr.error(error.response.data)
        }
    }

    return (
        <form onSubmit={registerUser}>
            <label htmlFor="name">Please Enter Your Email: </label>
            <input id='email' name='email' type="text" required />
            <label>Please Enter Your Login Code</label>
            <input id='loginCode' name='loginCode' type='text' required />
            <button type="submit"> Sign In </button>
        </form>
    )
}