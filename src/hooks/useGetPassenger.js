import { useLazyQuery, useQuery } from "@apollo/client";
import { GetPassengerById, GetPassengerList } from "../graphql/query";
import { SubscriptionPassenger } from "../graphql/subscribe";

function useGetPassenger() {
    const {data, loading, error, subscribeToMore} = useQuery(GetPassengerList);

    const subscribePassenger = () => {
        subscribeToMore({
            document: SubscriptionPassenger,
            updateQuery: (prev, {subscriptionData: {data}}) => {
                return data
            }
        })
    }

    return {
        passenger: data? data.passenger : [],
        loading,
        error,
        subscribePassenger
    }
}

function useGetPassengerById() {
    const [getPassenger, {data: lazyData, loading: lazyLoading, error: lazyError}] = useLazyQuery(GetPassengerById)

    return {
        getPassenger,
        lazyData,
        lazyLoading,
        lazyError
    }
}

export { useGetPassenger, useGetPassengerById }