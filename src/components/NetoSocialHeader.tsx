import { useContext } from "react"
import AuthContext from "./context/AuthContext"

export default function NetoSocialHeader() {
    const {setToken, setLoggedIn, profile} = useContext(AuthContext)
    function handleLogout() {
        setToken(null);
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }

    if (!profile) {
        return (
            <div className="neto-social-loading">Loading...</div>
        )
    }

    return (
        <div className="neto-social-header">
            <a className="neto-social-form-logo" href="/">Neto Social</a>
            <form className="neto-social-form" onSubmit={handleLogout}>
                <div className="neto-social-form-text">Hello, {profile.name}</div>
                <img src={profile.avatar} className="neto-social-form-avatar" alt="avatar" />
                <button className="neto-social-form-button" type="submit">Logout</button>
            </form>
        </div>
    )
}