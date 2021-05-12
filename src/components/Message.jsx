import {formatRelative} from 'date-fns'

const Message = ({
    createdAt = null,
    text = null,
    displayName= null,
    photoURL= null,
    uid = null,
    user = null
}) => {
    return ( 
        <div className={`message${uid === user.uid ? 'own' : 'recibed'}`}>
            {photoURL
                ?
                    <img 
                        src={photoURL} 
                        alt="user's avatar"
                        className={`message${uid === user.uid ? 'own' : 'recibed'}__avatar`}
                    />
                : null
            }
            {displayName
                ?
                    <div className={`message${uid === user.uid ? 'own' : 'recibed'}__name`}>{displayName}</div>
                : null
            }
            {createdAt?.seconds 
                ? 
                    (
                        <span className={`message${uid === user.uid ? 'own' : 'recibed'}__date`}>
                            {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                        </span>
                    ) 
                : null
            }
            <div className={`message${uid === user.uid ? 'own' : 'recibed'}__text`}>{text}</div>
        </div>
    );
}
 
export default Message;