import { useState } from "react"
import FormError from "../menber/FormError"

export default function AddProduct() {

    const [inputs, setInput] = useState({
        name: "",
        price: "",
        brand: "",
        img: "",
        category: "",
        company: "",
        detail: "",
        sale: "",
        status: "",

    })

    const [file, SetFile] = useState("")
    const [errors, setErrors] = useState({}) // qua api

    const [avatar, setAvatar] = useState("")


    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({ ...state, [nameInput]: valueInput }))
    }

    const handleInputFile = (e) => {
        // xử lý tại js
        const file = e.target.files
        SetFile(file)

        // send file to api sever

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
        }
        reader.readAsDataURL(file[0])

    }
    const userData = JSON.parse(localStorage.getItem(["appState"]));

    let url = "http://localhost/web2m/laravel8/laravel8/public/api/user/product/add/"
    let accessToken = userData.token
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('category', this.state.category);
    formData.append('brand', this.state.brand);
    formData.append('company', this.state.company);
    formData.append('detail', this.state.detail);
    formData.append('status', this.state.status);
    formData.append('sale', this.state.sale);

    Object.keys(avatar).map((item, i) => {
        formData.append("file[]", avatar[item])
    })


    function handleSubmit(e) {
        e.preventDefault();

        let errorSubmit = {}
        let flag = true

        if (inputs.name == "") {
            errorSubmit.name = "Vui lòng nhập tên sản phẩm"
            flag = false
        }
        if (inputs.price == "") {
            errorSubmit.price = "Vui lòng nhập giá sản phẩm"
            flag = false
        }
        if (inputs.price == "") {
            errorSubmit.price = "Vui lòng nhập giá sản phẩm"
            flag = false
        }
        if (inputs.price == "") {
            errorSubmit.price = "Vui lòng nhập giá sản phẩm"
            flag = false
        }
        if (inputs.price == "") {
            errorSubmit.price = "Vui lòng nhập giá sản phẩm"
            flag = false
        }
        if (inputs.price == "") {
            errorSubmit.price = "Vui lòng nhập giá sản phẩm"
            flag = false
        }
        if (inputs.price == "") {
            errorSubmit.price = "Vui lòng nhập giá sản phẩm"
            flag = false
        }
        const validImageExtensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
        if (file == "") {
            errorSubmit.avatar = "Vui lòng chọn ít nhất 1 ảnh"
            flag = false
        } else {
            let getSize = file[0]['size']
            // console.log(getSize);
            if (file.length > 0) {
                if (getSize > (1024 * 1024)) {
                    errorSubmit.avatar = "Hình ảnh vượt quá 1MB";
                    flag = false;
                } else {
                    const fileName = file[0].name;
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
        }
    }


    return (
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9">
                        <div class="blog-post-area">
                            <h2 class="title text-center">Update user</h2>
                            <div class="signup-form">
                                <h2>New User Signup!</h2>
                                <form action="#" onSubmit={handleSubmit}>
                                    <input type="text" name="name" placeholder="Name" className="form-control" onChange={handleInput} />
                                    <input type="number" name="price" placeholder="Price" className="form-control" onChange={handleInput} />
                                    <select name="category" className="form-control" onChange={handleInput}>
                                        <option value="">Please choose category</option>
                                    </select>
                                    <select name="brand" className="form-control" onChange={handleInput}>
                                        <option value="">Please choose brand</option>
                                    </select>
                                    <select name="sale" className="form-control" onChange={handleInput}>
                                        <option value="">Sale</option>
                                    </select>
                                    <input type="text" name="company" placeholder="Company profile" className="form-control" onChange={handleInput} />
                                    <input type="file" multiple name="image" className="form-control" />
                                    <textarea name="detail" placeholder="Detail" className="form-control" rows="5" onChange={handleInput}></textarea>
                                    <button type="submit" className="btn btn-default">ADD Product</button>
                                </form>
                                <FormError errors={errors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}