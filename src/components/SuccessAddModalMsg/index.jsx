import React from 'react'
import { Toast} from 'react-bootstrap';
import styles from './index.module.scss'

const SuccessAddModalMsg = ({ onToastClose, show }) => {
    // const { show, setSuccessfullyAddedMsgModalShow } = props;
    // const [show, setShow] = useState(false)

    return (
        <>
            <Toast className={styles.toasterWrapper} onClose={() => onToastClose(false)} show={show} delay={3000} autohide>
                <Toast.Body>Successfully added todo.</Toast.Body>
            </Toast>
            {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
        </>
    )
}

export default SuccessAddModalMsg