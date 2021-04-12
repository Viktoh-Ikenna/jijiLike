import React,{useState, useEffect}  from 'react';
import './slides.css';


const images =[
    "https://www.shoutmeloud.com/wp-content/uploads/2011/02/youtube-income-per-day-1024x688.png",
    "https://i.ytimg.com/vi/zXbUEzCdfoM/maxresdefault.jpg",
    "https://logosbynick.com/wp-content/uploads/2019/12/youtube-earnings.png",
    "https://blog.sellfy.com/wp-content/uploads/2018/09/youtube-subscribers-1024x512.png",
    "https://internetfolks.com/wp-content/uploads/incomeschool-youtube-earnings-june-2019.jpg"
]
export const Slides = () => {
   
    const [slides, setSlides]=useState(null);
const sliderFunc=()=>{
    setSlides(prev=>{
        if(prev===4){
            return 0;
        }else{
           return prev+1
        }
       });
}
const BacksliderFunc=()=>{
    setSlides(prev=>{
        if(prev>0){
            return  prev-1;
        }else{
            return 0
        }
       });
} 
useEffect(()=>{
           const i= setInterval(()=>{
                sliderFunc();
          
        },3000);
        return ()=>clearInterval(i);
    },[]);
    return (
        <div>
        <div class="slides">
                <div class="button left" onClick={BacksliderFunc}><div></div></div>
                <div class="conta">

                    <div id="co" style={{left:`-${slides}00%`}}>
                        {images.map(e=>(<img src={e} />))}
                    </div>

                </div>
                <div class="button right" onClick={sliderFunc} ><div></div></div>

            </div>
        </div>
    )
}
