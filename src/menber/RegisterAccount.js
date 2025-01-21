import { use, useState } from "react"
import FormError from "./FormError"
import axios from "axios"

export default function RegisterAccount(props) {
    const [inputs, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
        level: ""

    })
    const [errors, setErrors] = useState({})
    const [getFile, setFile] = useState("")
    // console.log(getFile);

    const [getAvatar, setAvatar] = useState("")
    // console.log(getAvatar);
    const handldeInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({ ...state, [nameInput]: valueInput }))
    }
    function handleUserInputFile(e) {
        // xử lý tại  js 
        const file = e.target.files
        setFile(file)

        // send file to api server
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
        }
        reader.readAsDataURL(file[0])
    }
    function StopS(e) {
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
        if (inputs.password == "") {
            errorSubmit.password = "Vui lòng nhập phone"
            flag = false
        }
        if (inputs.address == "") {
            errorSubmit.address = "Vui lòng nhập address"
            flag = false
        }
        if (inputs.level == "") {
            errorSubmit.level = "Vui lòng nhập level"
            flag = false
        }

        const validImageExtensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
        if (getFile == "") {
            errorSubmit.avatar = "Vui lòng chọn ảnh"
            flag = false
        } else {
            let getSize = getFile[0]['size']
            // console.log(getSize);
            if (getFile.length > 0) {
                if (getSize > (1024 * 1024)) {
                    errorSubmit.avatar = "Hình ảnh vượt quá 1MB";
                    flag = false;
                } else {
                    const fileName = getFile[0].name;
                    const fileExtension = fileName.split('.').pop();

                    if (!validImageExtensions.includes(fileExtension)) {
                        errorSubmit.avatar = "Hình ảnh có đuôi chưa hợp lệ"
                        flag = false;
                    } else {
                        console.log("OK");
                    }
                }
            }
        }
        if (!flag) {
            setErrors(errorSubmit)
        } else {
            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: getAvatar,
                level: 0
            }
            axios.post("http://localhost/web2m/laravel8/laravel8/public/api/register", data)
                .then((res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        console.log(res)
                        alert("thành công")
                    }
                })
        }
    }

    return (
        <div class="signup-form">
            <h2>New User Signup!</h2>
            <form action="#" onSubmit={StopS} enctype="multipart/form-data">
                <input type="text" name="name" placeholder="Name" onChange={handldeInput} />
                <input type="email" name="email" placeholder="Email Address" onChange={handldeInput} />
                <input type="password" name="password" placeholder="Password" onChange={handldeInput} />
                <input type="number" name="phone" placeholder="Phone" onChange={handldeInput} />
                <input type="text" name="address" placeholder="Address" onChange={handldeInput} />
                <input type="text" name="level" placeholder="Level" onChange={handldeInput} />
                <input type="file" name="avatar" placeholder="chọn Avatar" onChange={handleUserInputFile} />
                <button type="submit" class="btn btn-default">Sign up</button>
            </form>
            <FormError errors={errors} />
        </div>
    )
}