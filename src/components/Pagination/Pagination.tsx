import React, { FC } from "react";

import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  onChangePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        // renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
