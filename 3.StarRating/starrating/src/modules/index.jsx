import { FaStar } from "react-icons/fa";
import { useState } from 'react';
import "./style.css";

export default function StarRating({noOfStars = 5}) {
    const[rating, setRating] = useState(0);
    const[hover, setHover] = useState(0);
    function handleClick(getCurrentIndex){
        setRating(getCurrentIndex);
    }
    function handleMouseEnter(getCurrentIndex){
        setHover(getCurrentIndex);
    }
    function handleMouseLeave(){
        setHover(rating);   // or we can also set it 0 while leaving then the (hover || rating) will evalueate and from there the non-zero 'rating' would be choosen
    }

  return (
    <div className="star-rating">
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;
        return (
        <FaStar 
            key={index}
            className={index <= (hover || rating) ? 'active' : 'inactive'}  // here actually (hover || rating) not needed as onMouseLeave 'hover' is actually set to 'rating' so it never becomes zero and rating is never used in the scope
            onClick={()=> handleClick(index)}
            onMouseMove={()=> handleMouseEnter(index)}
            onMouseLeave={()=> handleMouseLeave()}
            size={40}
        />
        );
      })}
    </div>
  );
}
