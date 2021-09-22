import { useMutation } from "@apollo/client";
import { EditPassenger } from "../graphql/mutation";
import { GetPassengerList } from "../graphql/query";

export default function useUpdatePassenger() {
    const [updatePassenger, {loading: loadingEdit}] = useMutation(EditPassenger, {
        refetchQueries: [GetPassengerList]
    });

    return {
        updatePassenger,
        loadingEdit
    }
}