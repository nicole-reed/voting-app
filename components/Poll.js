import pollStyles from '../styles/poll.module.css'

const Poll = ({ poll, voteOnPoll, deletePoll, showDelete }) => {

    return (
        <a className={pollStyles.card}>
            <h3 className={pollStyles.card}>{poll.title}</h3>
            <p>created by: {poll.createdBy}</p>
            <ul>
                {Object.entries(poll.answers).map((entry, i) => (
                    <li key={i}>{entry[0]} <button onClick={() => voteOnPoll(poll._id, entry[0])}>  &#10003;   </button> {entry[1]}</li>
                ))}

            </ul>

            {showDelete && <button onClick={() => deletePoll(poll._id)}>Delete</button>}

        </a>
    )
}

export default Poll