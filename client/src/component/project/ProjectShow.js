import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { getProjects } from '../../Action/Project';
import { createProject } from '../../Action/Project';
import { deleteProject } from '../../Action/Project';

import { ProgressBar } from 'primereact/progressbar';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

import ProjectAdd from './ProjectAdd';
import ProjectModal from './modal/ProjectModal';
import DeleteConfirmationDialog from './modal/DeleteConfirmationDialog';

export default function ProjectShow() {
    const emptyProject = { id: null, name: '', description: '', progress: 0 };

    const [projectDialog, setProjectDialog] = useState(false);
    const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(emptyProject);
    const [selectedProjects, setSelectedProjects] = useState(null);
    const [selectedId, setSelectedId] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isNew, setIsNew] = useState(true);

    const toast = useRef(null);
    const dt = useRef(null);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setLoading(false);
            setProjects(data);
        } catch (err) {
            console.log(err)
        }
    };


    const openNew = () => {
        setProject({ ...emptyProject });
        setSubmitted(false);
        setIsNew(true);
        setProjectDialog(true);
    };

    const editProject = (rowData) => {
        setProject({ ...rowData });
        setSubmitted(false);
        setIsNew(false);
        setProjectDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProjectDialog(false);
    };

    const saveProject = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (project.name.trim()) {
            try {
                const addedOrUpdatedProject = await createProject(project, isNew);

                setProjects((prevProjects) => {
                    const index = prevProjects.findIndex(p => p.id === addedOrUpdatedProject.id);

                    if (index !== -1) {
                        const updated = [...prevProjects];
                        updated[index] = addedOrUpdatedProject;
                        return updated;
                    } else {
                        return [...prevProjects, addedOrUpdatedProject];
                    }
                });

                toast.current.show({
                    severity: 'success',
                    summary: isNew ? 'Created' : 'Updated',
                    detail: `Project ${isNew ? 'created' : 'updated'}`,
                    life: 3000
                });

                setProjectDialog(false);
            } catch (error) {
                console.error('Error saving project:', error);
            }
        }
    };


    const confirmDeleteSelected = () => {
        if (selectedProjects?.length) {
            setDeleteProjectsDialog(true);
        }
    };

    const confirmDeleteProject = (projectToDelete) => {
        setSelectedProjects([projectToDelete]);
        setDeleteProjectsDialog(true);
    };

    const hideDeleteProjectsDialog = () => setDeleteProjectsDialog(false);

    const deleteSelectedProjects = async (e) => {
        e.preventDefault();

        projects.forEach((p) => {
            selectedProjects.forEach((sp) => {
                if (sp.id === p.id) {
                    setSelectedId((prev) => [...prev, p.id]);
                }
            });
        });
    };

    useEffect(() => {
        const runDelete = async () => {
            if (selectedId.length > 0) {
                await deleteProject(selectedId);
                setProjects((prev) =>
                    prev.filter((p) => !selectedId.includes(p.id))
                );
                setSelectedId([]);

            }
        };

        runDelete();
        setDeleteProjectsDialog(false);
    }, [selectedId]);


    const exportCSV = () => dt.current.exportCSV();
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const progressTemplate = (rowData) => <ProgressBar value={rowData.completed_percentage} showValue />;
    const actionBodyTemplate = (rowData) => (
        <>
            <Link to={`/task/${rowData.id}`}>
                <Button icon="pi pi-eye" rounded outlined className="p-button-secondary" />
            </Link>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProject(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProject(rowData)} />
        </>
    );

    const renderHeader = () => (
        <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4 className="m-0">Projects</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />

            <ProjectAdd
                onNew={openNew}
                onDelete={confirmDeleteSelected}
                exportCSV={exportCSV}
                selectedProjects={selectedProjects}
            />

            <DataTable
                ref={dt}
                value={projects}
                paginator
                rows={5}
                loading={loading}
                filters={filters}
                filterDisplay="row"
                globalFilterFields={['name', 'description']}
                header={renderHeader()}
                emptyMessage="No projects found."
                tableStyle={{ minWidth: '50rem' }}
                selection={selectedProjects}
                onSelectionChange={(e) => setSelectedProjects(e.value)}
                dataKey="id"
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ width: '33%' }} />
                <Column field="description" header="Description" filter filterPlaceholder="Search by description" style={{ width: '33%' }} />
                <Column header="Progress" body={progressTemplate} sortable style={{ width: '33%' }} />
                <Column body={actionBodyTemplate} header="Action" exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>

            <ProjectModal
                visible={projectDialog}
                onHide={hideDialog}
                onSave={saveProject}
                project={project}
                setProject={setProject}
                submitted={submitted}
                isNew={isNew}
            />
            <DeleteConfirmationDialog
                visible={deleteProjectsDialog}
                onHide={hideDeleteProjectsDialog}
                onConfirm={deleteSelectedProjects}
                selectedProjects={selectedProjects}
            />
        </div>
    );
}
