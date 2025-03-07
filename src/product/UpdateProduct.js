import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import FormError from "../menber/FormError";

export default function UpdateProduct(props) {
    const pramas = useParams();

    // console.log(pramas);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        status: "",
        sale: ""
    })
    const navigate = useNavigate();
    // console.log(product.id_brand);

    // console.log(product);

    // const [inputs, setInput] = useState("")

    const [categorys, setCategorys] = useState('')

    // console.log(categorys);


    const [brands, setBrands] = useState('')
    // console.log(brands);



    let userData = JSON.parse(localStorage.getItem(['appState']))

    const accessToken = userData.token

    const config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }

    useEffect(() => {
        axios.get('http://localhost/web2m/laravel8/laravel8/public/api/user/product/' + pramas.id, config)
            .then(res => {
                // console.log(res);
                setProduct(res.data.data)
            })
            .catch(error => console.log(error)
            )
    }, [])


    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setProduct(state => ({
            ...state,
            [nameInput]: valueInput
        }))
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
                // console.log(value);
                return (
                    // value={value.id}
                    <option key={key} value={value.id}>{value.brand}</option>
                )
            })
        }
    }
    const [avatarCheckBox, setAvatarCheckBox] = useState([]); // lưus trạng thái của checkboxx đc chọn

    const imgPro = product.image
    // console.log(imgPro);

    const handleImage = () => {
        if (imgPro && imgPro.length > 0) {
            return imgPro.map((value, key) => {
                // console.log(value);
                return (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }} key={key}>
                        <div style={{ margin: '10px' }}>
                            <img height={100} width={100} src={"http://localhost/web2m/laravel8/laravel8/public/upload/product/13/" + value} style={{ objectFit: 'cover' }} />
                            <input
                                type="checkbox"
                                value={value}
                                onChange={handleInputCheckBox}
                            />
                        </div>
                    </div>
                )
            })

        }
    }

    // console.log(avatarCheckBox);

    const handleInputCheckBox = (e) => {
        const valueInputcheckB = e.target.value
        setAvatarCheckBox(arrCheckBox => {
            if (arrCheckBox.includes(valueInputcheckB)) {
                return arrCheckBox.filter(img => img !== valueInputcheckB);
            } else {
                return [...arrCheckBox, valueInputcheckB]
            }
        })

    }

    const url = 'http://localhost/web2m/laravel8/laravel8/public/api/user/product/update/' + pramas.id

    let errorSubmit = {}
    let flag = true
    const [errors, setErrors] = useState({})
    const [getFile, SetFile] = useState("")
    const [avatar, setAvatar] = useState('')
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

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (product.name == "") {
            errorSubmit.name = "Chưa cập nhập tên"
            flag = false
        }
        if (product.price == "") {
            errorSubmit.price = "Chưa cập nhập Price"
            flag = false
        }
        if (product.category == "") {
            errorSubmit.category = "Chưa cập nhập category"
            flag = false
        }
        if (product.brand == "") {
            errorSubmit.brand = "Chưa cập nhập brand"
            flag = false
        }
        if (product.detail == "") {
            errorSubmit.detail = "Chưa cập nhập Detail"
            flag = false
        }
        if (product.company == "") {
            errorSubmit.company = "Chưa cập nhập company"
            flag = false
        }
        if (product.sale == "") {
            errorSubmit.sale = "Chưa cập nhập Sale"
            flag = false
        }
        if (product.status == "") {
            errorSubmit.state = "Chưa cập nhập Status"
            flag = false
        }
        const totalImg = avatarCheckBox.length + getFile.length

        if (totalImg >= 3) {
            errorSubmit.avatar = "số lượng ảnh không vượt quá 3 ảnh"
            flag = false;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('category', product.id_category);
        formData.append('brand', product.id_brand);
        formData.append('detail', product.detail);
        formData.append('company', product.company);
        formData.append('sale', product.sale);
        formData.append('status', product.status);


        for (let i = 0; i < avatarCheckBox.length; i++) {
            formData.append('avatarCheckBox[]', avatarCheckBox[i]);
        }

        console.log(getFile);

        for (let j = 0; j < getFile.length; j++) {
            formData.append('file[]', getFile[j]);
        }

        axios.post(url, formData, config)
            .catch(res => {
                alert("đã update thàng công")
                console.log(res);
                navigate("/account/myproduct")

            })
            .then(error => {
                console.log(error);
            })
    }


    function renderSale(e) {
        if (product.status === "1") {
            return (
                <div style={{ display: "flex " }}>
                    <input style={{ width: '20%' }} type="number" name="sale" placeholder="0" className="form-control" value={0} disabled onChange={handleInput} />
                    <span style={{ marginTop: "10px" }}>%</span>
                </div>
            )
        } else if (product.status === "0") {
            return (
                <div style={{ display: "flex " }}>
                    <input style={{ width: '20%' }} type="number" name="sale" placeholder="0" className="form-control" value={product.sale} onChange={handleInput} />
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
                            <h2 class="title text-center">UPDATE PRODUCT</h2>
                            <div class="signup-form">
                                <h2>New User Signup!</h2>
                                <form action="#" onSubmit={handleSubmit}>
                                    <input type="text" name="name" placeholder="Name" className="form-control" value={product.name} onChange={handleInput} />
                                    <input type="number" name="price" placeholder="Price" className="form-control" value={product.price} onChange={handleInput} />
                                    <select name="category" className="form-control" value={product.category} onChange={handleInput}>
                                        {handleInputC()}
                                    </select>
                                    <select name="brand" className="form-control" value={product.brand} onChange={handleInput}>
                                        {handleInputB()}
                                    </select>
                                    <select name="status" className="form-control" value={product.status} onChange={handleInput}>
                                        <option value="1">New</option>
                                        <option value="0">Sale</option>
                                    </select>
                                    {renderSale()}
                                    {/* chưa xử lý được khi chọn new thì % reset về 0 */}
                                    <input type="text" name="company" placeholder="Company profile" className="form-control" value={product.company_profile} onChange={handleInput} />
                                    {handleImage()}
                                    <input type="file" multiple name="image" className="form-control" onChange={handleInputFile} accept=".jpg,.jpeg,.png" max="3" />
                                    <textarea name="detail" placeholder="Detail" className="form-control" rows="5" value={product.detail} onChange={handleInput}></textarea>
                                    <button type="submit" className="btn btn-default">Update Product</button>
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