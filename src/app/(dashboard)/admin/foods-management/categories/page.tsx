import { CategoryCards } from "@/components/dashboard/admin/categories/category-cards";
import CategoryFormDialog from "@/components/dashboard/admin/categories/category-form-dialog";

export default function Categories() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCards />
    </>
  );
}
