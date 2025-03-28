import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { onHistoryExportData } from "@/hooks/history/excel_hooks";
import { useApiStore } from "@/stores/api-store";
import { useFilterStore } from "@/stores/filter-store";
import { useHistoryStore } from "@/stores/histories-store";
import { useRouter } from "next/navigation";
import Pagination from "../custom-pagination/custom-pagination";
import { CustomSelect } from "../custom-select/custom-select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CustomDataTable from "../custom-data-table/custom-data-table";
import { ViewSize } from "@/types/history/histroy";
import { ListLoading, ListModel } from "@/types/list-type";
import { columns } from "../custom-data-table/columns";
import { History } from "@prisma/client";
import { useEffect, useState } from "react";

export const DataTableArea = ({ title }: { title: string }) => {
  const router = useRouter();
  const { histories, historyTotalCount, setCurrentHistory } = useHistoryStore();

  const { page, viewSize, setPage, setViewSize } = useFilterStore();

  const { queryParams } = useApiStore();

  const [isPagination, setIsPagination] = useState<boolean>(false);

  useEffect(() => {
    //로딩중
    if (histories === ListLoading) {
      return;
    }
    if (histories !== ListLoading) {
      if (
        Math.ceil(
          (histories as ListModel<History>).meta.totalItemCount / viewSize
        ) > 1
      ) {
        setIsPagination(true);
        return;
      }
      setIsPagination(false);
      return;
    }
  }, [histories, viewSize]);

  //view 개수 변경 핸들러
  const onSelectViewNum = (value: any) => {
    const params = new URLSearchParams(queryParams);
    params.set("viewSize", value);
    params.set("page", "1");
    setPage(1);
    setViewSize(value);
    router.push(`?${params}`);
  };

  const onExport = async () => {
    await onHistoryExportData({
      title: "입출차이력",
      worksheetname: "입출차이력",
      datas: histories,
    });
  };

  return (
    <div className="container max-w-full flex-3 ">
      <Card className="p-8 h-full">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardDescription className={`flex justify-between `}>
          {histories === ListLoading ? (
            <Skeleton className="h-9 w-80" />
          ) : isPagination ? (
            <Pagination
              activePage={page}
              totalItemCount={historyTotalCount}
              viewSize={viewSize}
              pageRangeDisplayed={5}
              onChange={setPage}
            />
          ) : (
            <div></div>
          )}
          {histories === ListLoading ? (
            <Skeleton className="w-50 h-9" />
          ) : (
            <div className="flex gap-6">
              <CustomSelect
                className="w-20"
                values={ViewSize}
                defaultValue={viewSize}
                onChange={onSelectViewNum}
              />
              {historyTotalCount < 1 ? null : (
                <Button className="cursor-pointer" onClick={onExport}>
                  <Download />
                  <span>Excel</span>
                </Button>
              )}
            </div>
          )}
        </CardDescription>

        <CardContent className="p-0 h-full gap-2 overflow-hidden">
          {histories === ListLoading ? (
            <div className="flex flex-col gap-6 h-full">
              <Skeleton className="h-full w-full rounded-xl bg-input" />
            </div>
          ) : (
            <div className="rounded-md border h-full overflow-y-auto">
              <CustomDataTable<History, any>
                columns={columns}
                data={(histories as ListModel<History>).data}
                onClickRow={(value: History) => setCurrentHistory(value)}
                viewSize={viewSize}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
