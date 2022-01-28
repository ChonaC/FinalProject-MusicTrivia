import { gql } from "@apollo/client";

export const QUERY_USER = gql`
    query user {
        user {
            key: _id
            username
            email
            song {
                song_name
            }
            score {
                points
                date_created
                tags
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
            tags
        }
    }
`;
