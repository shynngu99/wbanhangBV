import { useState } from "react"
import StarRatings from "react-star-ratings"

export default function Rate(props) {
    const [rating, setRating] = useState(0)

    const dataRatings = new dataRatings();

    const idBlog = props.idBlog
    const dataApi = {
        u
    }

    function changeRating(newRating, name) {
        setRating(newRating)

        // xử lý logic
        function changeRating() {
            let checkLogin = localStorage.getItem("checkLogin")
            if (checkLogin) {

            }
        }


        // xử lý api
    }
    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name="rating" />
    )
}