const Landing = () => {
    return ( 
        <div className="landing">
            <div className="landing__logo">
                <div className="landing__logo-container">
                    <img src="/chat-icon.png" alt=""/>
                </div>
            </div>
            <div className="landing__info">
                <h1>Welcome to React Chat</h1>
                <p>A very small project used to learn how to use a real time database</p>
            </div>
        </div>
    );
}
 
export default Landing;