const initialStore = {
    qty: 13
}
// reducer nhận 2 giá trị state, action
const hobbyReducer = (state = initialStore, action) => {
    console.log(action.type);

    switch (action.type) {

        default:
            console.log(state);
            return state;
    }
}