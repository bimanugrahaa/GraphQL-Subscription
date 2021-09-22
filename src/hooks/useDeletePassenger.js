import { useMutation } from "@apollo/client";
import { DeletePassenger } from "../graphql/mutation";
import { GetPassengerList } from "../graphql/query";

export default function useDeletePassenger() {
    const [deletePassenger, {loading: loadingDelete}] = useMutation(DeletePassenger,{
        refetchQueries: [GetPassengerList]
    });

    return {
        deletePassenger,
        loadingDelete
    }
}