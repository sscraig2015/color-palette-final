import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CopyAlert from '../Components/CopyAlert';
import SaveAlert from '../Components/SavedAlert';
import UserAction from '../Components/UserAction';
import ColorTile from '../Components/ColorTile';
import { homePalette, newUserPalette } from '../Slices/paletteSlice'

const Homepage = () => {
  
  const dispatch = useDispatch()

  const [savedColors, setSavedColors] = useState([])
  const [mousePos, setMousePos] = useState({})
  const [saveAlert, setSaveAlert] = useState(false)
  const [alert, setAlert] = useState(false)


  const palette = useSelector((state) => state.palette.paletteHome)




  //Resets user's palette selection
  function resetForm(){
    document.getElementById('colorForm').reset()
    const clist = document.getElementsByTagName("input");
    for (const el of clist) {
        el.checked = false;
    }
  }


  //Generates new palette with user's saved colors
  function newPalette(e){
    e.preventDefault()

    dispatch(newUserPalette(savedColors))
    setSavedColors([])
    resetForm()
  }
    
    if(palette){
      
      return (
          <div className='h-[80%] w-screen mb-[2%]'>
              {alert? <CopyAlert mousePos = {mousePos}/> : null }
              {saveAlert? <SaveAlert mousePos = {mousePos}/> : null}
              <form className='h-[95%]' id='colorForm'>
                  <div className='w-screen h-[100%] flex'>
                      {palette.map((color, index) => {
                          return (
                              <ColorTile key={index} index={index} color={color} setSavedColors={setSavedColors} savedColors={savedColors} setMousePos={setMousePos} setAlert={setAlert}/>
                          )
                      })}
                  </div>
              </form>
              <UserAction newPalette={newPalette} setSaveAlert={setSaveAlert} setMousePos={setMousePos} />
          </div>
      )
    }
}


export default Homepage