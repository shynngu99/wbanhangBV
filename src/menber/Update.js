import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Account(props) {

    const idBlog = Number(props.id)

    // console.log(props.id);
    


    const [errors, setErrors] = useState({})
    const [getFile, setFile] = useState("")
    const [getAvatar, setAvatar] = useState('')
    let formData = new FormData();

    let userData = JSON.parse(localStorage.getItem(['appState']))

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        level: '',
        avatar: ''
    })


    useEffect(() => {
        if (userData) {
            setUser({
                name: userData.Auth.name,
                email: userData.Auth.email,
                address: userData.Auth.address,
                phone: userData.Auth.phone,
                level: userData.Auth.level,
                avatar: userData.Auth.avatar,
                pass: userData.Auth.password
            })
        }
    }, [])


    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setUser(state => ({ ...state, [nameInput]: valueInput }))
    }

    function handleUserInputFile(e) {
        // use on function
        const file = e.target.file
        setFile(file)
        // send api
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
        }
        reader.readAsDataURL(file[0])
    }


    function handleSubmit(e) {
        e.preventDefault();

        formData.append('id_blog', idBlog)
        formData.append('id_user', userData.Auth.id)
        formData.append('pass', userData.Auth.pass)
        formData.append('id_comment', 0)
        formData.append('image_user', userData.Auth.avatar)
        formData.append('name_user', userData.Auth.name)
        formData.append('avatar', getAvatar)


        let url = "http://localhost/web2m/laravel8/laravel8/public/api/user/update/" + idBlog
        let accessToken = userData.token
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        const newUserData = {


            ...userData,
            // Sao chép tất cả các thuộc tính hiện có của object userData
            //  để giữ lại tất cả dữ liệu cũ không liên quan đến Auth


            //tạo auth để lưu biến đổi 
            Auth: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                address: user.address,
                level: user.level,
                email: user.email,
                pass: user.pass,
                avatar: getAvatar || userData.Auth.avatar

            }

        }
        localStorage.setItem('appState', JSON.stringify(newUserData));
        // Cập nhật formData nếu cần
        formData.append('id_blog', idBlog);
        formData.append('id_user', userData.Auth.id);
        formData.append('pass', newUserData.Auth.pass);
        formData.append('id_comment', 0);
        formData.append('image_user', newUserData.Auth.avatar);
        formData.append('name_user', newUserData.Auth.name);
        formData.append('avatar', getAvatar);


        axios.post(url, formData, config)
            .then(response => {
                alert("Cập nhật thành công!");
            })
            .catch((error) => {
                console.log(error);
                alert("Có lỗi xảy ra!");
            });

    }

    return (
        <>

            <div class="col-sm-9">
                <div class="blog-post-area">
                    <h2 class="title text-center">Update user</h2>
                    <div class="signup-form">
                        <h2>New User Signup!</h2>
                        <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit} >
                            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleInput} />
                            <input type="email" name="email" placeholder="Email Address" value={user.email} readOnly onChange={handleInput} />
                            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInput} />
                            <input type="number" name="phone" placeholder="Phone" onChange={handleInput} value={user.phone} />
                            <input type="text" name="address" placeholder="Address" onChange={handleInput} value={user.address} />
                            <input type="text" name="level" placeholder="Level" onChange={handleInput} value={user.level} />
                            <input type="file" name="avatar" placeholder="chọn Avatar" onChange={handleUserInputFile} />
                            <button type="submit" class="btn btn-default">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}