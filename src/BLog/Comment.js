import { useState } from "react";

export default function Comment() {

    //tạo biến cmt 
    const [comment, setComment] = useState('')



    const handleCommnet = (e) => {
        setComment(e.target.value)
    }
    // tạo 1 sự kiện onsub
    const handleSubmit = (e) => {
        //dừng chuyển trang
        e.preventDefault();
        let checkLogin = localStorage.getItem("checkLogin")
        if (!checkLogin) {
            console.log("chưa đăng nhập");
        }
        if (!comment) {
            console.log("chưa bình luận");

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
                            <button type="submit" class="btn btn-primary" href="">post comment</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}