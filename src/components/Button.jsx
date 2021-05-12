const Button = ({onClick = null, children = null}) => {
    return ( 
        <button 
            className="btn"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
 
export default Button;