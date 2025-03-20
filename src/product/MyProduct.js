import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function MyProduct() {

    const [data, setData] = useState("")
    // console.log(data);


    const userData = JSON.parse(localStorage.getItem(["appState"]))

    const accessToken = userData.token
    const config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }


    useEffect(() => {
        axios.get("http://localhost/web2m/laravel8/laravel8/public/api/user/my-product", config)
            .then(res => {
                // console.log(res);
                setData(res.data.data)
            })
            .catch(error => console.log(error)
            )
    }, [])
    console.log(data);

    function renderProduct() {
        if (data && Object.keys(data).length > 0) {
            return Object.values(data).map((value, key) => {
                // console.log(value.image);
                // console.log(data[8]);
                // console.log(typeof value);


                const images = JSON.parse(value.image)
                // console.log(images);

                const firstImg = images[0]
                // console.log(typeof firstImg);

                return (
                    <tr key={key}>
                        <td className="cart_product">
                            <a href="#"> <img width={100} alt="" src={"http://localhost/web2m/laravel8/laravel8/public/upload/product/13/" + firstImg} /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href="">{value.name}</a></h4>
                        </td>
                        <td className="cart_price">
                            <p>${value.price}</p>
                        </td>
                        <td class="cart_total">
                            <Link to={`/account/updateProduct/${value.id}`} style={{ color: "blue", marginRight: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f0f0f0" }}>Edit</Link>
                            <a href="#" style={{ color: "red", marginRight: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f0f0f0" }} id={value.id} onClick={handleDeleteProduct}>Delete</a>
                        </td>
                    </tr>
                )
            })
        }
    }

    const handleDeleteProduct = (e) => {
        const valueInputId = e.target.id // lấy id từ id class
        axios.get(`http://localhost/web2m/laravel8/laravel8/public/api/user/product/delete/${valueInputId}`, config)
            .then(res => {
                // console.log(res);
                setData(res.data.data)
            })
            .catch(error => console.log(error)
            )
    }
    return (
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9">
                        <div class="table-responsive cart_info">
                            <table class="table table-condensed table-bordered table-striped" >
                                <thead>
                                    <tr class="cart_menu">
                                        <td class="image">image</td>
                                        <td class="description">name</td>
                                        <td class="price">price</td>
                                        <td class="total">action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProduct()}
                                </tbody>
                            </table>
                            <div style={{ textAlign: "center", backgroundColor: "#FE980F", width: "100px" }}>  <Link to={"/account/AddProduct"}>ADD NEW</Link> </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}