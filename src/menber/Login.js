import { useState } from "react"
import FormError from "./FormError"

export default function Login(props) {
    const [inputs, setInput] = useState({
        name: "",
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

        if (inputs.name == "") {
            errorSubmit.name = "Vui lòng nhập Tên"
            flag = false
        }
        if (inputs.email == "") {
            errorSubmit.email = "Vui lòng nhập Email"
            flag = false
        }
        if (!flag) {
            setErrors(errorSubmit)
        } else {
            setErrors({})
        }
    }

    return (
        <div class="login-form">
            <h2>Login to your account</h2>
            <form action="#" onSubmit={stopS}>
                <input type="text" name="name" placeholder="Name" onChange={handldeInput} />
                <input type="email" name="email" placeholder="Email Address" onChange={handldeInput} />
                <span>
                    <input type="checkbox" class="checkbox" />
                    Keep me signed in
                </span>
                <button type="submit" class="btn btn-default">Login</button>
            </form>
            <FormError errors={errors}/>
        </div>
    )
}