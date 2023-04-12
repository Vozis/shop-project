import React, {FC} from "react";

import styles from "./ErrorBlock.module.scss";
import {Link} from "react-router-dom";

const ErrorBlock: FC = () => {
    return (
        <div className={styles.root}>
            <h1>Ничего не найдено :(</h1>
            <p>К сожалению данная страница отсуствует.</p>
            <Link to={"/"}>
                <span>Вернуться на главную</span>
            </Link>
        </div>
    );
};

export default ErrorBlock;
