import { Box } from "@chakra-ui/react";
import { useState } from "react"
import { AiFillStar } from 'react-icons/ai'

interface RateProps {
    count?:Number;
    rating:Number;
    onRating:Function;
    color?:{
        filled?:string;
        unfilled?:string;
    }
    stars:Number;
    disabled?:boolean
}

export const Rate = ({ count = 5, rating, color = {filled:"#f5eb3b",unfilled:"#DCDCDC" }, onRating, stars, disabled = false }: RateProps) => {
    const [hoverRating, setHoverRating] = useState(stars)
    

    const getColor = (index:Number) => {
        if(hoverRating >= index){
            return color.filled;
        }else if(!hoverRating && rating >= index){
            return color.filled;
        }
        return color.unfilled
    }
    
    const startRating = () => {
        return Array(count)
        .fill(0)
        .map((_,i) => i + 1)
        .map(index => (
            <AiFillStar 
            key={`icon-${index}`}
            onClick={() => {onRating(index)}}
            onMouseEnter={() => {disabled ? setHoverRating(0) : setHoverRating(index)}}
            onMouseLeave={() => {setHoverRating(0)}}
            style={{color: getColor(index) as any, cursor:disabled ? "default" : "pointer"}}
            fontSize="23px"
            />
        ))
    }

    return (
        <Box display="flex">
            {startRating}
        </Box>

    )
    

}