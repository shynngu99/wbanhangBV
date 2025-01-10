import axios from "axios";
import { useState } from "react";

export default function Comment(props) {

    //tạo biến cmt 
    const [comment, setComment] = useState('')



    const handleCommnet = (e) => {
        setComment(e.target.value)
    }
    // tạo 1 sự kiện onsubm
    const handleSubmit = (e) => {
        //dừng chuyển trang

        e.preventDefault();
        let checkLogin = localStorage.getItem("checkLogin")
        if (!checkLogin) {
            console.log("chưa đăng nhập");
        }

        // localStorage.setItem("appState", "")
        let userDataJson = JSON.parse(localStorage["appState"])


        let userData = JSON.stringify(userDataJson)
        // const x = userData.Auth.name
        // console.log(x);


        let url = '/blog/comment' + props.idBlog
        let accessToken = userData.token
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };

        if (!comment) {
            console.log("chưa bình luận");
        } else {
            let formData = new formData();
            formData.append('id_blog', props.idBlog)
            formData.append('id_user', userData.Auth.id)
            formData.append('id_commnent', 0)
            formData.append('image_user', userData.Auth.image)
            formData.append('name_user', userData.Auth.name)
            formData.append('comment', comment)

            axios.post("http://web2m.test/laravel8/laravel8/public/api/blog/detail", formData, config)
                .then(res => {
                    console.log(res);
                    setComment(res.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        //  else {
        //     console.log("đăng nhập thành công");
        // }

    }
    return (
        <div class="replay-box">
            <form onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div class="text-area">
                            <div class="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <textarea name="message" value={comment} rows="11" onChange={handleCommnet}></textarea>
                            <button type="submit" class="btn btn-primary" href="">Post comment</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}