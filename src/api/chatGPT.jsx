import React, {useState, useEffect} from "react";

const URL = 'https://api.openai.com/v1/chat/completions';

const GptApiCall=()=>{

    const [temp, setTemp] = useState()

    useEffect(()=>{
        const fetchData = async ()=>{
        const result = await fetch (URL)
console.log(result)
        }
        fetchData();
    })

    return(
        <div> {temp}</div>
    )
}

export default GptApiCall;