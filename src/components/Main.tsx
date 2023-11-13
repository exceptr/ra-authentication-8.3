import { useEffect, useState } from "react"
import AuthenticationForm from "./AuthenticationForm"
import NetoSocial from "./NetoSocial"
import AuthContext from "./context/AuthContext"

export interface formData {
    login: string
    password: string
}

export default function Main() {
    const storedToken = localStorage.getItem('token');
    const storedProfile = localStorage.getItem('profile');

    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState(null);
    const [news, setNews] = useState(null);

    async function fetchAuth(formData: formData) {
        try {
            const response = await fetch('http://localhost:7070/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();

            if (data.token) {
                setToken(data.token);
                setLoggedIn(true);
                localStorage.setItem('token', data.token);
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    async function fetchProfile(token: string) {
        try {
            const response = await fetch('http://localhost:7070/private/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();
            if (data) {
                setProfile(data);
                localStorage.setItem("profile", JSON.stringify(data));
            }

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchNews(token: string) {
        try {
          const response = await fetch("http://localhost:7070/private/news", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 401) {
            handleLogout();
            return;
        }

          const data = await response.json();
          if (data) {
            setNews(data);
          }
        } catch (error) {
            console.error(error);
        }
      }

    function handleSubmitLogin(formData: formData) {
        fetchAuth(formData)
    }

    function handleLogout() {
        setToken(null);
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }

    useEffect(() => {
        const restoreData = async () => {
            if (storedToken) {
              await fetchProfile(storedToken);
              await fetchNews(storedToken);
            }
          };
        
          restoreData();
    }, [token]);

    if (
        (loggedIn || 
            (storedToken && 
                storedToken !== null && 
                storedToken !== undefined))
                ) {
        return (
            <AuthContext.Provider value={{setToken, setLoggedIn, profile, storedProfile, news}}>
            <div>
                <NetoSocial />
            </div>
            </AuthContext.Provider>
        )
    } else {
        return (
            <div>
                <AuthenticationForm onSubmit={handleSubmitLogin} />
            </div>
        );
    }
}