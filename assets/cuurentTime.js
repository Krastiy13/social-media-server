import moment from "moment";


const getCurrentDateTime = () => {

    return moment().format("YYYY-MM-DD HH:mm:ss")
}

export default getCurrentDateTime

