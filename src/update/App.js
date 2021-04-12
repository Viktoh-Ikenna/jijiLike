import React, { useState ,useEffect } from 'react';
import './app.css';
import { Tasks } from './Tasks'
import { Text } from './test';

export const App = () => {
    const colors =['green',"red",'blue','white','brown'];
    const [data, updateDate] = useState([]);
    const [count, updateCount] = useState(0);
    

    const Remove = (kk) => {        
        const res = updateDate((prev) => {
            return data.filter((item, index) => index !== +kk);
        });  
    }

    const collectData = (inputer, textArea) => {
        updateDate((prev) => {
            return [...prev, { title: inputer, description: textArea, id: performance.now() }]
        });
        
    }
    useEffect(()=>{
        
       const counter= setInterval(()=>{
                updateCount(prev=>{
                    if(prev===4){
                        return 0;
                    }else{
                       return prev+1
                    }
                   });
              
        },4000)
        return ()=>clearInterval(counter);
    },[]);
    return (

        <div className='body'>
            <div className='text'>
                <Text onclick={collectData} />
            </div>
            <div>
                <Tasks onSave={data} onClick={Remove} />
            </div>
            <div className="shake" style={{backgroundColor:colors[count]}}></div>
        </div>
    )

}