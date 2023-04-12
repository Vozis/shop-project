import React, { FC, PropsWithChildren, useState } from "react";
import { useWhyDidYouUpdate } from "ahooks";

interface CategoriesProps extends PropsWithChildren {
  value: number;
  onClickCategory: (num: number) => void;
}

const categories = [
  "все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: FC<CategoriesProps> = ({
  children,
  value,
  onClickCategory,
}) => {
  // useWhyDidYouUpdate("Categories", { value, onClickCategory });

  return (
    <div>
      <div className="categories">
        <ul>
          {categories.map((category, id) => (
            <li
              key={id}
              onClick={() => onClickCategory(id)}
              className={value === id ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
