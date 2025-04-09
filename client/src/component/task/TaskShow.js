import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

import TaskAdd from './TaskAdd';
import TaskModal from './modal/TaskModal';
import DeleteConfirmationDialog from './modal/DeleteConfirmationDialog';

import { getTasksForProject, createTask, updateTaskStatus, deleteTask, } from '../../Action/Task';

const EMPTY_TASK = { id: null, name: '', description: '', startDate: null, endDate: null, status: 'Pending' };
const STATUS_OPTIONS = ['Pending', 'Completed', 'In Progress'];

export default function TaskShow() {
    
    const { TaskId: projectId } = useParams();
    const [taskDialogVisible, setTaskDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isNewTask, setIsNewTask] = useState(true);
    const [task, setTask] = useState(EMPTY_TASK);
    const [editingStatusRowId, setEditingStatusRowId] = useState(null);
    const [editingStatusValue, setEditingStatusValue] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const tasks = await getTasksForProject(projectId);
                setTasks(tasks);
            } catch (err) {
                console.error('Failed to load tasks:', err);
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, [projectId]);

    const openNewTaskDialog = () => {
        setTask({ ...EMPTY_TASK });
        setSubmitted(false);
        setIsNewTask(true);
        setTaskDialogVisible(true);
    };

    const handleEditTask = (rowData) => {
        setTask({ ...rowData });
        setSubmitted(false);
        setIsNewTask(false);
        setTaskDialogVisible(true);
    };

    const handleHideDialog = () => {
        setSubmitted(false);
        setTaskDialogVisible(false);
    };

    const handleSaveTask = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (task.name.trim() && task.description.trim()) {
            try {
                const updatedTask = {
                    ...task,
                    status: normalizeStatus(task.status),
                    isNew: isNewTask,
                    projectId
                };

                const savedTask = await createTask(updatedTask);

                let updatedTasks = [...tasks];
                const index = updatedTasks.findIndex(t => t.id === savedTask.id);

                if (index !== -1) {
                    updatedTasks[index] = savedTask;
                    showToast('success', 'Updated', 'Task updated');
                } else {
                    updatedTasks.push(savedTask);
                    showToast('success', 'Created', 'Task created');
                }

                setTasks(updatedTasks);
                setTaskDialogVisible(false);
                setTask(EMPTY_TASK);
                setSubmitted(false);
            } catch (err) {
                console.error("Error saving task:", err);
                showToast('error', 'Save Failed', 'Could not save task');
            }
        }
    };

    const handleDeleteSelected = () => {
        if (selectedTasks?.length) setDeleteDialogVisible(true);
    };

    const handleConfirmDelete = async (taskToDelete) => {

        setSelectedTasks([taskToDelete]);
        setDeleteDialogVisible(true);
    };

    const handleDeleteConfirmed = async () => {
        const filteredTasks = tasks.filter(t => selectedTasks.some(st => st.id === t.id));

        try {
            for (const toDelete of filteredTasks) {
                await deleteTask(toDelete.id);
            }

            const remainingTasks = tasks.filter(t => !selectedTasks.some(st => st.id === t.id));
            setTasks(remainingTasks);
            setSelectedTasks(null);
            setDeleteDialogVisible(false);
            showToast('success', 'Deleted', 'Selected task(s) deleted');
        } catch (error) {
            console.error('Error deleting tasks:', error);
            showToast('error', 'Delete Failed', 'Some tasks could not be deleted');
        }
    };

    const handleStatusChange = (newStatus, rowData) => {
        const updated = tasks.map(t => t.id === rowData.id ? { ...t, status: newStatus } : t);
        setSelectedTasks(null);
        setTasks(updated);
        showToast('info', 'Status Updated', `Task status set to ${newStatus}`);
    };

    const handleGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters(prev => ({
            ...prev,
            global: { value, matchMode: FilterMatchMode.CONTAINS }
        }));
    };

    const showToast = (severity, summary, detail) => {
        toast.current?.show({ severity, summary, detail, life: 3000 });
    };

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : '';
    };

    const normalizeStatus = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'pending':
                return 'Pending';
            case 'completed':
                return 'Completed';
            case 'in progress':
            case 'inprogress':
                return 'In Progress';
            default:
                return 'Pending';
        }
    };

    const getSeverity = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'warning';
            case 'in progress': return 'info';
            case 'completed': return 'success';
            default: return null;
        }
    };

    const statusItemTemplate = (option) => (
        <Tag value={option} severity={getSeverity(option)} />
    );

    const statusBodyTemplate = (rowData) => {
        const isEditing = editingStatusRowId === rowData.id;

        return isEditing ? (
            <Dropdown
                value={editingStatusValue}
                options={STATUS_OPTIONS}
                onClick={(e) => e.stopPropagation()}
                onChange={async (e) => {
                    const selectedStatus = e.value;
                    setEditingStatusValue(selectedStatus);
                    try {
                        await updateTaskStatus(rowData.id, selectedStatus);
                        handleStatusChange(selectedStatus, rowData);
                        showToast('success', 'Status Saved', `Task status set to ${selectedStatus}`);
                        setEditingStatusRowId(null);
                        setEditingStatusValue(null);
                    } catch (error) {
                        console.error("Status update failed:", error);
                        showToast('error', 'Update Failed', 'Could not update status');
                    }
                }}
                itemTemplate={statusItemTemplate}
                placeholder="Select One"
                className="p-column-filter"
                autoFocus
                style={{ minWidth: '12rem' }}
            />
        ) : (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setEditingStatusRowId(rowData.id);
                    setEditingStatusValue(rowData.status);
                }}
                style={{ cursor: 'pointer' }}
            >
                {statusItemTemplate(rowData.status)}
            </div>
        );
    };

    const statusFilterTemplate = (options) => (
        <Dropdown
            value={options.value}
            options={STATUS_OPTIONS}
            onChange={(e) => options.filterApplyCallback(e.value)}
            itemTemplate={statusItemTemplate}
            placeholder="Select One"
            className="p-column-filter"
            showClear
            style={{ minWidth: '12rem' }}
        />
    );

    const actionTemplate = (rowData) => (
        <>
            <Button icon="pi pi-pencil" className="mr-2" rounded outlined onClick={() => handleEditTask(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleConfirmDelete(rowData)} />
        </>
    );

    const renderHeader = (
        <div className="flex flex-wrap justify-content-between align-items-center gap-2">
            <h4 className="m-0">Tasks</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={handleGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );

    return (
        <>
            <Toast ref={toast} />

            <TaskAdd
                onNew={openNewTaskDialog}
                onDelete={handleDeleteSelected}
                exportCSV={() => dt.current.exportCSV()}
                selectedTasks={selectedTasks}
            />

            <DataTable
                ref={dt}
                value={tasks}
                paginator
                rows={5}
                loading={loading}
                filters={filters}
                globalFilterFields={['name', 'description', 'status']}
                filterDisplay="row"
                header={renderHeader}
                emptyMessage="No tasks found."
                selection={selectedTasks}
                onSelectionChange={e => setSelectedTasks(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ width: '22%' }} />
                <Column field="description" header="Description" filter filterPlaceholder="Search by description" style={{ width: '22%' }} />
                <Column field="start_date" header="Start Date" body={rowData => formatDate(rowData.start_date)} />
                <Column field="end_date" header="End Date" body={rowData => formatDate(rowData.end_date)} />
                <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusFilterTemplate}
                    style={{ width: '16%' }}
                />
                <Column body={actionTemplate} header="Action" exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>

            <TaskModal
                visible={taskDialogVisible}
                onHide={handleHideDialog}
                onSave={handleSaveTask}
                Task={task}
                setTask={setTask}
                submitted={submitted}
                isNew={isNewTask}
            />

            <DeleteConfirmationDialog
                visible={deleteDialogVisible}
                onHide={() => setDeleteDialogVisible(false)}
                onConfirm={handleDeleteConfirmed}
                selectedTasks={selectedTasks}
            />
        </>
    );
}
