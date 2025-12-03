"use client";

import {
  categoryDefaultValues,
  categorySchema,
  CategorySchema,
} from "@/types/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoriesStore } from "@/store/useCategoriesStore";

type CategoryFormDialogProps = {
  smallTrigger?: boolean;
};

export default function CategoryFormDialog({
  smallTrigger,
}: CategoryFormDialogProps) {
  const form = useForm<CategorySchema>({
    defaultValues: categoryDefaultValues,
    resolver: zodResolver(categorySchema),
  });

  const {
    selectedCategoryId,
    updateSelectedCategoryId,
    categoryDialogOpen,
    updateCategoryDialogOpen,
    } = useCategoriesStore();
    
    const categoreyQuery = useCategory();
}
