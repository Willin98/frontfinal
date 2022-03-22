import gql from "graphql-tag";
import { RESULT_INFO_FRAGMENT } from "../fragment/result-info";

export const COMIDAS_LIST_QUERY = gql`
  query comidasLista($page: Int, $itemsPage: Int) {
    comidas(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      comidas {
        id
        name
        description
        stock
        price
        img
      }
    }
  }
  ${RESULT_INFO_FRAGMENT}
`;

export const COMIDA_LIST_QUERY = gql`
  query comida($id: ID!) {
    comida(id: $id) {
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
