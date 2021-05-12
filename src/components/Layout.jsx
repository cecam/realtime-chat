import Button from './Button'
const Layout = ({children, user=null, signIn, signOut}) => {
    return ( 
        <div>
            <nav className="navbar">
                <div className="navbar__logo">
                    <img src="/chat-logo.png" alt=""/>
                    <h1>React Chat</h1>
                </div>
                <div className="navbar__login">
                    {user
                        ?
                            <Button onClick={signOut}>Sign out</Button>
                        :
                            <Button onClick={signIn}>Sign in with Google</Button>
                    }
                </div>
            </nav>
            <div className="content">
                {children}
            </div>
        </div>
    );
}
 
export default Layout;