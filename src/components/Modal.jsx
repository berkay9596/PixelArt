import React from "react";
const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-box flex items-center flex-col bg-black">
        <h3 className="font-bold text-lg">
          You are about to own pixel at Desopixelart
        </h3>
        <p className="py-3">Total Pixel : {props.count}</p>
        <p className="py-3">Total Price : {props.count / 10} Deso</p>
        <p className="py-3">Do you confirm the transaction?</p>
        <div className="modal-action">
          <label
            onClick={props.confirmTransaction}
            className="btn btn-primary"
            id="confirm"
          >
            Confirm
          </label>
          <label id="cancel" htmlFor="my-modal" className="btn btn-secondary ">
            Cancel
          </label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
