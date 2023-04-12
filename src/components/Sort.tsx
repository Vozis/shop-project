import React, {
  FC,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { ISort, ISortPropertyEnum } from "../types/types";
import { setCurrentSort } from "../store/slices/filterReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

interface SortProps extends PropsWithChildren {
  value: ISort;
  /*value: ISort;
    onChangeSort: (category: ISort) => void;*/
}

export const sortCategories: ISort[] = [
  {
    name: "популярности по убыванию",
    sortProperty: ISortPropertyEnum.RATING_ASC,
  },
  {
    name: "популярности по возрастанию",
    sortProperty: ISortPropertyEnum.RATING_DESC,
  },
  { name: "цене по убыванию", sortProperty: ISortPropertyEnum.PRICE_ASC },
  { name: "цене по возрастанию", sortProperty: ISortPropertyEnum.PRICE_DESC },
  { name: "алфавиту по убыванию", sortProperty: ISortPropertyEnum.TITLE_ASC },
  {
    name: "алфавиту по возрастанию",
    sortProperty: ISortPropertyEnum.TITLE_DESC,
  },
];

const Sort: FC<SortProps> = React.memo(({ value: currentSort }) => {
  // const { currentSort } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const sortRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [isVisibleSort, setIsVisibleSort] = useState<boolean>(false);

  const onClickSort = (category: ISort) => {
    dispatch(setCurrentSort(category));
    setIsVisibleSort(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // const path = event.path || (event.composedPath && event.composedPath());
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisibleSort(false);
        // console.log("click outside");
      }
      // console.log(event.composedPath());
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="sort" ref={sortRef}>
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            ></path>
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setIsVisibleSort(!isVisibleSort)}>
            {currentSort.name}
          </span>
        </div>
        {isVisibleSort && (
          <div className={"sort__popup"}>
            <ul>
              {sortCategories.map((category, id) => (
                <li
                  key={id}
                  onClick={() => onClickSort(category)}
                  className={
                    currentSort.sortProperty === category.sortProperty
                      ? "active"
                      : ""
                  }
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});
export default Sort;
