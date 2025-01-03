export default function Comment() {
    let checkLogin = localStorage.getItem('checkLogin')
    if (checkLogin) {
        console.log("CMT thành công");

    } else {
        console.log("bạn chưa đăng nhập");

    }
    return (
        <div class="replay-box">
            <div class="row">
                <div class="col-sm-12"><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: 0px; left: 0px; pointer-events: none;">
                </grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: 0px; left: 0px; pointer-events: none;">
                    </grammarly-extension><h2>Leave a replay</h2>
                    <div class="text-area">
                        <div class="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea name="message" rows="11" spellcheck="false"></textarea>
                        <a class="btn btn-primary" href="">post comment</a>
                    </div>
                </div>
            </div>
        </div>
    )
}