import gql from "graphql-tag";

export const SHOP_FILM_FRAGMENTE = gql`
  fragment ShopFilmObject on ShopFilm {
    id
    price
    date
    stock
    film {
      name
      poster
      img
      description
      clip
    }
    platform @include (if: $showPlatform){
      id
      name
      slug
    }
    relationalFilms @include(if: $relationalScreens){
      id
      platform {
        name
      }
    }
  }
`;
