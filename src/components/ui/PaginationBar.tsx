import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
  seachParams: string;
}

/**
 * PaginationBar component for navigating through paginated content.
 *
 * This component renders a pagination bar with links to different pages.
 * It handles edge cases like displaying ellipses for large sets of pages
 * and ensures a good user experience with easy navigation.
 *
 * @param {PaginationBarProps} props - Props for the PaginationBar component.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} props.currentPage - The current active page.
 * @param {string} props.basePath - The base path for the pagination links.
 * @param {string} props.seachParams - Additional search parameters for the links.
 */
export const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPages,
  currentPage,
  basePath,
  seachParams,
}) => {

  /**
   * Generates an array of page numbers to display in the pagination bar.
   *
   * The function calculates the start and end pages to display based on the current page
   * and total number of pages, ensuring a maximum of 5 page links are shown at a time.
   *
   * @returns {number[]} An array of page numbers to display.
   */
  const getPageNumbers = (): number[] => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Page Button */}
        <PaginationItem className={`${currentPage <= 1 ? "hidden" : "block"}`}>
          <PaginationPrevious
            href={`${basePath}${currentPage - 1}?id=${seachParams}`}
          />
        </PaginationItem>

        {/* Ellipsis and First Page Link for large sets of pages */}
        {currentPage > 3 && totalPages > 5 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`${basePath}1?id=${seachParams}`}
                isActive={1 === currentPage}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* Page Number Links */}
        {getPageNumbers().map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={`${basePath}${pageNumber}?id=${seachParams}`}
              isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis and Last Page Link for large sets of pages */}
        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${basePath}${totalPages}?id=${seachParams}`}
                isActive={totalPages === currentPage}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Page Button */}
        <PaginationItem
          className={`${currentPage >= totalPages ? "hidden" : "block"}`}
        >
          <PaginationNext
            href={`${basePath}${currentPage + 1}?id=${seachParams}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
