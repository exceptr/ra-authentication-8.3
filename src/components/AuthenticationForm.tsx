import { useState } from "react"
import { formData } from "./Main";

interface AuthenticationFormProps {
    onSubmit: (formData: formData) => void
}

export default function AuthenticationForm({onSubmit}: AuthenticationFormProps) {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
      });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
      

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(formData);
    }
    return (
        <>
        <div className="authentication-form-header">
            <a className="authentication-form-logo" href="/">Neto Social</a>
            <form className="authentication-form" onSubmit={handleSubmit}>
                <input 
                    className="authentication-form-input" 
                    type="text" 
                    name="login"
                    value={formData.login} 
                    onChange={handleChange}
                    placeholder="Username"/>
                <input 
                    className="authentication-form-input" 
                    type="text" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange} 
                    placeholder="Password" />
                <button className="authentication-form-button" type="submit">Login</button>
            </form>
        </div>
        <div>
            <div className="authentication-form-body">
                <h1 className="authentication-form-body-title">Neto Social</h1>
                <div className="authentication-form-body-text">Facebook and VK killer</div>
            </div>
        </div>
        </>
    )
}