import ReactDOM from 'react-dom';
import { useEffect } from 'react';

function Modal({ onClose, children, actionBar }) {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className="modal-close-button"></div>
            <div className="modal-body">
                <div className='modal-inner-body'>
                    {children}
                    <div className='modal-actionbar'>
                        {actionBar}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default Modal;