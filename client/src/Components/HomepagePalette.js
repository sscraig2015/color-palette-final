import React, {useEffect, useState} from 'react'

const HomepagePalette = () => {
  
    const [palette, setPalette] = useState()
    console.log(palette)
    
    useEffect(() => {
        const options = {
          method: 'POST',
          body: JSON.stringify({ 	
            model : "default",
            input : ["N","N","N","N","N"]})
        }
        fetch(`http://colormind.io/api/`, options)
          .then((r) => r.json())
          .then((data) => setPalette(data))
      }, [])
    
    if(palette){
        return (
        <form className='h-[75%]'>
            <div className='w-screen h-[100%] flex'>
                {palette.result.map((color, key) => {
                    return (
                        //Color Tile
                        <div key={key} className='w-[20%] flex flex-col'>
                            <div className='h-[95%]' style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}>
                                
                            </div>
                            <div className='h-[5%]'>
                                {`rgb(${color[0]}, ${color[1]}, ${color[2]})`}
                            </div>
                        </div>
                    )
                })}
            </div>
        </form>
        )
    }
}

export default HomepagePalette