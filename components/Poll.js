import pollStyles from '../styles/poll.module.css'
import Link from 'next/link'


const Poll = ({ poll }) => {
    console.log(Object.entries(poll.answers))
    return (

        <Link href="/polls/id" as={`/poll/${poll._id}`}>
            <a className={pollStyles.card}>
                <h3 className={pollStyles.card}>{poll.title}</h3>
                <p>created by: {poll.createdBy}</p>
                <ul>
                    {Object.entries(poll.answers).map((entry) => (
                        <li>{entry[0]}  {entry[1]}</li>
                    ))}
                </ul>
            </a>
        </Link>
    )
}

export default Poll