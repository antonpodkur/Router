import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { selectIsLoggedIn } from '../features/auth/authSlice'

function Welcome() {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return (
        <div>
            {!isLoggedIn &&  
                <div>
                    <button value={'Login'}>
                        <Link to={'/login'}>Login</Link>
                    </button>
                </div> 
            }
            <h1>
                Welcome to Router
            </h1>

            <Link to={'/map'}>To maps</Link>
        </div>
    )
}

export default Welcome