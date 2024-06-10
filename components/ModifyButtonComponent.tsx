"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category, Task } from "@prisma/client";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";

export function ModifyComponent({ taskId }: { taskId: string }) {

  const [taskNameFromForm, setTaskNameFromForm] = useState("");
  const [taskDescriptionFromForm, setTaskDescriptionFromForm] = useState("");
  const [categoryIdFromForm, setCategoryIdFromForm] = useState("");

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategoryList(data));
  }, []);

  // ======================================
  const handleNameChange = (e: any) => {
    setTaskNameFromForm(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setTaskDescriptionFromForm(e.target.value);
  };

  const handleCategoryChange = (e: any) => {
    setCategoryIdFromForm(e.target.value);
  };

  // =======================================
  const getCurrentTask = () => {
    fetch("/api/taskById?id=" + taskId)
      .then((res) => res.json())
      .then((data) => setCurrentTask(data));
  };

  const modifyTask = async (e: any) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      taskId: taskId,
      title: taskNameFromForm,
      body: taskDescriptionFromForm,
      categoryId: categoryIdFromForm,
    });

    let response = await fetch("/api/modify_task", {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });

    console.log(response);
    window.location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <p onClick={() => getCurrentTask()}>🖊️</p>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={(e) => modifyTask(e)}
          >
            <div>
              <Label htmlFor="width">Nom</Label>
              <Input
                id="taskName"
                className="col-span-2 h-8"
                defaultValue={currentTask?.title}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <Label htmlFor="width">Description</Label>
              <Input
                id="taskDescription"
                className="col-span-2 h-8"
                defaultValue={currentTask?.body}
                onChange={handleDescriptionChange}
              />
            </div>
            <div>
              <Label htmlFor="width">Category</Label>
              <select
                id="catId"
                onChange={handleCategoryChange}
                defaultValue={currentTask?.categoryId}
              >
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <PopoverClose>
              <button
                type="submit"
                className="bg-slate-800 text-slate-50 w-full rounded-lg px-2 py-1"
              >
                Modifier
              </button>
            </PopoverClose>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
