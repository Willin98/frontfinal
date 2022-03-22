import gql from "graphql-tag";

export const PROXIMAMENTES = gql`
  query proximante($page: Int, $itemsPage: Int, $active: ActiveFilterEnum) {
    proximamentes(page: $page, itemsPage: $itemsPage, active: $active) {
      info {
        page
        pages
        itemsPage
        total
      }
      status
      message
      proximamentes {
        id
        filmId
        film {
          id
          name
          slug
          description
          img
          poster
          clip
        }
        premiere
        active
      }
    }
  }
`;

export const PROXIMAMENTE_DETAILS = gql`
  query proximamenteSelecionada($id: String!) {
    proximamenteDetails(id: $id) {
      proximamente {
        id
        filmId
        film {
          id
          name
          slug
          description
          img
          poster
          clip
        }
        active
        premiere
      }
    }
  }
`;
