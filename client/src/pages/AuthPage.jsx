import React, {useState, useEffect, useContext} from "react";
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const onChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (error) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (error) {}
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s6 offset-s3">
          <h1>Сократи ссылку</h1>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Авторизация</span>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field">
                      <input
                        placeholder="Email"
                        id="email"
                        type="text"
                        className="validate"
                        name="email"
                        onChange={onChange}
                        value={form.email}
                      />
                    </div>
                    <div className="password">
                      <input
                        placeholder="Пароль"
                        id="password"
                        type="text"
                        className="validate"
                        name="password"
                        onChange={onChange}
                        value={form.password}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                onClick={loginHandler}
                disabled={loading}
              >
                Войти
              </button>
              <button
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading}
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
