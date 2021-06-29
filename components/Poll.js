import pollStyles from '../styles/poll.module.css'

const Poll = ({ poll, voteOnPoll, deletePoll, showDelete }) => {

    return (
        <div className={pollStyles.card}>
            <h3>{poll.title}</h3>
            <p>created by: {poll.createdBy}</p>
            <ul>
                {Object.entries(poll.answers).map((entry, i) => (
                    <li key={i}>
                        <div>
                            {entry[0]}
                        </div>
                        <div className={pollStyles.buttonAndScore}>
                            <button onClick={() => voteOnPoll(poll._id, entry[0])}>&#10003;</button>
                            <div className={pollStyles.score}>{entry[1]}</div>
                        </div>
                    </li>
                ))}

            </ul>

            {showDelete && <button onClick={() => deletePoll(poll._id)}>Delete</button>}

        </div>
    )
}

export default Poll