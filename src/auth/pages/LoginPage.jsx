import './LoginPage.css';
import {useAuthStore, useForm} from "../../hooks/index.js";
import {useEffect} from "react";
import Swal from "sweetalert2";

const loginFormFields = {

    loginEmail: '',
    loginPassword: '',
}
const registerFormFields = {
    name: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}


export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields);
    const { name, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm(registerFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
            return;
        }

        startRegister({name: name, email: registerEmail, password: registerPassword});
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error', errorMessage, 'error');
        }
    }, [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="name"
                                value={name}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
