import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div>
                <img src="./search.png" alt="search"></img>
                <input
                    type="text"
                    placeholder="Search Through An Ocean Of Movies: By Title."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

             </div>

        </div>
    )
}

export default Search