import pollStyles from '../styles/poll.module.css'
import Poll from './Poll'

const Polls = ({ polls }) => {
    return (
        <div className={pollStyles.grid}>
            {polls.map((poll) => (
                <Poll poll={poll} />
            ))}
        </div>
    )
}

export default Polls
