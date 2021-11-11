import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import '../../styles/components/login.css'
import { useForm } from './../../hooks/useForm';
import { startLogin, startRegister } from './../../redux/actions/auth';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        lemail: '',
        lpassword: ''
    });
   
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        remail: '',
        rpassword: '',
        rpassword2: '',
        rname: '',
    });

    const {remail, rpassword, rpassword2, rname} = formRegisterValues;
    const {lemail, lpassword} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lemail, lpassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if(rpassword2 !== rpassword){
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
        }
        dispatch(startRegister(remail, rpassword, rname));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control login_inputs"
                                placeholder="Correo"
                                name= 'lemail'
                                value= {lemail}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control login_inputs"
                                placeholder="Contraseña"
                                name='lpassword'
                                value={lpassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit login_inputs"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control login_inputs"
                                placeholder="Nombre"
                                name='rname'
                                value={rname}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control login_inputs"
                                placeholder="Correo"
                                name='remail'
                                value={remail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control login_inputs"
                                placeholder="Contraseña"
                                name='rpassword'
                                value={rpassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control login_inputs"
                                placeholder="Repita la contraseña"
                                name='rpassword2'
                                value={rpassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit login_inputs"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
