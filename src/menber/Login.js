import { useState } from "react"
import FormError from "./FormError"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login(props) {
    const navigate = useNavigate()
    const [inputs, setInput] = useState({
        password: "",
        email: ""
    })
    const [errors, setErrors] = useState({})

    const handldeInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value

        setInput(state => ({ ...state, [nameInput]: valueInput }))
    }

    function stopS(e) {
        e.preventDefault();

        let errorSubmit = {}
        let flag = true

        if (inputs.password == "") {
            errorSubmit.password = "Vui lòng nhập Password"
            flag = false
        }
        if (inputs.email == "") {
            errorSubmit.email = "Vui lòng nhập Email"
            flag = false
        }
        if (!flag) {
            setErrors(errorSubmit)
        } else {
            // xử lý điều kiện
            const data = {
                email: inputs.email,
                password: inputs.password,
                level: 0
            }
            axios.post("http://web2m.test/laravel8/laravel8/public/api/login", data)
                .then((res) => {
                    // console.log(res);
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        console.log(res);
                        navigate('/')

                        localStorage.setItem('checkLogin', true)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    return (
        <div class="login-form">
            <h2>Login to your account</h2>
            <form action="#" onSubmit={stopS}>

                <input type="email" name="email" placeholder="Email Address" onChange={handldeInput} />
                <input type="text" name="password" placeholder="Password" onChange={handldeInput} />
                <span>
                    <input type="checkbox" class="checkbox" />
                    Keep me signed in
                </span>
                <button type="submit" class="btn btn-default">Login</button>
            </form>
            <FormError errors={errors} />
        </div>
    )
}