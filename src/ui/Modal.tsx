import {
  cloneElement,
  createContext,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
type ModelTypeContext = {
  isModalOpen: boolean;
  onCloseModal: () => void;
};
const ModalContext = createContext<ModelTypeContext | null>(null);
const Modal = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onCloseModal = () => setIsModalOpen((v) => !v);
  return (
    <ModalContext.Provider value={{ isModalOpen, onCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};
const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("no context provider");
  return context;
};

const Content = ({
  children,
}: {
  children: ReactElement<{ onCloseModel: () => void }>;
}) => {
  const { onCloseModal, isModalOpen } = useModal();
  const { ref } = useClickOutside(onCloseModal);
  if (!isModalOpen) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={onCloseModal}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModel: onCloseModal })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};
const Open = ({
  children,
}: {
  children: ReactElement<InputHTMLAttributes<null>>;
}) => {
  const { onCloseModal } = useModal();

  return cloneElement(children, { onClick: () => onCloseModal() });
};
Modal.Open = Open;
Modal.Content = Content;
export default Modal;
