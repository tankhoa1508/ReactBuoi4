import React, { useEffect, useState } from 'react'

export default function Hook2() {
    const [width,setWidth] = useState(window.innerWidth)
    const [isActive, setIsActive] = useState(true)

    useEffect(()=>{
        if(width<700){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    },[])

    useEffect(()=>{
        const handleResize=()=>{
            setWidth(window.innerWidth)
            console.log(window.innerWidth)
            if(window.innerWidth<700){
                setIsActive(true);
            }
            else{
                setIsActive(false);
            }
        }
        window.addEventListener("resize",handleResize)
        return ()=>{
            window.removeEventListener("resize",handleResize)
        }
    },[])
  return (
    <div>
        <p>width: {width}</p>
        <div className={isActive?"active sidebar":"sidebar"}>

        </div>
    </div>
  )
}
