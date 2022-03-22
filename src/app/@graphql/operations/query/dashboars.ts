import gql from 'graphql-tag';

export const DASHBOARD_STATS_ELEMENTS = gql`
  {
    users: totalElements(collection: "users")
    platforms: totalElements(collection: "platforms")
    genres: totalElements(collection: "genres")
    shopFilms: totalElements(collection: "cartelera")
    Films: totalElements(collection: "films")
  }
`;
