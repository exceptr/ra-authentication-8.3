import { useContext } from "react"
import NetoSocialHeader from "./NetoSocialHeader"
import NewsItems from "./NewsItems"
import AuthContext from "./context/AuthContext"

export default function NetoSocial() {
    const { news } = useContext(AuthContext);

    if (!news) {
        return <div className="neto-social-loading">Loading...</div>
    }

    return (
        <>
            <NetoSocialHeader />
            <NewsItems data={news} />
        </>
    );
}