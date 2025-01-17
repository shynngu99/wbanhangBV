import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ListComment(props) {
    const [comment, setComment] = useState([])
    const [data, setData] = useState('')
    const idBlog = props.idBlog
    let pramas = useParams();

    useEffect(() => {
        axios.get("http://web2m.test/laravel8/laravel8/public/api/blog/detail/" + pramas.id)
            .then(res => {
                console.log(res);
                setData(res.data.data)


                // console.log(res.data.data.image);


                setComment(res.data.data.comment)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    function renderComment() {
        if (comment.length > 0) {
            return comment.map((value, key) => {
                return (
                    <li class="media" key={key.id}>
                        <a class="pull-left" href="#">
                            <img src={"http://web2m.test/laravel8/laravel8/public/upload/user/avatar/" + data.image} />
                            {/* <p>{data.image}</p> */}
                        </a>
                        <div class="media-body">
                            <ul class="sinlge-post-meta">
                                <li><i class="fa fa-user"></i>{value.name_user}</li>
                                <li><i class="fa fa-clock-o"></i> {value.created_at}</li>
                                <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <p>{value.comment}</p>
                            <a class="btn btn-primary" href=""><i class="fa fa-reply"></i>Replay</a>
                        </div>
                    </li>
                )
            })
        }
    }

    return (
        <ul>
            {renderComment()}
        </ul>
    )
}