import axios from "axios"
import { useEffect, useState } from "react"

export default function ListComment() {
    const [comment, setComment] = useState('')

    // useEffect(() => {
    //     axios.post("http://web2m.test/laravel8/laravel8/public/api/blog/detail")
    //         .then(res => {
    //             console.log(res);

    //         })
    // }, [])


    return (
        <li class="media">

            <a class="pull-left" href="#">
                <img class="media-object" src="images/blog/man-two.jpg" alt="" />
            </a>
            <div class="media-body">
                <ul class="sinlge-post-meta">
                    <li><i class="fa fa-user"></i>Janis Gallagher</li>
                    <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                    <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a class="btn btn-primary" href=""><i class="fa fa-reply"></i>Replay</a>
            </div>
        </li>
    )
}