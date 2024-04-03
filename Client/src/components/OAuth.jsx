import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth , provider)
            const res = await axios.post('http://localhost:3000/api/auth/google' , {
                name : result.user.displayName,
                email : result.user.email,
                photo : result.user.photoURL
            })
            console.log(res.data)
            console.log(result)
            dispatch(signInSuccess(res.data))
            navigate('/')
        } catch (error) {
            console.log('Could not login with google' , error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className=' bg-red-500 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue With Google</button>
  )
}

export default OAuth