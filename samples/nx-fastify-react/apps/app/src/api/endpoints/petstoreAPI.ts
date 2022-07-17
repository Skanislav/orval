/**
 * Generated by orval v6.9.0 🍺
 * Do not edit manually.
 * Petstore API
 * Petstore API
 * OpenAPI spec version: 1.0.0
 */
import { useQuery } from 'react-query';
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey,
} from 'react-query';
import type { GetPets201Item } from '../schemas';
import { customInstance } from '../mutator/custom-instance';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export const getPets = (signal?: AbortSignal) => {
  return customInstance<GetPets201Item[]>({
    url: `/pets`,
    method: 'get',
    signal,
  });
};

export const getGetPetsQueryKey = () => [`/pets`];

export type GetPetsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getPets>>
>;
export type GetPetsQueryError = unknown;

export const useGetPets = <
  TData = Awaited<ReturnType<typeof getPets>>,
  TError = unknown
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getPets>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetPetsQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPets>>> = ({
    signal,
  }) => getPets(signal);

  const query = useQuery<Awaited<ReturnType<typeof getPets>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};
