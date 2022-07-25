import React from "react";
const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-box flex items-center flex-col bg-black">
        <h3  className="font-bold text-lg">
          You are about to own pixel at Desopixelart
        </h3>
        <p className="py-3">Total Pixel : <span style={{color:"lime"}}>{props.count}</span></p>
        <p className="py-3">Total Price : <span style={{color:"lime"}}>{props.count / 10} Deso</span> </p>
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
