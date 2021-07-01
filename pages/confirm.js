import axios from 'axios'
import toastr from 'toastr'



export default function Confirm() {
    const confirmUser = async event => {
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
        <div>
            <h1>Please Check Your Email For Your 6 Digit Login Code</h1>
            <form onSubmit={confirmUser}>
                <label htmlFor="name">Confirm Your Email: </label>
                <input id='email' name='email' type="text" required />
                <br></br>
                <label>Please Enter Your Login Code</label>
                <input id='loginCode' name='loginCode' type='text' required />
                <button type="submit"> Sign In </button>
            </form>
        </div>
    )
}