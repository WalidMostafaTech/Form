import { getSubCategories } from "@/api/productsServices";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const ProductsFilter = ({ selectedCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: subCategories } = useQuery({
    queryKey: ["subCategories", selectedCategory],
    queryFn: () => getSubCategories(selectedCategory),
    enabled: !!selectedCategory,
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = Object.fromEntries(searchParams);

      if (search) params.search = search;
      else delete params.search;

      params.page = 1;

      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelect = (key, value) => {
    const params = Object.fromEntries(searchParams);

    if (value) params[key] = value;
    else delete params[key];

    params.page = 1;

    setSearchParams(params);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* Search */}
      <Input
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full col-span-2 md:col-span-1"
      />

      {/* Sub Categories */}
      <Select
        value={searchParams.get("sub_category") || ""}
        onValueChange={(value) => handleSelect("sub_category", value)}
        disabled={!subCategories?.length}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sub Category" />
        </SelectTrigger>

        <SelectContent>
          {subCategories?.map((sub) => (
            <SelectItem key={sub.id} value={String(sub.id)}>
              {sub.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort Price */}
      <Select
        value={searchParams.get("sort_price") || ""}
        onValueChange={(value) => handleSelect("sort_price", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort Price" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="asc">Price Low → High</SelectItem>
          <SelectItem value="desc">Price High → Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductsFilter;
