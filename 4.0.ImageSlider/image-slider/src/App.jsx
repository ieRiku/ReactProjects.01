import { useEffect, useState } from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs';
import './App.css'


function App({url,limit=5, page=1}) {
  const [count, setCount] = useState(0)
  const [images, setImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchImages(getUrl) {
    try{
      setLoading(true)
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      if(data){
        setImages(data)
        setLoading(false)
      }
    }
    catch(e){
      setErrorMessage(e.message);
      setLoading(false);
    }
  }

  useEffect(()=> {
    if(url !== ""){
      fetchImages(url)
    }
  },[url])

  console.log(images);

  if(loading){
    return <div>Loading data! Please wait</div>;
  }
  if(errorMessage){
    <div>Error occured! Please wait.</div>;
  }
  

  return (
    <>
      <div className='container'>
        <BsArrowLeftCircleFill className="arrow arrow-left"/>
        {images && images.length ?
          images.map(imageItem=>(
            <img key={imageItem.id}
            alt={imageItem.download_url}
            src={imageItem.download_url}
            className="current-image"
            />
          ))
        : null}
        <BsArrowRightCircleFill className="arrow arrow-right"/>
        <span className="circle-indicators">
          {
            images && images.length ?
              images.map((_, index)=> <button key={index} className="current-Indicator">

              </button>)
          : null}
        </span>
      </div>
    </>
  )
}

export default App
