import axios from "axios"
import { useEffect, useState } from "react"

export default function ListComment(props) {
    const [comment, setComment] = useState([])
    const idBlog = props.idBlog
    useEffect(() => {
        axios.get("http://web2m.test/laravel8/laravel8/public/api/blog/comment/" + idBlog)
            .then(res => {
                console.log("------------");
                
                console.log(res);

                console.log("------------");
                setComment(res.data.data)
            })
    }, [])

    function renderComment() {
        if (comment.lengh > 0) {
            return comment.map((value, key) => {
                return (
                    <div class="media" key={key}>
                        <a class="pull-left" href="#">
                            <img class="media-object" src="images/blog/man-two.jpg" alt="" />
                        </a>
                        <div class="media-body">
                            <ul class="sinlge-post-meta">
                                <li><i class="fa fa-user"></i>{key.name_user}</li>
                                <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <p>{key.comment} </p>
                            <a class="btn btn-primary" href=""><i class="fa fa-reply"></i>Replay</a>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <li>
            {renderComment()}
        </li>
    )
}