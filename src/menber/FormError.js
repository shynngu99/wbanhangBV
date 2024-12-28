export default function FormError(props) {
    function render() {
        let { errors } = props

        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map((key, index) => {
                return (
                    <li key={index}>{errors[key]}</li>
                )
            })
        }
    }
    return (
        <ul>{render()}</ul>
    )
}