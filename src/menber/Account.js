import { useState } from "react"

export default function Account() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        level: '',
        avatar: ''
    })

    const userData = JSON.parse(localStorage.getItem(['appState']))

    return (
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
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
                    </div>
                    <div class="col-sm-9">
                        <div class="blog-post-area">
                            <h2 class="title text-center">Update user</h2>
                            <div class="signup-form">
                                <h2>New User Signup!</h2>
                                <form action="#" enctype="multipart/form-data">
                                    <input type="text" name="name" placeholder="Name" value={userData.Auth.name} />
                                    <input type="email" name="email" placeholder="Email Address" readOnly value={userData.Auth.email} />
                                    <input type="password" name="password" placeholder="Password" />
                                    <input type="number" name="phone" placeholder="Phone" value={userData.Auth.phone} />
                                    <input type="text" name="address" placeholder="Address" value={userData.Auth.address} />
                                    <input type="text" name="level" placeholder="Level" value={userData.Auth.level} />
                                    <input type="file" name="avatar" placeholder="chọn Avatar" />

                                    <button type="submit" class="btn btn-default">Sign up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}