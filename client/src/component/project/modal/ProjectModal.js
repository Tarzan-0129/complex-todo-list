import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function ProjectModal({ visible, onHide, onSave, project, setProject, submitted, isNew }) {
    return (
        <>
            <Dialog
                visible={visible}
                style={{ width: '32rem' }}
                header={isNew ? 'Add New Project' : 'Project Details'}
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
                        value={project.name}
                        onChange={(e) => setProject({ ...project, name: e.target.value })}
                        required
                        autoFocus
                        className={submitted && !project.name ? 'p-invalid' : ''}
                    />
                    {submitted && !project.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="description" className="font-bold">Description</label>
                    <InputText
                        id="description"
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value })}
                        required
                        className={submitted && !project.description ? 'p-invalid' : ''}
                    />
                    {submitted && !project.description && <small className="p-error">Description is required.</small>}
                </div>
            </Dialog>

        </>

    );
}
