import { CardComponent } from "@/components/CardComponent";
import { getCategory } from "@/prisma/category";

export default async function Home() {
  
  const categories = await getCategory();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center items-center h-20 bg-slate-700">
        <h1 className="text-3xl font-bold text-slate-50">Projet KANBAN 📝</h1>
      </div>

      <div className="flex justify-center gap-10 p-10 bg-slate-500 flex-1">
        {categories.map((category) => (
          <CardComponent
            categoryId={category.id}
            label={category.title}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
}
