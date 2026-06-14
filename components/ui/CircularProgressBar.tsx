'use client'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


type CircularProgressProps = {
    percentage: number;
};

function CircularProgressBar({ percentage }: CircularProgressProps) {
    return (
        <div className='w-20 h-20'>
            <CircularProgressbar value={percentage} text={`${percentage}/100`} />
        </div>
    )
}

export default CircularProgressBar
