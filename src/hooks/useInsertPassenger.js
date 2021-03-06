import { useMutation } from "@apollo/client";
import { InsertPassenger } from "../graphql/mutation";
import { GetPassengerList } from "../graphql/query";

export default function useInsertPassenger() {
    const [insertPassenger, {loading: loadingInsert}] = useMutation(InsertPassenger,{
        refetchQueries: [GetPassengerList]
    });

    return {
        insertPassenger,
        loadingInsert
    }
}