import React, { FC, PropsWithChildren, useState } from "react";
import { IPizza, IPizzaCart } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addProduct } from "../../store/slices/CartReducer";
import { cartSelector } from "../../store/selectors/selectors";
import { Link } from "react-router-dom";

interface PizzaCardProps extends PropsWithChildren {
  pizza: IPizza;
}

const typeNames = ["тонкое", "традиционное"];

const PizzaCard: FC<PizzaCardProps> = ({ pizza, children }) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);

  const { items } = useAppSelector(cartSelector);
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === pizza.id)
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const dispatch = useAppDispatch();

  const onCLickAdd = () => {
    const item: IPizzaCart = {
      count: 1,
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
    };
    dispatch(addProduct(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${pizza.id}`}>
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {pizza.types.map((type) => (
            <li
              onClick={() => setActiveType(type)}
              key={type}
              className={activeType === type ? "active" : ""}
            >
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {pizza.sizes.map((size, id) => (
            <li
              key={id}
              className={activeSize === id ? "active" : ""}
              onClick={() => setActiveSize(id)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
        <button
          onClick={onCLickAdd}
          className="button button--outline button--add"
          // onClick={clickHandler}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
