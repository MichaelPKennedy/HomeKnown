import { Link } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal show" tabIndex="-1" style={{ display: "flex" }}>
      <div
        className="modal-dialog"
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login Required</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              x
            </button>
          </div>
          <div className="modal-body">
            <p>You must be logged in to save locations.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <Link className="nav-link" to="/login">
              <button type="button" className="btn btn-primary">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
