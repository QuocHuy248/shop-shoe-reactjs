import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalDeleteProduct({
    showModalDelete,
    handleCloseModalDelete,
    handleDeleteProduct,
}) {
    return (
        <>
            <Modal centered show={showModalDelete} onHide={handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="content-center ps-5">
                            <h2>Are you sure to delete?</h2>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex">
                        <div className="col-md-6 content-center ps-3">
                            {" "}
                            <Button
                                className="btn btn-danger btn-lg"
                                type="button"
                                onClick={() => {
                                    handleDeleteProduct();
                                    handleCloseModalDelete();
                                }}
                            >
                                <i className="fas fa-ban p-1"></i>
                                Delete
                            </Button>
                        </div>
                        <div className="col-md-6 content-center ps-1">
                            <Button
                                className="btn btn-secondary btn-lg "
                                onClick={handleCloseModalDelete}
                            >
                                <i className="far fa-window-close p-1"></i>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
