import React, {FC, useCallback, useEffect, useRef} from 'react';

import Sort, {sortCategories} from '../components/Sort';

import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../store/store';
import {setCategoryId, setCurrentPage, setFilters,} from '../store/slices/filterReducer';
import qs from 'qs';
import {fetchPizzas} from '../store/slices/PizzaReducer';
import {filterSelector, pizzaSelector} from '../store/selectors/selectors';
import {Categories, Pagination, PizzaBlockSkeleton, PizzaCard,} from '../components';

// import { add } from "../utils/math";
import("../utils/math").then((math) => {
  console.log(math.add(16, 26));
});
const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, currentSort, currentPage } =
    useAppSelector(filterSelector);
  const { pizzas, pending, error } = useAppSelector(pizzaSelector);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useAppSelector(filterSelector);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  // console.log(pizzas);

  const getPizzas = async () => {
    const order = currentSort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = currentSort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search-${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: currentSort.sortProperty,
        categoryId: categoryId,
        currentPage: currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentSort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // console.log("params: ", params);
      const sort = sortCategories.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      // console.log("sort: ", sort);

      dispatch(
        setFilters({
          ...params,
          currentSort: sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, currentSort, searchValue, currentPage]);

  const skeletons = [...new Array(8)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  const pizzaItems = pizzas
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((pizza) => (
      <div className="pizza-block-wrapper" key={pizza.id}>
        <PizzaCard pizza={pizza} />
      </div>
    ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={currentSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {error ? (
        <div>
          <b>Возникла ошибка при загрузке данных</b>
        </div>
      ) : (
        <div className="content__items">{pending ? skeletons : pizzaItems}</div>
      )}
      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;

export async function pizzasLoader() {
  const response = await fetch(
    "https://634304f5ba4478d47846f6e5.mockapi.io/pizzas"
  );
  return response.json();
}
