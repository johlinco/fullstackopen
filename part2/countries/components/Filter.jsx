


const Filter = ({ searchText, searchTextUpdate }) => {
    return (
      <div>
        find countries
        <input 
          onChange={searchTextUpdate}
          value={searchText}
        />
      </div>
    )
  }

  export default Filter