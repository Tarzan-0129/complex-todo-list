<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'project_id',
        'name',
        'status',
        'description',
        'start_date',
        'end_date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}

