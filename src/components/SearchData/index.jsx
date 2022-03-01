import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import styles from './index.module.scss'


const SearchData = (props) => {
    const { setSearch, searchKeyword } = props;
    // const[search, setSearch] = useState("")

    return (
        <div className={styles.inputSearchFieldContainer}>
            <select id="all">
                <option value="">ALL</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Expired">Expired</option>
                <option value="Deleted">Deleted</option>
            </select>
            <div className={styles.inputSearchFieldWrapper}>
                <div className={styles.iconSearchWrapper}>
                    <BiSearch className={styles.iconSearch} />
                </div>
                <input
                    className={styles.inputTxt}
                    type='text'
                    value={searchKeyword}
                    placeholder="Keyword..."
                    onChange={(e) => setSearch(e.target.value)}>
                </input>
            </div>
        </div>
    )
}

export default SearchData