"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reorder } from "framer-motion";

import { CreateButtonComponent } from "./CreateButtonComponent";
import { DeleteComponent } from "./DeleteButtonComponent";
import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import { ModifyComponent } from "./ModifyButtonComponent";

export function CardComponent({
  categoryId,
  label,
}: {
  categoryId: string;
  label: string;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const TasksFromCat = tasks.filter((task) => task.categoryId === categoryId);

  return (
    <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
      <Card className="w-[350px] bg-sky-200">
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {TasksFromCat.map((task) => (
            <Reorder.Item key={task.id} value={task}>
              <div
                key={task.id}
                className="flex flex-col gap-2 justify-center bg-green-500 p-2 rounded-lg shadow-lg hover:cursor-pointer hover:scale-110 hover:brightness-110"
              >
                <div className="flex justify-between">
                  <p className="font-bold border-b-2 border-b-slate-800 flex-1">
                    {task.title}
                  </p>
                  <div className="flex gap-2">
                    <ModifyComponent taskId={task.id} />

                    <DeleteComponent taskId={task.id} />
                  </div>
                </div>
                <p>{task.body}</p>
              </div>
            </Reorder.Item>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div></div>
          <CreateButtonComponent catId={categoryId} />
        </CardFooter>
      </Card>
    </Reorder.Group>
  );
}
