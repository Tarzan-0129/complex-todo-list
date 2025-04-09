import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

export default function ProjectAdd({ onNew, onDelete, exportCSV, selectedProjects }) {
    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus" severity="success" onClick={onNew} />
            <Button
                label="Delete"
                icon="pi pi-trash"
                severity="danger"
                onClick={onDelete}
                disabled={!selectedProjects || !selectedProjects.length}
            />
        </div>
    );

    const rightToolbarTemplate = () => (
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    );

    return (
        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />
        </div>
    );
}