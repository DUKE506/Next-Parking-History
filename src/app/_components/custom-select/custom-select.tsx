"use client";
import { CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EnumType } from "@/types/type";

export const CustomSelect = <T extends EnumType>({
  label,
  values,
  className,
  defaultValue,
  onChange,
}: {
  label?: string;
  values: T;
  defaultValue?: any;
  className?: React.ComponentProps<"div">["className"];
  onChange?: (value: any) => void;
}) => {
  const getEnumValues = (
    enumObject: T
  ): { name: string | number; value: string | number }[] => {
    return Object.keys(enumObject).map((key) => ({
      name: key,
      value: enumObject[key].toString(),
    }));
  };

  const enumValues = getEnumValues(values);

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label ? <CardDescription>{label}</CardDescription> : null}

      <Select
        onValueChange={(value) => onChange && onChange(value)}
        value={defaultValue?.toString()}
      >
        {/* <SelectTrigger className="w-[180px]"> */}
        <SelectTrigger className="w-full">
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          {enumValues.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
