import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

import { Container, Loader } from "./styles";

type LoadingType = "gerando" | "alterando" | "guardando" | "carregando";

interface LoadingProps {
  type: LoadingType;
  isActive: boolean;
}

export function Loading({
  type = "carregando",
  isActive = true,
}: LoadingProps) {
  return (
    <Container>
      <Loader>
        <Spinner
          visible={isActive}
          textContent={`Estamos ${String(type)} seus dados, Aguarde!...`}
          textStyle={{ color: "#FFF", textAlign: "center" }}
        />
      </Loader>
    </Container>
  );
}
