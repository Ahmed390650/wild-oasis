import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import useUser from "../../features/authentication/hooks/useUser";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;
const ProductApp = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [navigate, isAuthenticated, isLoading]);
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
};

export default ProductApp;
