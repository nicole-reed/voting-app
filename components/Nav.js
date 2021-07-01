
import React from 'react'
import { slide as Menu } from 'react-burger-menu'


class Nav extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="profile" className="menu-item" href="/profile">Profile</a>
                <a id="create" className="menu-item" href="/create">Create Poll</a>
                <a id="signin" className="menu-item" href="/signin">Sign In</a>
                <a id="signup" className="menu-item" href="/signup">Sign Up</a>
                {/* <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a> */}
            </Menu>
        );
    }

}

export default Nav


// return (
//     <nav className={navStyles.nav}>
//         <ul>
//             <li>
//                 <Link href='/'>Home</Link>
//             </li>
//             <li>
//                 <Link href='/profile'>Profile</Link>
//             </li>
//             <li>
//                 <Link href='/create'>Create A Poll</Link>
//             </li>
//             <li>
//                 <Link href='/signin'>Sign In</Link>
//             </li>
//             <li>
//                 <Link href='/signup'>Sign Up</Link>
//             </li>

//         </ul>
//     </nav>
// )