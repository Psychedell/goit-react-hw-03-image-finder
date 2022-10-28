// import { ModalBackdrop, ModalContent } from './Modal.styled';

// export const Modal = ({ modalImage, closeModal }) => {
//   return (
//     <ModalBackdrop>
//       <ModalContent>
//         <img src={modalImage} alt="Large scr"></img>
//       </ModalContent>
//     </ModalBackdrop>
//   );
// };

import { ModalBackdrop, ModalContent } from './Modal.styled';
import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === `Escape`) {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.target.nodeName === 'DIV') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <ModalBackdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          <img src={this.props.modalImage} alt="Large scr"></img>
        </ModalContent>
      </ModalBackdrop>
    );
  }
}
