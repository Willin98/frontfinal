import gql from "graphql-tag";

export const ADD_COMIDA = gql`
  mutation agregarcomida($comida: ComidaInput!) {
    addComida(comida: $comida) {
      status
      message
      comida {
        id
        name
        description
        stock
        price
        img
      }
    }
  }
`;

export const MODIFY_COMIDA = gql`
  mutation actualizarComida($comida: ComidaInput!) {
    updateComida(comida: $comida) {
      status
      message
      comida {
        id
        name
        description
        stock
        price
        img
      }
    }
  }
`;
