"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";

export function CreateButtonComponent({ catId }: { catId: string }) {

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // =================
  const handleNameChange = (e: any) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setTaskDescription(e.target.value);
  };

  // ===============
  const createTask = async (e: any) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      title: taskName,
      body: taskDescription,
      categoryId: catId,
    });

    let response = await fetch("/api/create_task", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    console.log(response);
    window.location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Nouvelle tâche</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={(e) => createTask(e)}
          >
            <div>
              <Label htmlFor="width">Nom</Label>
              <Input
                id="taskName"
                className="col-span-2 h-8"
                onChange={handleNameChange}
              />
            </div>
            <div>
              <Label htmlFor="width">Description</Label>
              <Input
                id="taskDescription"
                className="col-span-2 h-8"
                onChange={handleDescriptionChange}
              />
            </div>
            <PopoverClose>
              <button
                type="submit"
                className="bg-slate-800 text-slate-50 w-full rounded-lg px-2 py-1"
              >
                Créer
              </button>
            </PopoverClose>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
