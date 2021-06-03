import pollStyles from '../styles/poll.module.css'
import Poll from './Poll'
import axios from 'axios'
import toastr from 'toastr'
import { getCookie } from '../util/getCookie'

const Polls = ({ polls }) => {
    const voteOnPoll = async (id, answer) => {
        try {
            const token = getCookie('TOKEN')

            if (!token) {
                window.location.href = '/signin'
            }

            const res = await axios.put(
                `/api/polls/${id}/vote`,
                { id, answer },
                { headers: { authorization: token } }
            )

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={pollStyles.grid}>
            {polls.map((poll) => (
                <Poll key={poll._id} poll={poll} voteOnPoll={voteOnPoll} />
            ))}
        </div>
    )
}

export default Polls
