// * ======= Third Party Components ======= */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//? ======== Local Components ========== */
import useSearchCompletion from '../../hooks/useSearchCompletion';
import { recipeActions } from '../../store/recipes-slice';
import SearchCompleter from './SearchCompleter';

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [showCompletions, setShowCompletions] = useState(false);
  const [getCompletions, isLoading] = useSearchCompletion();
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef();

  const searchCompletions = useSelector(
    (state) => state.recipes.searchCompletions
  );

  const searchInputChangeHandler = async (e) => {
    setSearchInput((_) => e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(recipeActions.setSearchQuery(searchInput));
    navigate(`/search/query/${searchInput}`);
    setShowCompletions(false);
  };

  useEffect(() => {
    // if (searchInput.length < 1) return;

    const timeoutId = setTimeout(async () => {
      await getCompletions(searchInput);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput]);

  return (
    <div className='search-input'>
      <h3>Discover Recipes</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          placeholder='Search your favourite recipe'
          ref={inputRef}
          onChange={searchInputChangeHandler}
          value={searchInput}
          onFocus={() => {
            setShowCompletions(true);
          }}
        />
      </form>

      <div className='completions'>
        {showCompletions &&
          searchCompletions.map((completion) => (
            <SearchCompleter
              completion={completion}
              key={completion.id}
              setShowCompletions={setShowCompletions}
              setSearchInput={setSearchInput}
              handleFormSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchInput;
