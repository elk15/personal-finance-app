import SearchIcon from '../assets/images/icon-search.svg?react'

interface SearchBoxProps {
    value: string
    setValue: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

const SearchBox = ({value, setValue, placeholder = "Search bills"} : SearchBoxProps) => {

  return (
    <div className='relative flex-[2]'>
        <input
        value={value}
        onChange={setValue}
        type='text'
        className="border border-grey-300 rounded-lg focus:outline-none focus:border-grey-500 px-4 h-12 w-full"
        placeholder={placeholder}/>
        <SearchIcon className='absolute top-4 right-5'/>
    </div>
  )
}

export default SearchBox;