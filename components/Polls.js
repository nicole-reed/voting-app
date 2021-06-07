import pollStyles from '../styles/poll.module.css'
import Poll from './Poll'
import axios from 'axios'
import { getCookie } from '../util/getCookie'

const Polls = ({ polls, setPolls }) => {
    const voteOnPoll = async (id, answer) => {
        try {
            const token = getCookie('TOKEN')

            if (!token) {
                window.location.href = '/signin'
            }

            await axios.put(
                `/api/polls/${id}/vote`,
                { id, answer },
                { headers: { authorization: token } }
            )
            const updatedPolls = [...polls]
            const index = updatedPolls.findIndex((poll) => poll._id === id)
            updatedPolls[index].answers[answer] = updatedPolls[index].answers[answer] + 1

            setPolls(updatedPolls)
        } catch (error) {
            console.log(error.message)
        }
    }

    const deletePoll = async (id) => {
        try {
            const token = getCookie('TOKEN')

            if (!token) {
                window.location.href = '/signin'
            }

            await axios.delete(
                `/api/polls/${id}`,
                { headers: { authorization: token } }
            )
            const updatedPolls = [...polls]
            const index = updatedPolls.findIndex((poll) => poll._id === id)
            updatedPolls = updatedPolls.splice(index, 1)

            setPolls(updatedPolls)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={pollStyles.grid}>
            {polls.map((poll) => (
                <Poll key={poll._id} poll={poll} voteOnPoll={voteOnPoll} deletePoll={deletePoll} />
            ))}
        </div>
    )
}

export default Polls
