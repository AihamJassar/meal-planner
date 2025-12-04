"use client";

import { NoItemsFound } from "@/components/no-items-found";
import { useDeleteCategory } from "@/services/use-mutations";
import { useCategories } from "@/services/use-queries";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { CategoryCArdsSkeleton } from "./category-card-skeleton";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export const CategoryCards = () => {
  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();

  const categoriesQuery = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  if (categoriesQuery.data?.length === 0) {
    return <NoItemsFound onClick={() => updateCategoryDialogOpen(true)} />;
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {categoriesQuery.isLoading ? (
        <CategoryCArdsSkeleton />
      ) : (
        <>
          {categoriesQuery.data?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-3 rounded-lg border p-6"
            >
              <p className="truncate">{item.name}</p>
              <div className="flex gap-1">
                <Button
                  className="size-6"
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    updateSelectedCategoryId(item.id);
                    updateCategoryDialogOpen(true);
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  className="size-6"
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    alert({
                      onConfirm: () => deleteCategoryMutation.mutate(item.id),
                    });
                  }}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
