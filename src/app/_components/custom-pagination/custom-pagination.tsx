import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

const Pagination = ({
  //현재페이지 nubmer
  activePage,
  //전체 항목 개수
  totalItemCount,
  //보여줄 리스트 수
  viewSize,
  //보여줄페이지수
  pageRangeDisplayed,
  //페이지 변경 핸들러
  onChange,
}: {
  activePage: number;
  totalItemCount: number;
  viewSize: number;
  pageRangeDisplayed: number;
  onChange: (page: number) => void;
}) => {
  //pageRange기준 전체 페이지
  const allDisplayedPage = Math.ceil(totalItemCount / viewSize);

  const startPage =
    Math.floor((activePage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;

  const endPage = Math.min(
    startPage + pageRangeDisplayed - 1,
    allDisplayedPage
  );

  return (
    <div className="flex gap-2">
      <PageActionButton icon={ChevronsLeft} />
      <PageActionButton icon={ChevronLeft} />
      {Array.from({ length: endPage - startPage + 1 }).map((_, idx) => {
        const pageNum = startPage + idx;
        const isActive = activePage === pageNum;
        return (
          <PageItemButton
            key={pageNum}
            page={pageNum}
            isActive={isActive}
            onClick={() => onChange(pageNum)}
          />
        );
      })}
      <PageActionButton icon={ChevronRight} />
      <PageActionButton icon={ChevronsRight} />
    </div>
  );
};

const PageItemButton = ({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`border px-2 py-2 rounded-md w-9 h-9 flex items-center justify-center hover:bg-accent cursor-pointer ${
        isActive ? "bg-accent" : null
      }`}
      onClick={onClick}
    >
      {page}
    </div>
  );
};

const PageActionButton = ({
  icon: Icon,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <div className="border px-2 py-2 rounded-md w-9 h-9 flex items-center justify-center hover:bg-accent cursor-pointer">
      <Icon />
    </div>
  );
};

export default Pagination;
