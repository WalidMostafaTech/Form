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
import { useTranslation } from "react-i18next";

const ProductsFilter = ({ selectedCategory }) => {
  const { t } = useTranslation();

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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4 p-2 shadow-lg rounded bg-primary/10">
      {/* Search */}
      <div className="col-span-2">
        <label className="inline-block text-sm font-medium">{t("ProductsFilter.search")}</label>
        <Input
          placeholder={t("ProductsFilter.searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white"
        />
      </div>

      {/* Sub Categories */}
      <div>
        <label className="inline-block text-sm font-medium">{t("ProductsFilter.subCategory")}</label>
        <Select
          value={searchParams.get("sub_category") || ""}
          onValueChange={(value) => handleSelect("sub_category", value)}
          disabled={!subCategories?.length}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={t("ProductsFilter.subCategoryPlaceholder")} />
          </SelectTrigger>

          <SelectContent>
            {subCategories?.map((sub) => (
              <SelectItem key={sub.id} value={String(sub.id)}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Price */}
      <div>
        <label className="inline-block text-sm font-medium">{t("ProductsFilter.sortPrice")}</label>
        <Select
          value={searchParams.get("sort_price") || ""}
          onValueChange={(value) => handleSelect("sort_price", value)}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={t("ProductsFilter.sortPricePlaceholder")} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="asc">{t("ProductsFilter.sortPriceAsc")}</SelectItem>
            <SelectItem value="desc">{t("ProductsFilter.sortPriceDesc")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductsFilter;
