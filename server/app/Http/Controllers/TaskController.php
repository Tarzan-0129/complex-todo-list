<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;

class TaskController extends Controller
{

    public function store(Request $request)
    {
        $data = $request->all();

        if (!empty($data['isNew'])) {
            $mapped = [
                'project_id'  => $data['projectId'] ?? null,
                'name'        => $data['name'] ?? null,
                'description' => $data['description'] ?? null,
                'start_date'  => isset($data['startDate']) ? Carbon::parse($data['startDate'])->format('Y-m-d') : null,
                'end_date'    => isset($data['endDate']) ? Carbon::parse($data['endDate'])->format('Y-m-d') : null,
                'status'      => $data['status'] ?? 'Pending',
            ];

            Validator::make($mapped, [
                'project_id'  => 'required|exists:projects,id',
                'name'        => 'required|string|max:255',
                'description' => 'nullable|string',
                'start_date'  => 'nullable|date',
                'end_date'    => 'nullable|date|after_or_equal:start_date',
                'status'      => 'nullable|in:Pending,In Progress,Completed',
            ])->validate();

            $task = Task::create($mapped);
            $statusCode = 201;
        } else {
            $mapped = [
                'project_id'  => $data['project_id'] ?? null,
                'name'        => $data['name'] ?? null,
                'description' => $data['description'] ?? null,
                'start_date'  => isset($data['startDate']) ? Carbon::parse($data['startDate'])->format('Y-m-d') : null,
                'end_date'    => isset($data['endDate']) ? Carbon::parse($data['endDate'])->format('Y-m-d') : null,
                'status'      => $data['status'] ?? 'Pending',
            ];
            Validator::make($mapped, [
                'project_id'  => 'required|exists:projects,id',
                'name'        => 'required|string|max:255',
                'description' => 'nullable|string',
                'start_date'  => 'nullable|date',
                'end_date'    => 'nullable|date|after_or_equal:start_date',
                'status'      => 'nullable|in:Pending,In Progress,Completed',
            ])->validate();
            $task = Task::findOrFail($data['id']);
            $task->update($mapped);
            $statusCode = 200;
        }

        return response()->json($task, $statusCode);
    }



    public function updateStatus($id, Request $request)
    {
        
        $request->validate([
            'status' => 'required|in:Pending,In Progress,Completed',
        ]);
        $task_all = Task::all();
        $size = count($task_all);

        for ($i = 0; $i < $size; $i++) {
            if ($task_all[$i]->id == $id) {
                $task_all[$i]->status = $request->input('status');
            }
        }
        
        $task = Task::findOrFail($id);
        $task->status = $request->input('status');
        $task->save();
        return response()->json([
            'message' => 'Status updated successfully',
            'task' => $task,
        ], 200);
    }


    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
