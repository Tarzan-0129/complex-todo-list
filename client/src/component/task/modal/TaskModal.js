import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default function TaskModal({ visible, onHide, onSave, Task, setTask, submitted, isNew }) {

    return (
        <Dialog
            visible={visible}
            style={{ width: '32rem' }}
            header={isNew ? 'Add New Task' : 'Task Details'}
            modal
            className="p-fluid"
            footer={
                <div className="flex justify-content-end gap-2">
                    <Button label="Cancel" icon="pi pi-times" severity="secondary" onClick={onHide} />
                    <Button label="Save" icon="pi pi-check" onClick={onSave} />
                </div>
            }
            onHide={onHide}
        >
            <div className="field">
                <label htmlFor="name" className="font-bold">Name</label>
                <InputText
                    id="name"
                    value={Task.name}
                    onChange={(e) => setTask({ ...Task, name: e.target.value })}
                    required
                    autoFocus
                    className={submitted && !Task.name ? 'p-invalid' : ''}
                />
                {submitted && !Task.name && <small className="p-error">Name is required.</small>}
            </div>

            <div className="field">
                <label htmlFor="description" className="font-bold">Description</label>
                <InputText
                    id="description"
                    value={Task.description}
                    onChange={(e) => setTask({ ...Task, description: e.target.value })}
                    required
                    className={submitted && !Task.description ? 'p-invalid' : ''}
                />
                {submitted && !Task.description && <small className="p-error">Description is required.</small>}
            </div>

            <div className="field">
                <label htmlFor="startDate" className="font-bold">Start Date</label>
                <Calendar
                    id="startDate"
                    value={Task.startDate}
                    onChange={(e) => {
                        const newStart = e.value;
                        setTask(prev => {
                            const resetEnd = prev.endDate && newStart && prev.endDate < newStart;
                            return {
                                ...prev,
                                startDate: newStart,
                                endDate: resetEnd ? null : prev.endDate
                            };
                        });
                    }}
                    dateFormat="yy-mm-dd"
                    showIcon
                />
            </div>

            <div className="field">
                <label htmlFor="endDate" className="font-bold">End Date</label>
                <Calendar
                    id="endDate"
                    value={Task.endDate}
                    onChange={(e) => setTask({ ...Task, endDate: e.value })}
                    dateFormat="yy-mm-dd"
                    showIcon
                    minDate={Task.startDate ? new Date(Task.startDate) : null}
                    disabled={!Task.startDate}
                />
            </div>
        </Dialog>
    );
}
