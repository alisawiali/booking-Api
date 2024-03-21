import { useContext, useState } from "react";
import "./login.css";
import { authContext } from "../../context/authConetxt";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, error, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  //  credential =>  الاعتماد
  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });
  //  und das id und value zu abrufen.
  const handelChane = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //  handelcick login.
  const handelClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (error) {
      // إرسال
      //  "LOGIN_FAILURE" فشل تسجيل الدخول
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  return (
    <div className="login">
      <div className="LContainer">
        <input
          type="text"
          className="LInput"
          placeholder="username"
          id="username"
          onChange={handelChane}
        />
        <input
          type="password"
          className="LPassword"
          placeholder="password"
          id="password"
          onChange={handelChane}
        />
        <button disabled={loading} onClick={handelClick} className="LBtn">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
