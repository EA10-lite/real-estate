import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com"

export const fetchData = async (url)=> {
    console.log(url)
    const { data } = await axios.get((url),{
        headers: {
            "x-rapidapi-host": "bayut.p.rapidapi.com",
            "x-rapidapi-key": "41fd0c51b4mshfd1ee4d4b161260p175041jsn41760a789265"
        }
    })

    return data
}