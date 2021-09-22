import { useSubscription } from "@apollo/client";
import { SubscriptionPassenger } from "../graphql/subscribe";

export default function useSubscribePassenger() {
    const {data, loading, error} = useSubscription(SubscriptionPassenger)

    return {
        data,
        loading,
        error
    }
}