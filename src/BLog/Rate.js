import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings"

export default function Rate(props) {
    const [rating, setRating] = useState(0)

    const idBlog = Number(props.idBlog);
    const formData = new FormData();
    let pramas = useParams();
    function changeRating(newRating, name) {

        setRating(newRating)
        // xử lý logic
        let checkLogin = localStorage.getItem("checkLogin")
        const userData = JSON.parse(localStorage.getItem(["appState"]));


        if (!checkLogin) {
            console.log("chưa đăng nhập");
        }
        if (!rating) {
            console.log("chưa đánh gia");
        } else {

            // xử lý api
            formData.append('id_blog', idBlog)
            formData.append('id_user', userData.Auth.id)
            formData.append('rate', rating)

            axios.get("http://localhost/web2m/laravel8/laravel8/public/api/blog/rate/" + idBlog, formData)
                .then(res => {
                    console.log(res);
                    setRating(res.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }
    useEffect(() => {
        axios.get("http://localhost/web2m/laravel8/laravel8/public/api/blog/rate/" + pramas.id)
            .then(res => {
                // tạo 1 array đánh  giá
                if (res.length > 0) {
                    const rates = res.data
                    // sử dụng reduce để tính trung bình cộng

                    const averageRating = rates.reduce((totalRatesNow, rate) => totalRatesNow + rate.rate, 0) / rates.length;
                    setRating(averageRating.toFixed(1))
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating" />
    )
}