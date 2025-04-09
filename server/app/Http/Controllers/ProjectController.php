<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $task_all = Task::all();
        $project_all = Project::all();

        foreach ($project_all as $project) {
            $completedCount = 0;
            $total = 0;

            foreach ($task_all as $task) {
                if ($task->project_id == $project->id) {
                    $total++;
                    if ($task->status === 'Completed') {
                        $completedCount++;
                    }
                }
            }

            $project->completed_percentage = $total > 0 ? ($completedCount / $total) * 100 : 0;
        }
        return response()->json($project_all);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        if ($request->input('IsNew')) {
            $project = Project::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
            ]);
            return response()->json($project, 201); 
        } else {
            $project = Project::findOrFail($request->input('id'));
            $project->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
            ]);
            return response()->json($project, 200); 
        }
    }

    public function show($id)
    {

        $project =  Project::with('tasks')->findOrFail($id);
        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->tasks()->delete();
        $project->delete();
        return response()->json(null, 204);
    }
}
