import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function DeleteConfirmationDialog({ visible, onHide, onConfirm, selectedTasks }) {
    return (
        <Dialog
            visible={visible}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={
                <div className="flex justify-content-end gap-2">
                    <Button label="No" icon="pi pi-times" severity="secondary" onClick={onHide} />
                    <Button label="Yes" icon="pi pi-check" severity="danger" onClick={onConfirm} />
                </div>
            }
            onHide={onHide}
        >
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                <span>
                    {selectedTasks?.length > 1
                        ? 'Are you sure you want to delete the selected Tasks?'
                        : `Are you sure you want to delete "${selectedTasks?.[0]?.name}"'s project?`}
                </span>
            </div>
        </Dialog>
    );
}
