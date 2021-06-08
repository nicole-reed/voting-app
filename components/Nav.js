
import Link from 'next/link'
import navStyles from '../styles/nav.module.css'

function Nav() {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/profile'>Profile</Link>
                </li>
                <li>
                    <Link href='/create'>Create A Poll</Link>
                </li>
                <li>
                    <Link href='/signin'>Sign In</Link>
                </li>
                <li>
                    <Link href='/signup'>Sign Up</Link>
                </li>

            </ul>
        </nav>
    )
}

export default Nav