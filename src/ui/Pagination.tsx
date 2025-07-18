import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/config";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ readonly active: boolean }>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ count }: { count: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const prevDisabled = currentPage === 1;
  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = currentPage === pageCount ? count : from + PAGE_SIZE;
  const nextDisabled = currentPage === pageCount || to === count;

  const nextPage = () => {
    const next = nextDisabled ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  };
  const prevPage = () => {
    const prev = prevDisabled ? currentPage : currentPage - 1;
    searchParams.set("page", prev.toString());

    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;
  return (
    <StyledPagination>
      <P>
        Showing <span>{from}</span>
        <span> to </span>
        <span>{to}</span> of
        <span> {count}</span> result
      </P>
      <Buttons>
        <PaginationButton
          disabled={prevDisabled}
          onClick={prevPage}
          active={false}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          disabled={nextDisabled}
          onClick={nextPage}
          active={false}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
