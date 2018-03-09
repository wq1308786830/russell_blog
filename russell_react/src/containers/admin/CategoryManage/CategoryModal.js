import React from 'react';
import {Modal} from 'antd';

class CategoryModal extends React.Component {
    state = {
        modal2Visible: false,
    };
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    render() {
        return (
            <div>
                <Modal
                    title="Vertically centered modal dialog"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default CategoryModal;