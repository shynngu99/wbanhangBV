import { useEffect, useState } from "react"
import FormError from "../menber/FormError"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function AddProduct() {
    let pramas = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState('')
    const [inputs, setInput] = useState({
        name: "",
        price: "",
        brand: "",
        img: "",
        category: "",
        company: "",
        detail: "",
        sale: "",
        status: "0",

    })
    let errorSubmit = {}
    let flag = true

    const [categorys, setCategorys] = useState('')
    const [brands, setBrands] = useState('')


    const [file, SetFile] = useState("")
    const [errors, setErrors] = useState({}) // qua api

    const [avatar, setAvatar] = useState("")


    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({
            ...state, // toán tử spread, sao chép tất cả các thuộc tính  từ trạng thái hiện của state vào obj mới 
            [nameInput]: valueInput  //  nếu nameInput là "email" và valueInput là "[đã xoá địa chỉ email]", thì dòng này sẽ cập nhật state.email thành "[đã xoá địa chỉ email]".
        }))
    }

    const handleInputFile = (e) => {
        // xử lý tại js
        const files = e.target.files
        const validImageExtensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];

        if (files.length === 0 || !files) {
            errorSubmit.avatar = 'Hãy chọn ít nhất 1 ảnh mô tả sản phẩm'
            flag = false
        } else if (files.length > 3) {
            errorSubmit.avatar = 'cho phép upload tối đa 3 ảnh '
            flag = false
        } else {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (file.size > 1024 * 1024) {
                    errorSubmit.avatar = "Hình ảnh vượt quá 1MB";
                    flag = false;
                    break;
                }

                const fileExtension = file.name.split('.').pop();
                if (!validImageExtensions.includes(fileExtension)) {
                    errorSubmit.avatar = "Hình ảnh có đuôi chưa hợp lệ";
                    flag = false;
                    break;
                }
            }
        }
        if (!flag) {
            setErrors(errorSubmit)
        } else {
            SetFile(files)
        }


        // send file to api sever

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
        }
        reader.readAsDataURL(files[0])

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


            Object.keys(avatar).map((item, i) => {
                formData.append("file[]", avatar[item])
            })


            axios.post(url, config, formData)
                .then(res => {
                    setProduct(res)
                    navigate('/account/myproduct')
                })
                .catch(error => console.log(error)
                )
        }
    }

    useEffect(() => {
        axios.get("http://localhost/web2m/laravel8/laravel8/public/api/category-brand")
            .then(res => {
                console.log(res);
                setCategorys(res.data.category)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("http://localhost/web2m/laravel8/laravel8/public/api/category-brand")
            .then(res => {
                console.log(res);
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
                    <option key={key} value={value.id}>{value.category}</option>
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
                                    <select name="sale" className="form-control" onChange={handleInput}>
                                        <option value="">New or Sale</option>
                                        <option value="1">New</option>
                                        <option value="0">Sale</option>
                                    </select>
                                    <div style={{ display: "flex " }}>
                                        <input style={{ width: '20%' }} type="number" name="handleSale" placeholder="0" className="form-control" onChange={handleInput} disabled={inputs.sale === "1"} />
                                        <span style={{ marginTop: "10px" }}>%</span>
                                    </div>
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