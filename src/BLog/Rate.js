import { useState } from "react"
import StarRatings from "react-star-ratings"

export default function Rate() {
    const [rating, setRating] = useState(0)

    function changeRating(newRating, name) {
        setRating(newRating)

        // xử lý logic
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