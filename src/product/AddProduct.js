import { useEffect, useState } from "react"
import FormError from "../menber/FormError"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddProduct() {
    const navigate = useNavigate()
    const [inputs, setInput] = useState({
        name: "",
        price: "",
        brand: "",
        img: "",
        category: "",
        company: "",
        detail: "",
        sale: '',
        status: '1'

    })
    let errorSubmit = {}
    let flag = true

    const [categorys, setCategorys] = useState('')
    const [brands, setBrands] = useState('')


    const [file, SetFile] = useState("")
    const [errors, setErrors] = useState({})
    const [avatar, setAvatar] = useState("") // qua api



    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({
            ...state,
            [nameInput]: valueInput
        }))
    }

    const handleInputFile = (e) => {
        const files = e.target.files;
        const validImageExtensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];

        // Reset lỗi

        // Kiểm tra số lượng ảnh
        if (!files || files.length === 0) {
            errorSubmit.avatar = 'Vui lòng chọn ít nhất 1 ảnh';
            flag = false;
            setErrors(errorSubmit);
            return;
        }

        if (files.length > 3) {
            errorSubmit.avatar = 'Chỉ được chọn tối đa 3 ảnh';
            flag = false;
            setErrors(errorSubmit);
            return;
        }

        // Kiểm tra từng file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Kiểm tra kích thước
            if (file.size > 1024 * 1024) {
                errorSubmit.avatar = `File ${file.name} vượt quá 1MB`;
                flag = false;
                break;
            }

            // Kiểm tra định dạng
            const fileExtension = file.name.split('.').pop();
            if (!validImageExtensions.includes(fileExtension)) {
                errorSubmit.avatar = `File ${file.name} không đúng định dạng (chỉ chấp nhận: png, jpg, jpeg)`;
                flag = false;
                break;
            }
        }
        if (!flag) {
            setErrors(errorSubmit);
            return;
        }

        // Nếu tất cả điều kiện đều hợp lệ
        SetFile(files);

        // Tạo FormData để gửi lên API
        // const formData = new FormData();
        // for (let i = 0; i < files.length; i++) {
        //     formData.append('file[]', files[i]);
        // }
        // setAvatar(formData);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (inputs.name == "") {
            errorSubmit.name = "Vui lòng nhập tên sản phẩm"
            flag = false
        }
        if (inputs.price == "") {
            errorSubmit.price = "Vui lòng nhập giá sản phẩm"
            flag = false
        }
        if (inputs.category == "") {
            errorSubmit.category = "Vui lòng nhập category"
            flag = false
        }
        if (inputs.brand == "") {
            errorSubmit.brand = "Vui lòng nhập brand"
            flag = false
        }
        if (inputs.company == "") {
            errorSubmit.company = "Vui lòng nhập company"
            flag = false
        }
        if (inputs.detail == "") {
            errorSubmit.detail = "Vui lòng nhập detail"
            flag = false
        }
        if (inputs.status == "") {
            errorSubmit.status = "Vui lòng nhập status"
            flag = false
        }
        if (inputs.sale == "") {
            errorSubmit.sale = "Vui lòng nhập sale"
        }
        if (file == "") {
            errorSubmit.avatar = "Vui lòng chọn ít nhất 1 ảnh"
            flag = false
        }


        const userData = JSON.parse(localStorage.getItem(["appState"]));

        let url = "http://localhost/web2m/laravel8/laravel8/public/api/user/product/add"
        let accessToken = userData.token
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }

        if (!flag) {
            setErrors(errorSubmit)
        } else {
            let formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('price', inputs.price);
            formData.append('category', inputs.category);
            formData.append('brand', inputs.brand);
            formData.append('company', inputs.company);
            formData.append('detail', inputs.detail);
            formData.append('status', inputs.status);
            formData.append('sale', inputs.sale);


            for (let i = 0; i < file.length; i++) {
                formData.append('file[]', file[i]);
            }
            // console.log(file);


            axios.post(url, formData, config)
                .then(res => {
                    console.log(res);
                    alert("Thêm sản phẩm thành công")
                    // setTimeout(() => {
                    //     navigate("/account/myproduct")
                    // }, 200);

                })
                .catch(error => console.log(error)
                )
        }
    }

    useEffect(() => {
        axios.get("http://localhost/web2m/laravel8/laravel8/public/api/category-brand")
            .then(res => {
                // console.log(res);
                setCategorys(res.data.category)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("http://localhost/web2m/laravel8/laravel8/public/api/category-brand")
            .then(res => {
                // console.log(res);
                setBrands(res.data.brand)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    function handleInputC() {
        if (categorys.length > 0) {
            return categorys.map((value, key) => {
                return (
                    // value={value.id}
                    <option key={key} value={value.id} >{value.category}</option>
                )
            })
        }
    }
    function handleInputB() {
        if (brands.length > 0) {
            return brands.map((value, key) => {
                return (
                    // value={value.id}
                    <option key={key} value={value.id}>{value.brand}</option>
                )
            })
        }
    }

    function renderSale() {
        if (inputs.status === "1") {
            return (
                <div style={{ display: "flex " }}>
                    <input style={{ width: '20%' }} type="number" name="sale" placeholder="0" className="form-control" value={0}  onChange={handleInput} />
                    <span style={{ marginTop: "10px" }}>%</span>
                </div>
            )
        } else if (inputs.status === "0") {
            return (
                <div style={{ display: "flex " }}>
                    <input style={{ width: '20%' }} type="number" name="sale" placeholder="0" className="form-control" value={inputs.sale} onChange={handleInput} />
                    <span style={{ marginTop: "10px" }}>%</span>
                </div>
            )
        }
    }
    return (
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9">
                        <div class="blog-post-area">
                            <h2 class="title text-center">ADD PRODUCT</h2>
                            <div class="signup-form">
                                <h2>New User Signup!</h2>
                                <form action="#" onSubmit={handleSubmit}>
                                    <input type="text" name="name" placeholder="Name" className="form-control" onChange={handleInput} />
                                    <input type="number" name="price" placeholder="Price" className="form-control" onChange={handleInput} />
                                    <select name="category" className="form-control" onChange={handleInput}>
                                        <option value="">Please choose category</option>
                                        {handleInputC()}
                                    </select>
                                    <select name="brand" className="form-control" onChange={handleInput}>
                                        <option value="">Please choose brand</option>
                                        {handleInputB()}
                                    </select>
                                    <select name="status" value={inputs.status} className="form-control" onChange={handleInput}>
                                        <option value="1">New</option>
                                        <option value="0">Sale</option>
                                    </select>
                                    {renderSale()}
                                    {/* chưa xử lý được khi chọn new thì % reset về 0 */}
                                    <input type="text" name="company" placeholder="Company profile" className="form-control" onChange={handleInput} />
                                    <input type="file" multiple name="image" className="form-control" onChange={handleInputFile} accept=".jpg,.jpeg,.png" max="3" />
                                    <textarea name="detail" placeholder="Detail" className="form-control" rows="5" onChange={handleInput}></textarea>
                                    <button type="submit" className="btn btn-default">ADD Product</button>
                                </form>
                                <FormError errors={errors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}