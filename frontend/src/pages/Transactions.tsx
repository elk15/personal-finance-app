import { Card, HeaderPreset1, PaginationButton, PrimaryButton } from "../styled-components";
import { useAppSelector } from "../components/hooks/hooks";
import { useEffect, useMemo, useState } from "react";
import { AllTransactions, CategoryDropdownOption, SortBy, TransactionCategory } from "../types";
import Dropdown from "../components/Dropdown";
import SearchBox from "../components/SearchBox";
import LeftCaretIcon from "../assets/images/icon-caret-left.svg?react"
import RightCaretIcon from "../assets/images/icon-caret-right.svg?react"
import { getFilterByQueryFunction, getSortByFunction } from "../utils";
import TransactionForm from "../components/transactions/TransactionForm";
import useScreenWidth from "../components/hooks/useScreenWidth";
import TransactionItem from "../components/transactions/transactionItem";

const Transactions = () => {
    const { loadingStatus, data } = useAppSelector((state) => state.transactions)
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Latest)
    const [selectedCategory, setSelectedCategory] = useState<CategoryDropdownOption>(AllTransactions.AllTransactions)
    const [query, setQuery] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [showAddNew, setShowAddNew] = useState<boolean>(false)
    const screenWidth = useScreenWidth()    

    const categories: CategoryDropdownOption[] = [AllTransactions.AllTransactions, ...Object.values(TransactionCategory)]
    const transactionsPerPage = 10

    const goToNextPage = () => {
        if (currentPage + 1 <= pagesCount) setCurrentPage(currentPage + 1)
    }

    const goToPrevPage = () => {
        if (currentPage - 1 > 0) setCurrentPage(currentPage - 1)
    }

    const filteredTransactions = useMemo(() => 
        [...data]
            .filter(t => {
                if (selectedCategory == AllTransactions.AllTransactions) {
                    return true
                }
                return t.category == selectedCategory
            })
            .filter(getFilterByQueryFunction(query))
            .sort(getSortByFunction(sortBy))
        , [data, query, selectedCategory, sortBy]);
    
    const pagesCount = Math.floor(filteredTransactions.length/transactionsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [query, selectedCategory])    

    return (
      <>
        <div className="flex justify-between items-center mb-4">
            <HeaderPreset1>Transactions</HeaderPreset1>
            <PrimaryButton onClick={() => setShowAddNew(true)}>+ Add New Transaction</PrimaryButton>
        </div>
        {loadingStatus.initializeTransactions == 'pending' ?
            <div className="m-auto mt-10">
                <l-dot-wave
                size="47"
                speed="1"
                color="black"
                ></l-dot-wave>
            </div>
        :
        <div className="flex gap-6 lg:flex-row flex-col">
            <div className="flex-1">
                <Card>
                    <div className="mb-4 flex justify-between items-center gap-4">
                        <SearchBox value={query} setValue={(e) => setQuery(e.currentTarget.value)} placeholder="Search transactions"/>
                        <Dropdown options={Object.values(SortBy)} value={sortBy} setValue={(value) => setSortBy(value as SortBy)} />
                        <Dropdown 
                            name="Category" 
                            options={categories} 
                            value={selectedCategory} 
                            setValue={(value) => setSelectedCategory(value as CategoryDropdownOption)} 
                            isCategories={true}
                        />
                    </div>
                    <div className="sm:flex hidden p-2 gap-6">
                        <p className="flex-1 max-w-[420px]">Recipient/Sender</p>
                        <p className="min-w-[100px]">Category Date</p>
                        <p className="min-w-[100px]">Transaction Date</p>
                        <p className="flex-1 text-right">Amount</p>
                    </div>
                    <div className="flex flex-col">
                        {filteredTransactions
                        .slice(0 + (transactionsPerPage * (currentPage - 1)), transactionsPerPage * currentPage)
                        .map(t => 
                            <TransactionItem 
                            key={t.id} 
                            name={t.name} 
                            category={t.category} 
                            amount={t.amount}
                            date={t.date}
                            id={t.id}
                            recurring={t.recurring}
                            />
                        )}
                    </div>
                    <div className="flex justify-between">
                        <PaginationButton className={`${currentPage == 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={goToPrevPage}>
                            <LeftCaretIcon/> {screenWidth > 640 && 'Prev'}
                        </PaginationButton>
                        <div className="flex gap-2">
                            {currentPage - 1 > 0 && 
                                <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
                                    {currentPage - 1}
                                </PaginationButton>
                            }
                            <PaginationButton $active>{currentPage}</PaginationButton>
                            {currentPage + 1 <= pagesCount && 
                                <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
                                    {currentPage + 1}
                                </PaginationButton>
                            }
                        </div>
                        <PaginationButton className={`${(currentPage == pagesCount || filteredTransactions.length <= transactionsPerPage * currentPage) 
                        ? 'opacity-50 pointer-events-none' : ''}`} 
                        onClick={goToNextPage}>
                            {screenWidth > 640 && 'Next'} <RightCaretIcon/>
                        </PaginationButton>
                    </div>
                </Card>
            </div>
        </div>
        }
        {showAddNew &&
          <TransactionForm isAddNew={true} setShowModal={setShowAddNew}/>
        }
      </>
    )
  }
  
  export default Transactions