import CaretRight from '../assets/images/icon-caret-right.svg?react'

interface SeeMoreButtonProps {
    text?: string;
}

const SeeMoreButton = ({text} : SeeMoreButtonProps) => {
  return (
    <div className='flex items-center gap-3'>
        <button className="text">{text || 'See Details'}</button>
        <CaretRight/>
    </div>
  )
}

export default SeeMoreButton;