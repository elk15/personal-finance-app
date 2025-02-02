import { Link } from 'react-router-dom';
import CaretRight from '../assets/images/icon-caret-right.svg?react'

interface SeeMoreButtonProps {
    text?: string;
    toPage: string;
}

const SeeMoreButton = ({text, toPage} : SeeMoreButtonProps) => {
  return (
    <Link to={toPage} className='flex items-center gap-3'>
        <span className="text">{text || 'See Details'}</span>
        <CaretRight/>
    </Link>
  )
}

export default SeeMoreButton;