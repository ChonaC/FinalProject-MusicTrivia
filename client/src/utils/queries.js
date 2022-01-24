import { gql } from "@apollo/client";

export const QUERY_USER = gql`
    query user {
        user {
            username
            email
            songs {
                song_name
            }
            scores {
                points
                date_created
            }
        }
    }
`;

export const GET_SCORES = gql`
    query scores {
        scores {
            key: _id
            username
            points
            date_created
        }
    }
`;
