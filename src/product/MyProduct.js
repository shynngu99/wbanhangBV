import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function MyProduct(props) {

    const [data, setData] = useState([])
    const idProduct = Number(props.id)


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



    const handleDeleteProduct = () => {
        axios.delete("http://localhost/web2m/laravel8/laravel8/public/api/user/product/delete/" + idProduct, config)
            .then(res => {
                console.log(res);

                setData(res.data.data)
            })
            .catch(error => console.log(error)
            )
    }

    function renderProduct() {
        if (data.length > 0) {
            return data.map((value, key) => {
                return (
                    <tr>
                        <td class="cart_description">
                            <h4><a href="">{value.name}</a></h4>

                        </td>
                        <td class="cart_product">
                            <a href=""><img src={"http://localhost/web2m/laravel8/laravel8/public/upload/product/3/" + value['image']} /></a>

                            {/* <p>
                                {value.image}
                            </p> */}
                        </td>
                        <td class="cart_price">
                            <p>${value.price}</p>
                        </td>

                        <td class="cart_total">
                            <a style={{ border: "1px solid #ccc", padding: "5px", margin: "2px", borderRadius: "3px", cursor: "pointer" }}> Edit</a>
                            <a style={{ border: "1px solid #ccc", padding: "5px", margin: "2px", borderRadius: "3px", cursor: "pointer" }}>Delete</a>
                        </td>
                    </tr >

                )
            })
        }

    }
    return (
        <section>
            <div class="container">
                <div class="row">
                    {/* <div class="col-sm-3">
                        <div class="left-sidebar">
                            <h2>Account</h2>
                            <div class="panel-group category-products" id="accordian">

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title"><a href="#">account</a></h4>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title"><a href="#">My product</a></h4>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div> */}
                    <div class="col-sm-9">
                        <div class="table-responsive cart_info">

                            <table class="table table-condensed">
                                <thead>
                                    <tr class="cart_menu">
                                        <td class="description">Name</td>
                                        <td class="image" style={{ textAlign: 'center' }}>Img</td>
                                        <td class="price">Price</td>
                                        <td class="total">Acction</td>

                                    </tr>
                                </thead>


                                <tbody>

                                    {renderProduct()}

                                    {/* <tr>
                                        <td class="cart_product">
                                            <a href=""><img src="images/cart/one.png" alt="" /></a>
                                        </td>
                                        <td class="cart_description">
                                            <h4><a href="">Colorblock Scuba</a></h4>

                                        </td>
                                        <td class="cart_price">
                                            <p>$59</p>
                                        </td>

                                        <td class="cart_total">
                                            <a>edit</a>
                                            <a>delete</a>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td class="cart_product">
                                            <a href=""><img src="images/cart/one.png" alt="" /></a>
                                        </td>
                                        <td class="cart_description">
                                            <h4><a href="">Colorblock Scuba</a></h4>

                                        </td>
                                        <td class="cart_price">
                                            <p>$59</p>
                                        </td>

                                        <td class="cart_total">
                                            <a>edit</a>
                                            <a>delete</a>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td class="cart_product">
                                            <a href=""><img src="images/cart/one.png" alt="" /></a>
                                        </td>
                                        <td class="cart_description">
                                            <h4><a href="">Colorblock Scuba</a></h4>

                                        </td>
                                        <td class="cart_price">
                                            <p>$59</p>
                                        </td>

                                        <td class="cart_total">
                                            <a>edit</a>

                                            <a>delete</a>
                                        </td>
                                    </tr> */}
                                </tbody>
                                <Link to={`/account/Addproduct`} style={{ background: "#FE980F", color: "black", border: "1px solid #ccc", padding: "5px", margin: "2px", borderRadius: "3px", cursor: "pointer" }}> Add New</Link>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}