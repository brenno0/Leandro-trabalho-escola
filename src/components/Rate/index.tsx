import { Box } from "@chakra-ui/react";
import { useMemo, useState } from "react"
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
}

export const Rate = ({ count = 5, rating, color = {filled:"#f5eb3b",unfilled:"#DCDCDC" }, onRating, stars }: RateProps) => {
    const [hoverRating, setHoverRating] = useState(stars)
    

    const getColor = (index:Number) => {
        if(hoverRating >= index){
            return color.filled;
        }else if(!hoverRating && rating >= index){
            return color.filled;
        }
        return color.unfilled
    }
    
    const startRating = useMemo(() => {
        return Array(count)
        .fill(0)
        .map((_,i) => i + 1)
        .map(index => (
            <AiFillStar 
            key={`icon-${index}`}
            onClick={() => {onRating(index)}}
            onMouseEnter={() => {setHoverRating(index)}}
            onMouseLeave={() => {setHoverRating(0)}}
            style={{color: getColor(index) as any, cursor:"pointer"}}
            fontSize="23px"
            />
        ))
    }, [count, getColor, onRating]);

    return (
        <Box display="flex">
            {startRating}
        </Box>

    )
    

}