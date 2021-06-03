import pollStyles from '../styles/poll.module.css'


const Poll = ({ poll, voteOnPoll }) => {
    return (
        <a className={pollStyles.card}>
            <h3 className={pollStyles.card}>{poll.title}</h3>
            <p>created by: {poll.createdBy}</p>
            <ul>
                {Object.entries(poll.answers).map((entry) => (
                    <li>{entry[0]} <button onClick={() => voteOnPoll(poll._id, entry[0])}>+</button> {entry[1]}</li>
                ))}

            </ul>
        </a>
    )
}

export default Poll