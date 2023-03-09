import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../Components/auth/auth-slice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isAdmin = roles.includes('admin')

        if (isAdmin) status = "Admin"

        return { username, roles, status, isAdmin }
    }

    return { username: '', roles: [], isAdmin, status }
}
export default useAuth