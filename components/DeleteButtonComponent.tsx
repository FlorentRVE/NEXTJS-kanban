"use client";

export function DeleteComponent({ taskId }: { taskId: string }) {
  const deleteTask = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      taskId: taskId,
    });

    let response = await fetch("/api/delete_task", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    console.log(response);
    window.location.reload();
  };

  return (
    <div className="cursor-pointer text-red-600" onClick={deleteTask}>
      ❌
    </div>
  );
}
