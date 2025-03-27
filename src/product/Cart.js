import axios from "axios"
import { useEffect, useState } from "react"

export default function Cart() {

    const [product, setProduct] = useState('')

    const dataLocal = localStorage.getItem("SoLuong")
    const data = JSON.parse(dataLocal)
    // console.log(data);


    useEffect(() => {
        axios.post("http://localhost/web2m/laravel8/laravel8/public/api/product/cart", data)
            .then(res => {
                // console.log(res.data.data);
                setProduct(res.data.data)
            })
            .catch(error => console.log(error)
            )
    }, [])

    // console.log(product);


    const hanldeIncrease = (e) => {
        const id = e.target.id

        let newProduct = [...product] /// tạo 1 bộ nhớ giống product
        newProduct.map((value, key) => {
            const idPro = value.id
            if (idPro == id) {
                newProduct[key]['qty'] += 1;

            }
        })
        setProduct(newProduct)
        if (data[id]) {
            data[id] += 1
        }
        localStorage.setItem("SoLuong", JSON.stringify(data))
    }
    // console.log(product);

    const hanldeReduce = (e) => {
        const id = e.target.id
        let newProduct = [...product] /// tạo 1 bộ nhớ giống product
        newProduct.map((value, key) => {
            const idPro = value.id
            if (idPro == id) {

                newProduct[key]['qty'] -= 1;

            } else {
                if (data[id] <= 0)
                    delete data[id
                    ]
            }

        })
        setProduct(newProduct)

        if (data[id]) {
            data[id] -= 1
        } else {
            if (data[id] <= 0)
                delete data[id]
        }
        localStorage.setItem("SoLuong", JSON.stringify(data))
    }

    const removeProduct = (e) => {
        const id = e.target.id
        let newProduct = product.filter((value) => value.id != id)

        console.log(newProduct);

        setProduct(newProduct)

        if (data[id]) {
            delete data[id]
        }
        localStorage.setItem("SoLuong", JSON.stringify(data))

    }
    function totalALL() {
        let total = 0
        if (product && product.length > 0) {
            for (let i = 0; i < product.length; i++) {
                total += product[i].price * product[i].qty
            }
        }
        return total
    }

    const renderProduct = () => {
        if (product && product.length > 0) {
            return product.map((value, key) => {
                // console.log(value);
                const images = JSON.parse(value.image)
                const firstImg = images[0]
                const total = value.qty * value.price
                return (
                    <tr>
                        <td class="cart_product">
                            <a href=""><img width={100} src={"http://localhost/web2m/laravel8/laravel8/public/upload/product/13/" + firstImg} alt="" /></a>
                        </td>
                        <td class="cart_description">
                            <h4><a href="">{value.name}</a></h4>
                            <p>Web ID: {value.id}</p>
                        </td>
                        <td class="cart_price">
                            <p>${value.price}</p>
                        </td>
                        <td class="cart_quantity">
                            <div class="cart_quantity_button">
                                <a id={value.id} class="cart_quantity_up" onClick={(e) => hanldeIncrease(e)}> + </a>
                                <input class="cart_quantity_input" type="text" name="quantity" value={value.qty} autocomplete="off" size="2" />
                                <a id={value.id} class="cart_quantity_down" onClick={(e) => hanldeReduce(e)} > - </a>
                            </div>
                        </td>
                        <td class="cart_total">
                            <p class="cart_total_price">${total}</p>
                        </td>
                        <td class="cart_delete">
                            <a id={value.id} class="cart_quantity_delete" onClick={(e) => removeProduct(e)}><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                )
            })
        }
    }
    return (
        <>
            <section id="cart_items">
                <div class="container">
                    {/* <div class="breadcrumbs">
                        <ol class="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li class="active">Shopping Cart</li>
                        </ol>
                    </div> */}
                    <div class="table-responsive cart_info">
                        <table class="table table-condensed">
                            <thead>
                                <tr class="cart_menu">
                                    <td class="image">Item</td>
                                    <td class="description"></td>
                                    <td class="price">Price</td>
                                    <td class="quantity">Quantity</td>
                                    <td class="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProduct()}
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>

            <section id="do_action">
                <div class="container">
                    <div class="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="chose_area">
                                <ul class="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul class="user_info">
                                    <li class="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li class="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li class="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a class="btn btn-default update" href="">Get Quotes</a>
                                <a class="btn btn-default check_out" href="">Continue</a>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>$59</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>${totalALL()}</span></li>
                                </ul>
                                <a class="btn btn-default update" href="">Update</a>
                                <a class="btn btn-default check_out" href="">Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}